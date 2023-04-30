import logo from "../../assets/images/logo.png";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { IconMenu2, IconX } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import BurgerMenu from "./Burger";

const NavBar: React.FC = () => {
  return (
    <>
      <div className="sticky top-0 z-20 flex min-h-[7vh] w-full flex-row items-center justify-items-stretch bg-white p-3 shadow-xl" id="menu">
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
          <SignedOut>
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
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </div>

        <div className="flex grow justify-end md:hidden">
          <BurgerMenu />
        </div>
      </div>
    </>
  );
};

export default NavBar;
