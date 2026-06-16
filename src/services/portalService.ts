import { PortalPayload } from '../utils/portalUtils';

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined;
const SUBMIT_ENDPOINT = GOOGLE_SCRIPT_URL ?? '/api/submit';

export interface SubmitResponse {
  success: boolean;
  message: string;
  response?: unknown;
}

export async function submitPortalData(portalData: PortalPayload): Promise<SubmitResponse> {
  // Debug info to help diagnose deployment env var issues in production
  try {
    // eslint-disable-next-line no-console
    console.debug('[portalService] submitting to', SUBMIT_ENDPOINT, 'buildVarPresent:', Boolean(GOOGLE_SCRIPT_URL));
  } catch {}

  const response = await fetch(SUBMIT_ENDPOINT, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify(portalData),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unable to read error body.');
    const guidance = GOOGLE_SCRIPT_URL
      ? ''
      : ' (no VITE_GOOGLE_SCRIPT_URL found at build time — ensure you set `GOOGLE_SCRIPT_URL` in Vercel and redeploy, or set `VITE_GOOGLE_SCRIPT_URL` for client builds)';
    throw new Error(`Submission failed: ${response.status} ${response.statusText} - ${errorText}${guidance}`);
  }

  const responseText = await response.text().catch(() => '');
  let json: unknown = null;
  if (responseText) {
    try {
      json = JSON.parse(responseText);
    } catch {
      json = responseText;
    }
  }

  return {
    success: true,
    message: typeof json === 'object' && json !== null && 'message' in (json as Record<string, unknown>) ? (json as Record<string, unknown>).message as string : 'Portal submitted successfully.',
    response: json,
  };
}
