import { Resend } from "resend";

// Automatically load .env.local if present (Node.js 20+)
try {
  process.loadEnvFile?.(".env.local");
} catch (e) {
  // Ignore if not present
}

// Replace 're_xxxxxxxxx' with your real API key from https://resend.com/api-keys
// Or set it in your .env.local file as RESEND_API_KEY=re_...
const apiKey = process.env.RESEND_API_KEY || "re_xxxxxxxxx";

if (!apiKey || apiKey === "re_xxxxxxxxx") {
  console.error("⚠️ Please replace 're_xxxxxxxxx' with your real Resend API key in .env.local or in this file.");
  process.exit(1);
}

const resend = new Resend(apiKey);

async function main() {
  console.log("Sending test email via Resend to saneeedotin@gmail.com...");
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "saneeedotin@gmail.com",
      subject: "Hello World · Studio Memento",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });

    if (error) {
      console.error("❌ Error from Resend:", error);
      return;
    }

    console.log("✅ Success! Email sent. Details:", data);
  } catch (err) {
    console.error("❌ Execution error:", err);
  }
}

main();
