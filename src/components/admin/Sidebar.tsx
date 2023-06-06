import {
  IconActivity,
  IconArrowBack,
  IconBallBaseball,
  IconClipboard,
  IconDashboard,
  IconHelp,
  IconNews,
  IconUsers,
} from "@tabler/icons";
import Link from "next/link";
import { api } from "../../utils/api";
import Loading from "../LoadingPage";
import type { Team, Training } from "@prisma/client";
import Error from "next/error";

const NavBar: React.FC = () => {
  const {
    data: teams,
    isLoading: isLoadingTeams,
    isError: isErrorTeams,
    error,
  } = api.team.getAllTeams.useQuery(undefined, { refetchOnWindowFocus: false });

  const {
    data: trainings,
    isLoading: isLoadingTrainings,
    isError: isErrorTrainings,
  } = api.training.getAllTrainingsForAdmin.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (isLoadingTeams || isLoadingTrainings) {
    return <Loading />;
  } else if (isErrorTeams || isErrorTrainings) {
    return <Error statusCode={(error && error.data?.httpStatus) || 500} />;
  }

  return (
    <nav className="flex">
      <div className="z-10 flex h-full min-h-screen w-60 flex-col items-center overflow-y-auto overflow-x-hidden bg-dark-gray p-6 capitalize text-white">
        <div className="mx-4 w-full pt-4">
          <ul className="space-y-1 text-sm">
            <li className="w-full text-white">
              <Link href="/admin/">
                <button className="btn-ghost btn flex w-full items-center justify-start space-x-3 rounded-md p-2">
                  <IconDashboard className="flex items-center space-x-3 rounded-md" />
                  <span>Dashboard</span>
                </button>
              </Link>
            </li>
            <li className="w-full text-white">
              <Link href="/admin/support">
                <button className="btn-ghost btn flex w-full items-center justify-start space-x-3 rounded-md p-2 text-left">
                  <IconHelp className="flex items-center space-x-3 rounded-md" />
                  <span>Support</span>
                </button>
              </Link>
            </li>
          </ul>
        </div>

        <div className="divider before:bg-light-gray after:bg-light-gray" />

        <div className="mx-4 w-full">
          <ul className="space-y-1 text-sm">
            <Link href="/admin/teams">
              <button className="btn-ghost btn flex w-full items-center justify-start space-x-3 rounded-md p-2">
                <IconBallBaseball className="flex items-center space-x-3 rounded-md text-white" />
                <span>Teams</span>
              </button>
            </Link>
            {teams.map((team: Team, index: number) => (
              <Link href={`/admin/teams/${team.id}`} key={`team${index}`}>
                <button className="btn-ghost btn-sm btn flex w-full items-center justify-start space-x-3 rounded-md text-left text-xs">
                  <span className="pl-4">{team.name}</span>
                </button>
              </Link>
            ))}
            <li className="w-full text-white">
              <Link href="/admin/alumni">
                <button className="btn-ghost btn flex w-full items-center justify-start space-x-3 rounded-md p-2">
                  <IconUsers className="flex items-center space-x-3 rounded-md" />
                  <span>Alumni</span>
                </button>
              </Link>
            </li>
            <li className="w-full text-white">
              <Link href="/admin/tryout">
                <button className="btn-ghost btn flex w-full items-center justify-start space-x-3 rounded-md p-2">
                  <IconClipboard className="flex items-center space-x-3 rounded-md" />
                  <span>Tryout</span>
                </button>
              </Link>
            </li>
            <li className="w-full text-white">
              <Link href="/admin/training">
                <button className="btn-ghost btn flex w-full items-center justify-start space-x-3 rounded-md p-2">
                  <IconActivity className="flex items-center space-x-3 rounded-md" />
                  <span>Trainings</span>
                </button>
              </Link>
              {trainings.map((training: Training, index: number) => (
                <Link
                  href={`/admin/training/${training.id}`}
                  key={`team${index}`}
                >
                  <button className="btn-ghost btn-sm btn flex w-full items-center justify-start space-x-3 rounded-md text-left text-xs">
                    <span className="pl-4">{training.name}</span>
                  </button>
                </Link>
              ))}
            </li>
          </ul>
        </div>

        <div className="divider before:bg-light-gray after:bg-light-gray" />

        <div className="mx-4 w-full">
          <ul className="space-y-1 text-sm">
            <li className="w-full text-white">
              <Link href="/admin/email">
                <button className="btn-ghost btn flex w-full items-center justify-start space-x-3 rounded-md p-2">
                  <IconNews className="flex items-center space-x-3 rounded-md" />
                  <span>Send Out Email</span>
                </button>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mx-4 flex h-full w-full flex-col justify-end">
          <ul className="space-y-1 pb-2 text-sm">
            <li className="w-full text-white">
              <Link href="/">
                <button className="btn-ghost btn flex w-full items-center justify-center space-x-3 rounded-md p-2 text-center">
                  <IconArrowBack className="flex items-center space-x-3 rounded-md text-red" />
                  <span>Back</span>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
