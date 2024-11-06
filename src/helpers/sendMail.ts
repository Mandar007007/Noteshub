import nodemailer from 'nodemailer';

interface MailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendMail({ to, subject, text, html }: MailOptions): Promise<void> {
  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || "mandar.technocommet@gmail.com",
      pass: process.env.SMTP_PASS || "vddiewtxdwtxyzup",
    },
  });
  // Define email options
  const mailOptions = {
      from: "mandar.technocommet@gmail.com",
    to,
    subject,
    text,
    html,
};

try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(2)
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}
