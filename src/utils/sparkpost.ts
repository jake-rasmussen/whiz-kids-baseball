import Sparkpost from "sparkpost";
import type {
  ContactUsFormInput,
  InterestFormInput,
} from "../types/emailInputTypes";
import { env } from "../env/server.mjs";

const client = new Sparkpost(env.SPARKPOST_API_KEY);

const fromParams = {
  name: "Whiz Kids Baseball",
  email: "baseball@info.phillywhizkids.com",
};

const adminEmailAddress = "baseball.whizkids@gmail.com";

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

  await client.transmissions.send({
    content: {
      from: fromParams,
      subject,
      text,
    },
    recipients: [{ address: adminEmailAddress }],
  });
};

export const blastEmailToUsers = async (
  recipients: string[],
  subject: string,
  text: string
) => {
  const textToLines = text.split("\n");
  text = "";
  textToLines.forEach((line: string) => {
    text += line + "<br />"
  })

  await client.transmissions.send({
    content: {
      from: fromParams,
      subject,
      html: `
      <div>
        <p style="color: #1F1F1F">${text}</p>
        <img style="width: 22.5rem;" src="https://drive.google.com/uc?id=1lFfvel6F--A2gMY5HaERV3V03IX13syd" alt="Whiz Kids Baseball">
      </div>
    `,
    },
    recipients: recipients.map((email) => ({ address: email })),
  });
};
