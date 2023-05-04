import { api } from "../utils/api";

type Props = {};

const testemail = (props: Props) => {
  const testBlastEmail = api.email.testEmail.useMutation();
  const contactUsEmail = api.email.sendContactUsEmail.useMutation();
  const interestEmail = api.email.sendInterestEmail.useMutation();
  const handleTestBlastEmail = (event: React.MouseEvent) => {
    event.preventDefault();
    testBlastEmail.mutate();
  };
  const handleContactUsEmail = (event: React.MouseEvent) => {
    event.preventDefault();
    contactUsEmail.mutate({
      fullName: "test",
      userEmail: "ddrozdov12@gmail.com",
      message: "test message",
    });
  };

  function handleInterestEmail(event: React.MouseEvent): void {
    event.preventDefault();
    interestEmail.mutate({
      playerName: "test",
      userEmail: "ddrozdov12@gmail.com",
      positions: "test positions",
      playedAtWhizKids: true,
      teamInterest: "test team interest",
      cityOrTown: "test city or town",
      bats: "Both",
      throws: "Right",
      currentSchool: "test school",
      dateOfBirth: "08/02/2002",
    });
  }

  return (
    <>
      <button className="btn" onClick={handleTestBlastEmail}>
        Click to send test email
      </button>
      <button className="btn" onClick={handleContactUsEmail}>
        click to send contact us email
      </button>
      <button className="btn" onClick={handleInterestEmail}>
        Test interest email
      </button>
    </>
  );
};

export default testemail;
