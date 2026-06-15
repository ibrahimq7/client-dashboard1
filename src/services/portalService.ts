import { PortalPayload } from '../utils/portalUtils';

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined;

export interface SubmitResponse {
  success: boolean;
  message: string;
  response?: unknown;
}

export async function submitPortalData(portalData: PortalPayload): Promise<SubmitResponse> {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error('Google Apps Script endpoint is not configured. Set VITE_GOOGLE_SCRIPT_URL.');
  }

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify(portalData),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unable to read error body.');
    throw new Error(`Submission failed: ${response.status} ${response.statusText} - ${errorText}`);
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
