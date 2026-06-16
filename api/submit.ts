// Vercel serverless function to proxy submissions to Google Apps Script.
// Uses the runtime env `GOOGLE_SCRIPT_URL` (set this in Vercel Environment Variables).

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).setHeader('Allow', 'POST').send('Method Not Allowed');
    return;
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    res.status(500).json({ success: false, message: 'Server misconfigured. Set GOOGLE_SCRIPT_URL in Vercel Environment Variables.' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body,
    });

    const text = await response.text().catch(() => '');
    const status = response.ok ? 200 : 502;
    res.status(status).setHeader('Content-Type', 'text/plain').send(text);
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Error proxying to Google Script', error: err?.message ?? String(err) });
  }
}
