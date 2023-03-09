import { IconArrowBack } from "@tabler/icons";
import Link from "next/link";

const NavBar: React.FC = () => {
  return (
    <>
      <aside className="w-full flex flex-col bg-dark-gray p-6 text-white sm:w-60 items-center">
        <nav className="flex flex-col flex-grow space-y-8 text-sm">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-light-gray">
              Getting Started
            </h2>
            <div className="flex flex-col space-y-1">
              <a rel="noopener noreferrer" href="#">
                Guide
              </a>
              <a rel="noopener noreferrer" href="#">
                Support
              </a>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-light-gray">
              Edit Pages
            </h2>
            <div className="flex flex-col space-y-1">
              <a rel="noopener noreferrer" href="#">
                Individual Team
              </a>
            </div>
          </div>
        </nav>
        <Link className="text-white flex flex-shrink transition duration-300 ease-in-out hover:scale-110" href="/">
          <IconArrowBack className="pr-2 text-red"/> Go Back
        </Link>
      </aside>
    </>
  );
};

export default NavBar;
