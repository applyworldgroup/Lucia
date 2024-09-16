import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_SECRET,
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

export async function sendEmail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_ID,
        to,
        subject,
        html,
      });
      console.log('Email sent successfully');
    }catch (error) {
        if (error instanceof Error) {
          return {
            error: error.message,
          };
        } else {
          return {
            error: 'An unknown error occurred while sending email',
          };
        }
      }
  }