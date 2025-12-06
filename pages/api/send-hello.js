// pages/api/send-hello.js
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = {
    Messages: [
      {
        From: {
          Email: "emprobofficial@gmail.com",
          Name: "EmpRob Official"
        },
        To: [
          {
            Email: "ramonraymundo121500@gmail.com",
            Name: "Ramon"
          }
        ],
        Subject: "Hello from Mailjet + Vercel!",
        TextPart: `Hello Ramon!

This email was sent securely using Vercel Serverless Functions + Mailjet API.

Everything is working perfectly!

Best regards,
EmpRob Official`,
        HTMLPart: `<h3>Hello Ramon!</h3>
                   <p>This email was sent <strong>securely</strong> using:</p>
                   <ul style="text-align:left;">
                     <li>Vercel Serverless Function (no CORS!)</li>
                     <li>Mailjet Send API v3.1</li>
                   </ul>
                   <p>You're all set!</p>
                   <br>
                   <p>Best regards,<br><strong>EmpRob Official</strong></p>`
      }
    ]
  };

  try {
    const mailjetResponse = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from("d73a62a14f56b6a98208d2c1695d9a11:684a80e6027349d5e7170895ecc1824d").toString("base64")
      },
      body: JSON.stringify(payload)
    });

    const result = await mailjetResponse.json();

    if (mailjetResponse.ok) {
      res.status(200).json({ success: true, data: result });
    } else {
      res.status(mailjetResponse.status).json({ success: false, error: result });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
