// api/send-hello.js   ← MUST be in /api folder at project root
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_KEY = "d73a62a14f56b6a98208d2c1695d9a11";
  const API_SECRET = "684a80e6027349d5e7170895ecc1824d";

  // FIXED: Use global btoa() instead of Buffer (works everywhere on Vercel)
  const auth = btoa(API_KEY + ":" + API_SECRET);

  const payload = {
    Messages: [
      {
        From: { Email: "emprobofficial@gmail.com", Name: "EmpRob Official" },
        To: [{ Email: "ramonraymundo121500@gmail.com", Name: "Ramon" }],
        Subject: "Hello – It finally works! 🎉",
        TextPart: "Hello Ramon!\n\nThis email was sent securely from your Vercel site using Mailjet.\n\nNo CORS, no 401, no exposed keys!\n\nYou're all set!",
        HTMLPart: `<h3>Hello Ramon! It works perfectly now!</h3>
                   <p>Sent securely using Vercel + Mailjet (fixed 401 error)</p>
                   <p>No more headaches</p>
                   <br><p>Best regards,<br><strong>EmpRob Official</strong></p>`
      }
    ]
  };

  try {
    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + auth
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(response.status).json({ error: data });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
