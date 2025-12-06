// api/send.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const auth = Buffer.from(
    "d73a62a14f56b6a98208d2c1695d9a11:ba143bbda64176717971c2cba75ec100"
  ).toString("base64");

  const payload = {
    FromEmail: "pilot@mailjet.com",
    FromName: "Mailjet Pilot",
    Subject: "Your email flight plan!",
    "Text-part": "Dear passenger, welcome to Mailjet! May the delivery force be with you!",
    "Html-part": `<h3>Dear passenger, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!<br>May the delivery force be with you!</h3>`,
    Recipients: [
      {
        Email: req.body.to || "passenger@mailjet.com", // you can change recipient from frontend
      },
    ],
  };

  try {
    const mailjetResponse = await fetch("https://api.mailjet.com/v3/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + auth,
      },
      body: JSON.stringify(payload),
    });

    const data = await mailjetResponse.json();

    if (mailjetResponse.ok) {
      res.status(200).json({ success: true, data });
    } else {
      res.status(mailjetResponse.status).json({ success: false, error: data });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Needed for Vercel
export const config = {
  api: {
    bodyParser: true,
  },
};
