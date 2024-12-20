import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const verifyUrl = `http://localhost:3000/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verify your email for CalOrganizer.com',
    html: `<h1>Welcome to CalOrganizer</h1>
           <p>Verify your email <a href=${verifyUrl} >here</a></p>`
  });
};
