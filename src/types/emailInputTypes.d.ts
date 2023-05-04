export type ContactUsFormInput = {
  fullName: string;
  userEmail: string;
  message: string;
};

export type BatType = "Right" | "Left" | "Both";
export type ThrowType = "Right" | "Left";

export type InterestFormInput = {
  playerName: string;
  userEmail: string;
  teamInterest: string;
  cityOrTown: string;
  currentSchool: string;
  dateOfBirth: string;
  positions: string;
  bats: BatType;
  throws: ThrowType;
  playedAtWhizKids: boolean;
};
