import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import { IconMenu2, IconX } from "@tabler/icons";
import { useState } from "react";

const NavBar: React.FC = () => {
  const [displayMenu, setDisplayMenu] = useState(false);

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
            href="/teams"
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
            href="/tryout"
            className="link-underline link-underline-black mx-2 block font-extrabold text-dark-gray hover:text-red"
          >
            Tryout
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
              className="btn mx-3 rounded-lg border-none bg-gradient-to-r from-red to-secondary-red p-3 font-black uppercase tracking-wide text-white
              transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              Log in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button
              className="btn mx-3 rounded-lg border-none bg-gradient-to-r from-red to-secondary-red p-3 font-black uppercase tracking-wide text-white
              transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              Sign up
            </button>
          </SignUpButton>
        </div>

        <div className="flex grow justify-end md:hidden">
          <div className="flex flex-col items-center justify-center">
            <div>
              <label className="swap btn-link swap-rotate btn text-dark-gray">
                <input
                  type="checkbox"
                  onClick={() => setDisplayMenu(!displayMenu)}
                />
                <IconMenu2 className="swap-off fill-current" />
                <IconX className="swap-on fill-current" />
              </label>

              {displayMenu ? (
                <ul
                  tabIndex={0}
                  className="menu rounded-box absolute right-1 mt-4 w-52 bg-white p-4 text-xl shadow
                  transition duration-300 ease-in-out"
                >
                  <Link
                    href="/"
                    className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
                  >
                    Home
                  </Link>
                  <Link
                    href="/teams"
                    className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
                  >
                    Teams
                  </Link>
                  <Link
                    href="/training"
                    className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
                  >
                    Training
                  </Link>
                  <Link
                    href="/tryout"
                    className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
                  >
                    Tryout
                  </Link>
                  <Link
                    href="/alumni/a"
                    className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
                  >
                    Alumni
                  </Link>
                </ul>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
