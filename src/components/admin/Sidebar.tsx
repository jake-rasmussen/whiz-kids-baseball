import { IconArrowBack } from "@tabler/icons";
import Link from "next/link";
import { api } from "../../utils/api";
import Loading from "../LoadingPage";
import { Team } from "@prisma/client";

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
    <>
      <aside className="fixed flex h-screen w-60 flex-col items-center bg-dark-gray p-6 capitalize text-white">
        <nav className="flex flex-grow flex-col space-y-2 text-sm">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-light-gray">
              Getting Started
            </h2>
            <div className="flex flex-col space-y-1">
              <Link
                rel="noopener noreferrer"
                className="link-underline link-underline-black w-fit hover:text-red"
                href="/admin/guide"
              >
                Guide
              </Link>
              <Link
                rel="noopener noreferrer"
                className="link-underline link-underline-black w-fit hover:text-red"
                href="/admin/support"
              >
                Support
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-light-gray">
              Edit Pages
            </h2>
            <div className="flex flex-col space-y-1">
              <h2>Individual Team</h2>
              <div className="flex flex-col pl-4">
                {data.map((entry: Team, index: number) => (
                  <Link
                    href={`/admin/teams/${entry.id}`}
                    className="link-underline link-underline-black w-fit hover:text-red"
                    key={`team${index}`}
                  >
                    {entry.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Link
              href="/admin/teams"
              className="link-underline link-underline-black w-fit hover:text-red py-0.5"
            >
              Teams List
            </Link>
          <div>
            <Link
              href="/admin/alumni"
              className="link-underline link-underline-black w-fit hover:text-red py-0.5"
            >
              Alumni
            </Link>
          </div>
          <div>
            <Link
              href="/admin/tryout"
              className="link-underline link-underline-black w-fit hover:text-red py-0.5"
            >
              Tryout
            </Link>
          </div>
          <div>
            <Link
              href="/admin/training"
              className="link-underline link-underline-black w-fit hover:text-red py-0.5"
            >
              Training
            </Link>
          </div>
          <div>
            <Link
              href="/admin/newsletter-email"
              className="link-underline link-underline-black w-fit hover:text-red py-0.5"
            >
              Newsletter Email
            </Link>
          </div>
          </div>
        </nav>
        <Link
          className="flex flex-shrink text-white transition duration-300 ease-in-out hover:scale-110"
          href="/"
        >
          <IconArrowBack className="pr-2 text-red" /> Go Back
        </Link>
      </aside>
    </>
  );
};

export default NavBar;