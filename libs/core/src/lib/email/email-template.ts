export const welcomeTemplate = (
  fullName: string,
  orgName: string
) => `<!DOCTYPE html>
<html>
  <head>
    <title>Your Beautiful Email</title>
    <style>
      /* Add your CSS styles here */
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
      }
      p {
        color: #666;
      }
      a {
        color: #0078d4;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome</h1>
      <p>Dear ${fullName}</p>
      <p>
        Thank you for subscribing to our service. We're excited to have you on
        board!
      </p>
      <p>Stay tuned for the latest updates, news, and exclusive offers.</p>
      <p>Best regards,<br />${orgName} team</p>
    </div>
  </body>
</html>
`;
