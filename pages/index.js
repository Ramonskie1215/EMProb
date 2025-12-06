// pages/index.js
import React from 'react';

export default function Home() {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mailjet Test – Working!</title>
        <style>{`
          body { font-family: 'Segoe UI', Arial, sans-serif; margin:0; padding:40px; background: linear-gradient(135deg, #667eea, #764ba2); min-height:100vh; display:flex; align-items:center; }
          .container { max-width:600px; margin:auto; background:white; padding:40px; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.2); text-align:center; }
          h1 { color:#1a73e8; }
          button { padding:16px 36px; font-size:18px; background:#1a73e8; color:white; border:none; border-radius:50px; cursor:pointer; margin-top:20px; }
          button:hover { background:#0d47a1; }
          #result { margin-top:25px; padding:15px; border-radius:10px; font-weight:bold; min-height:50px; }
          .success { background:#d4edda; color:#155724; border:1px solid #c3e6cb; }
          .error { background:#f8d7da; color:#721c24; border:1px solid #f5c6cb; }
          .loading { color:#666; }
        `}</style>
      </head>

      <div className="container">
        <h1>Send Test Email</h1>
        <p>Click below to send "Hello" to:</p>
        <p style={{fontSize:'22px', fontWeight:'bold', color:'#1a73e8'}}>
          ramonraymundo121500@gmail.com
        </p>

        <button onClick={sendEmail}>Send Hello Email Now</button>
        <div id="result" className="loading">Ready – click the button!</div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            async function sendEmail() {
              const resultDiv = document.getElementById("result");
              resultDiv.textContent = "Sending...";
              resultDiv.className = "loading";

              try {
                const res = await fetch("/api/send-hello", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" }
                });

                const data = await res.json();

                if (res.ok) {
                  resultDiv.textContent = "Email sent successfully! Check your inbox.";
                  resultDiv.className = "success";
                } else {
                  resultDiv.textContent = "Error: " + (data.error?.ErrorMessage || JSON.stringify(data));
                  resultDiv.className = "error";
                }
              } catch (err) {
                resultDiv.textContent = "Network error: " + err.message;
                  resultDiv.className = "error";
              }
            }
          `,
        }}
      />
    </>
  );
}
