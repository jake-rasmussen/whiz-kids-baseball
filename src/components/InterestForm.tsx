import { Team } from "@prisma/client";
import { api } from "../utils/api";
import Loading from "./LoadingComponentRed";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { isEmptyString } from "../utils/helpers";
import Error from "next/error";

const InterestForm = () => {
  const { data: teams, isLoading, isError, error } = api.team.getAllTeams.useQuery();

  const [formData, setFormData] = useState({
    playerName: "",
    userEmail: "",
    teamInterest: "",
    cityOrTown: "",
    currentSchool: "",
    dateOfBirth: "",
    positions: "",
    bats: "",
    throws: "",
    playedAtWhizKids: false,
  });

  const resetForm = () => {
    setFormData({
      playerName: "",
      userEmail: "",
      teamInterest: "",
      cityOrTown: "",
      currentSchool: "",
      dateOfBirth: "",
      positions: "",
      bats: "",
      throws: "",
      playedAtWhizKids: false,
    });
  }

  const sendEmail = api.email.sendInterestEmail.useMutation({
    onMutate() {
      toast.loading("Sending Form...");
    },
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Sent Form");
      resetForm();
    },
    onError() {
      toast.error("Error Sending Form");
    },
  });

  const checkValidInput = () => {
    if (
      isEmptyString(formData.playerName) ||
      isEmptyString(formData.userEmail) ||
      isEmptyString(formData.teamInterest) ||
      isEmptyString(formData.cityOrTown) ||
      isEmptyString(formData.currentSchool) ||
      isEmptyString(formData.dateOfBirth) ||
      isEmptyString(formData.positions) ||
      isEmptyString(formData.bats) || 
      isEmptyString(formData.throws)
    ) {
      return false;
    }

    return true;
  }

  const handleSend = () => {
    if (!checkValidInput()) {
      return;
    }

    sendEmail.mutate({
      playerName: formData.playerName,
      userEmail:formData.userEmail,
      teamInterest: formData.teamInterest,
      cityOrTown: formData.cityOrTown,
      currentSchool: formData.currentSchool,
      dateOfBirth: formData.dateOfBirth,
      positions: formData.positions,
      bats: formData.bats as "Right" | "Left" | "Both",
      throws: formData.throws as "Right" | "Left",
      playedAtWhizKids: formData.playedAtWhizKids,
    })
  }

  // Strange glitch with chrome and TailwindCSS where you can't
  // capitalize option text, so created helper method
  const capitalizeString = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  };

  if (isLoading) {
    return <div className="py-20"><Loading /></div>;
  } else if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
  }

  return (
    <form
      action=""
      className="ng-untouched ng-pristine ng-valid container mx-auto flex flex-col space-y-12"
    >
      <Toaster />
      <fieldset className="grid grid-cols-4 gap-6 rounded-md bg-dark-gray p-6 shadow-sm">
        <div className="col-span-full space-y-2 text-dark-gray lg:col-span-1">
          <p className="text-3xl font-black uppercase tracking-wide text-white">
            Interest Form
          </p>
          <p className="text-md text-light-gray">
            Thank you for your interest in Whiz Kids Baseball! We will get back
            to you as soon as possible after you submit the form
          </p>
        </div>
        <div className="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Player Name</label>
            <input
              type="name"
              className="input-bordered input block w-full rounded-md bg-white font-semibold text-dark-gray shadow-sm"
              value={formData.playerName}
              onChange={(e) => setFormData({ ...formData, playerName: e.currentTarget.value})}
              required
            />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="input-bordered input block w-full rounded-md bg-white font-semibold text-dark-gray shadow-sm"
              value={formData.userEmail}
              onChange={(e) => setFormData({ ...formData, userEmail: e.currentTarget.value})}
              required
            />
          </div>
          <div className="col-span-full">
            <label className="text-sm">Which Team Are You Interested In?</label>
            <select
              className="select-bordered select w-full bg-white text-base text-dark-gray"
              name="teamSelect"
              id="teamSelect"
              value={formData.teamInterest}
              onChange={(e) => setFormData({ ...formData, teamInterest: e.currentTarget.value})}
              required
            >
              <option disabled value={""}></option>{" "}
              {teams.map((team: Team) => {
                return (
                  <option value={`${team.name}`} key={`${team.name}`}>
                    {capitalizeString(team.name)}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-span-full sm:col-span-2">
            <label className="text-sm">City or Town</label>
            <input
              type="home"
              className="input-bordered input block w-full rounded-md bg-white font-semibold text-dark-gray shadow-sm"
              value={formData.cityOrTown}
              onChange={(e) => setFormData({ ...formData, cityOrTown: e.currentTarget.value})}
              required
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label className="text-sm">Current School</label>
            <input
              type="school"
              className="input-bordered input block w-full rounded-md bg-white font-semibold text-dark-gray shadow-sm"
              value={formData.currentSchool}
              onChange={(e) => setFormData({ ...formData, currentSchool: e.currentTarget.value})}
              required
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label className="text-sm">Date Of Birth</label>
            <input
              type="home"
              className="input-bordered input block w-full rounded-md bg-white font-semibold text-dark-gray shadow-sm"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.currentTarget.value})}
              required
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label className="text-sm">Position (Up to 3)</label>
            <input
              type="position"
              className="input-bordered input block w-full rounded-md bg-white font-semibold text-dark-gray shadow-sm"
              value={formData.positions}
              onChange={(e) => setFormData({ ...formData, positions: e.currentTarget.value})}
              required
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label className="text-sm">Bats</label>
            <select
              className="select-bordered select w-full bg-white text-base text-dark-gray"
              name="batsSelect"
              id="batsSelect"
              value={formData.bats}
              onChange={(e) => setFormData({ ...formData, bats: e.currentTarget.value})}
              required
            >
              <option disabled value=""></option>
              <option value={"Right"}>Right</option>
              <option value={"Left"}>Left</option>
              <option value={"Both"}>Both</option>
            </select>
          </div>
          <div className="col-span-full sm:col-span-2">
            <label className="text-sm">Throws</label>
            <select
              className="select-bordered select w-full bg-white text-base text-dark-gray"
              name="throwSelect"
              id="throwSelect"
              value={formData.throws}
              onChange={(e) => setFormData({ ...formData, throws: e.currentTarget.value})}
              required
            >
              <option disabled value=""></option>
              <option value={"Right"}>Right</option>
              <option value={"Left"}>Left</option>
            </select>
          </div>
          <div className="form-control col-span-6 items-center">
            <label className="label cursor-pointer">
              <span className="text-white">
                Have You Played Whiz Kids Before?
              </span>
              <input
                type="checkbox"
                className="checkbox-primary checkbox m-5 bg-white"
                onClick={() => setFormData({...formData, playedAtWhizKids: !formData.playedAtWhizKids})}
              />
            </label>
          </div>
          <div className="form-control col-span-2 col-start-3 items-center md:col-start-6">
            <button
              className="btn m-5 mx-3 self-center rounded-lg rounded border-none bg-gradient-to-r from-red to-secondary-red px-8 py-3 text-lg font-black uppercase tracking-wide
                    text-white transition duration-300 ease-in-out hover:scale-110"
              onClick={(e) => {
                handleSend();
                if (checkValidInput()) {
                  e.preventDefault();
                }
               }}
            >
              Submit
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default InterestForm;
