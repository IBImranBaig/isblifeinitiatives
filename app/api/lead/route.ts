import { NextResponse } from "next/server";

/**
 * Handwriting-analysis submission endpoint.
 *
 * Accepts the multipart form (sample + name/email/phone/message), validates the
 * essentials, and acknowledges. Wire the TODO to your email/storage/CRM
 * (e.g. Resend + S3, or a form provider) — the client already posts here.
 */
export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const sample = form.get("sample");

    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Missing or invalid fields." }, { status: 400 });
    }

    // TODO: deliver the lead (email Imran + store the sample). For now, log.
    console.log("[lead] new analysis request", {
      name,
      email,
      phone,
      hasMessage: Boolean(message),
      sample: sample instanceof File ? { name: sample.name, size: sample.size, type: sample.type } : null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
