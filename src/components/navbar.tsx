import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import { IconMenu2 } from "@tabler/icons";

export const mockdataTeam = [
  {
    title: "Whiz Kids National",
  },
  {
    title: "Whiz Kids Elite",
  },
  {
    title: "Whiz Kids American",
  },
  {
    title: "Whiz Kids Play Ball Stars",
  },
  {
    title: "Whiz Kids Futures",
  },
  {
    title: "Whiz Kids Stars",
  },
  {
    title: "Whiz Kids Future Stars",
  },
  {
    title: "Whiz Kids 12U",
  },
  {
    title: "Whiz Kids 11U",
  },
];

const NavBar: React.FC = () => {
  return (
    <>
      <div className="sticky top-0 z-20 flex min-h-[7vh] w-full flex-row items-center justify-items-stretch bg-white p-3 shadow-xl">
        <Image src={logo} alt="Whiz Kids Logo" className="mr-5 h-12 w-auto" />

        <div className="hidden grow flex-row text-lg md:flex">
          <Link
            href="/"
            className="link-underline link-underline-black mx-2 block font-extrabold text-dark-gray hover:text-red"
          >
            Home
          </Link>

          <Link
            href="/"
            className="link-underline link-underline-black mx-2 block font-extrabold text-dark-gray hover:text-red"
          >
            Teams
          </Link>

          <Link
            href="/training"
            className="link-underline link-underline-black mx-2 block font-extrabold text-dark-gray hover:text-red"
          >
            Training
          </Link>
          <Link
            href="/tryouts"
            className="link-underline link-underline-black mx-2 block font-extrabold text-dark-gray hover:text-red"
          >
            Tryouts
          </Link>
          <Link
            href="/alumni/a"
            className="link-underline link-underline-black mx-2 block font-extrabold text-dark-gray hover:text-red"
          >
            Alumni
          </Link>
        </div>

        <div className="hidden justify-self-end md:flex">
          <SignInButton mode="modal">
            <button
              className="btn mx-3 rounded-lg border-none bg-gradient-to-r from-red to-secondary-red p-3
              transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              Log in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button
              className="btn mx-3 rounded-lg border-none bg-gradient-to-r from-red to-secondary-red p-3
              transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              Sign up
            </button>
          </SignUpButton>
        </div>

        <div className="flex grow justify-end md:hidden">
          <div className="flex flex-col items-center justify-center">
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost btn-circle btn">
                <IconMenu2 />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box mt-4 w-52 bg-white p-4 text-xl shadow"
              >
                <li className="git bg-white text-3xl font-extrabold text-dark-gray hover:text-red">
                  <a>Home</a>
                </li>
                <li className="bg-white text-3xl font-extrabold text-dark-gray hover:text-red">
                  <a>Teams</a>
                </li>
                <li className="bg-white text-3xl font-extrabold text-dark-gray hover:text-red">
                  <a>Training</a>
                </li>
                <li className="bg-white text-3xl font-extrabold text-dark-gray hover:text-red">
                  <a>Tryouts</a>
                </li>
                <li className="bg-white text-3xl font-extrabold text-dark-gray hover:text-red">
                  <a>Alumni</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
