import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER_ADDRESS,
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN,
    accessToken: process.env.EMAIL_ACCESS_TOKEN,
    expires: 1484314697598,
  },
});

const blastEmailToUsers = async (
  bcc: string[],
  subject: string,
  text: string
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER_ADDRESS,
    bcc,
    subject,
    text,
  });
};

const emailAdmin = async (_html: string) => {
  return;
};

export const testEmail = async () => {
  try {
    return await blastEmailToUsers(
      ["ddrozdov12@gmail.com", "ddrozdov2002@gmail.com"],
      "Welcome to Whiz kids!",
      "test"
    );
  } catch (e) {
    console.log(e);
  }
};
