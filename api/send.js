// api/send.js   ← put this file in your Vercel project under /api folder
export default async function handler(req, res) {
  const { to } = req.body; // optional: you can send the recipient from frontend

  const auth = Buffer.from(
    "d73a62a14f56b6a98208d2c1695d9a11:ba143bbda64176717971c2cba75ec100"
  ).toString("base64");

  const mailjetRes = await fetch("https://api.mailjet.com/v3/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + auth,
    },
    body: JSON.stringify({
      FromEmail: "pilot@mailjet.com",
      FromName: "Mailjet Pilot",
      Subject: "Your email flight plan!",
      "Text-part":
        "Dear passenger, welcome to Mailjet! May the delivery force be with you!",
      "Html-part":
        "<h3>Dear passenger, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!<br>May the delivery force be with you!</h3>",
      Recipients: [{ Email: to || "passenger@mailjet.com" }],
    }),
  });

  const data = await mailjetRes.json();
  res.status(mailjetRes.ok ? 200 : 400).json(data);
}

// Required for Vercel
export const config = { api: { bodyParser: true };
