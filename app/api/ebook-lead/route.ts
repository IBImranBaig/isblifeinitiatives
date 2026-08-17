import { NextResponse } from "next/server";

/**
 * Ebook funnel lead capture (ebook.imranbaig.com opt-in form).
 *
 * Validates the opt-in payload, appends it to a Google Sheet (via an Apps Script
 * web-app webhook), then acknowledges so the client can route to the thank-you
 * page. The webhook URL is read from EBOOK_SHEETS_WEBHOOK_URL (set in Vercel /
 * .env.local) — see docs at the bottom of this file. We post server-to-server,
 * so there's no CORS and no Google credentials/libraries needed.
 *
 * If the webhook isn't configured or fails, we still return ok (never block a
 * signup) but log it so nothing fails silently.
 */
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE = /^[+0-9\s\-()]{5,}$/;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const profession = String(body.profession ?? "").trim();
    const consent = Boolean(body.consent);

    if (!name || !EMAIL.test(email) || !PHONE.test(phone) || !profession || !consent) {
      return NextResponse.json({ ok: false, error: "Missing or invalid fields." }, { status: 400 });
    }

    const lead = {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      profession,
      consent,
      source: "ebook.imranbaig.com",
    };

    const webhook = process.env.EBOOK_SHEETS_WEBHOOK_URL;
    if (webhook) {
      try {
        const res = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
          // Apps Script can be slow; don't let it hang forever.
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) console.error("[ebook-lead] sheet webhook returned", res.status);
      } catch (err) {
        console.error("[ebook-lead] sheet webhook failed — lead not stored:", err);
      }
    } else {
      console.warn("[ebook-lead] EBOOK_SHEETS_WEBHOOK_URL not set — lead NOT stored:", lead);
    }

    return NextResponse.json({ ok: true, firstName: name.split(/\s+/)[0] ?? "" });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}

/*
 * ── Google Sheet setup (one-time) ──────────────────────────────────────────
 * 1. Create a Google Sheet. In row 1 add headers:
 *      Timestamp | Name | Email | Phone | Profession | Consent | Source
 * 2. Extensions → Apps Script. Replace the code with:
 *
 *      function doPost(e) {
 *        var d = JSON.parse(e.postData.contents);
 *        var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
 *        sh.appendRow([d.timestamp, d.name, d.email, d.phone, d.profession, d.consent, d.source]);
 *        return ContentService
 *          .createTextOutput(JSON.stringify({ ok: true }))
 *          .setMimeType(ContentService.MimeType.JSON);
 *      }
 *
 * 3. Deploy → New deployment → type "Web app" →
 *      Execute as: Me · Who has access: Anyone  → Deploy → copy the /exec URL.
 * 4. Add it in Vercel → Project → Settings → Environment Variables:
 *      EBOOK_SHEETS_WEBHOOK_URL = <the /exec URL>   (Production), then redeploy.
 *    For local dev, put the same line in .env.local.
 */
