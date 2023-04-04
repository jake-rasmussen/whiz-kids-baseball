import { IconArrowBack } from "@tabler/icons";
import Link from "next/link";
import { api } from "../../utils/api";
import Loading from "../Loading";
const NavBar: React.FC = () => {
  const { data, isError, isLoading } = api.team.getAllTeams.useQuery();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <aside className="fixed flex h-screen w-60 flex-col items-center bg-dark-gray p-6 text-white capitalize">
            <nav className="flex flex-grow flex-col space-y-8 text-sm">
              <div className="space-y-2">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-light-gray">
                  Getting Started
                </h2>
                <div className="flex flex-col space-y-1">
                  <Link rel="noopener noreferrer" className="link-underline link-underline-black hover:text-red w-fit" href="#">
                    Guide
                  </Link>
                  <Link rel="noopener noreferrer" className="link-underline link-underline-black hover:text-red w-fit" href="#">
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
                  <div className="pl-4 flex flex-col">
                    {data!.map((entry: any, index: number) => (
                      <Link href={`/edit/teams/${index}`} className="link-underline link-underline-black hover:text-red w-fit" key={`team${index}`}>
                        {entry.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <Link href="/edit/teams" className="link-underline link-underline-black hover:text-red w-fit">
                  Teams List
                </Link>
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
      )}
    </>
  );
};

export default NavBar;
