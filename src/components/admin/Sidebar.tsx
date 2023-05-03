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
import type { Team } from "@prisma/client";
import whizkidsw from "../../../assets/images/whizkidsw.png";
import Image from "next/image";

const NavBar: React.FC = () => {
  const { data, isError, isLoading } = api.team.getAllTeams.useQuery(
    undefined,
    { refetchOnWindowFocus: false }
  );

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <>Error...</>;
  }

  return (
    <nav className="flex">
      <div className="fixed z-10 flex h-full min-h-screen w-60 flex-col items-center overflow-y-auto overflow-x-hidden bg-dark-gray p-6 capitalize text-white">
        <div className="flex items-center space-x-4 p-2">
          <Image
            src={whizkidsw}
            alt="logo"
            className="h-12 w-12 rounded-full bg-white object-contain"
          />
          <div>
            <h2 className="text-lg font-semibold">Admin Edit</h2>
          </div>
        </div>

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
            {data.map((entry: Team, index: number) => (
              <Link href={`/admin/teams/${entry.id}`} key={`team${index}`}>
                <button className="btn-ghost btn-sm btn flex w-full items-center justify-start space-x-3 rounded-md text-left text-xs">
                  <span className="pl-4">{entry.name}</span>
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
                  <span>Training</span>
                </button>
              </Link>
            </li>
          </ul>
        </div>

        <div className="divider before:bg-light-gray after:bg-light-gray" />

        <div className="mx-4 w-full">
          <ul className="space-y-1 text-sm">
            <li className="w-full text-white">
              <Link href="/admin/newsletter-email">
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
