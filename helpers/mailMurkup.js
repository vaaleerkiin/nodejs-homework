const { BASE_URL } = process.env;

const mailMurkup = (verificationToken) => `
<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Підтвердження пошти</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f7f7f7; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="text-align: center; color: #007BFF;">Підтвердження пошти</h1>
      <p>Вітаємо,</p>
      <p>Дякуємо за реєстрацію на нашому сайті. Для завершення процесу реєстрації, будь ласка, підтвердіть вашу адресу електронної пошти, перейшовши за посиланням нижче:</p>
      <p style="text-align: center;">
        <a href="${BASE_URL}/api/users/verify/${verificationToken}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 4px;">Підтвердити адресу</a>
      </p>
      <p>Якщо ви не реєструвалися на нашому сайті, проігноруйте цей лист.</p>
      <p>З повагою,<br>Команда сайту example.com</p>
    </div>
    </body>
</html>
`;

module.exports = mailMurkup;
