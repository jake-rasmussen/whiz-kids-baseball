import nodemailer from "nodemailer";
import type {
import type {
  ContactUsFormInput,
  InterestFormInput,
} from "../types/emailInputTypes";
import { google } from "googleapis";

const user = process.env.EMAIL_USER_ADDRESS;
const clientId = process.env.EMAIL_CLIENT_ID;
const clientSecret = process.env.EMAIL_CLIENT_SECRET;
const refreshToken = process.env.EMAIL_REFRESH_TOKEN;

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const myOAuth2Client = new OAuth2(
    clientId,
    clientSecret,
    "https://developers.google.com/oauthplayground"
  );

  myOAuth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const accessToken = await myOAuth2Client.getAccessToken();
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user,
      clientId,
      clientSecret,
      refreshToken,
      accessToken,
    },
  });
};

export const blastEmailToUsers = async (
  bcc: string[],
  subject: string,
  text: string
) => {
  const transporter = await createTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_USER_ADDRESS,
    bcc,
    subject,
    text,
  });
};

export const emailAdmin = async (
  formType: "Interest" | "Contact Us",
  info: ContactUsFormInput | InterestFormInput
) => {
  let subject = `${formType} Form Submission`;
  let text = "";
  if (formType === "Interest") {
    const {
      playerName,
      userEmail,
      teamInterest,
      cityOrTown,
      currentSchool,
      dateOfBirth,
      positions,
      bats,
      throws,
      playedAtWhizKids,
    } = info as InterestFormInput;

    subject += ` - ${playerName}`;
    text += `Player Name: ${playerName}\n
    Email: ${userEmail}\n
    Team Interest: ${teamInterest}\n
    City or Town: ${cityOrTown}\n
    Current School: ${currentSchool}\n
    Date of Birth: ${dateOfBirth}\n
    Position: ${positions}\n
    Bats: ${bats}\n
    Throws: ${throws} handed\n
    Played for Whiz Kids Before: ${playedAtWhizKids ? "Yes" : "No"}
    `;
  } else {
    const { fullName, userEmail, message } = info as ContactUsFormInput;
    subject += ` - ${fullName}`;
    text = `Full Name: ${fullName}\n
    Email: ${userEmail}\n
    Message:\n
    ${message}
    `;
  }

  const transporter = await createTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_USER_ADDRESS,
    to: process.env.EMAIL_USER_ADDRESS,
    subject,
    text,
  });
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
