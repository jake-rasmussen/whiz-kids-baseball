import { motion } from "framer-motion";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  isOpen: boolean;
  isAdmin: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const MenuList = ({ isOpen, isAdmin, setIsOpen }: Props) => {
  return (
    <motion.ul
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.3 }}
      variants={{
        open: { opacity: 1, x: 0 },
        closed: { opacity: 1, x: "-100%" },
      }}
      className="absolute top-full right-0 w-full"
      id="menu"
    >
      <div
        tabIndex={0}
        className={`flex h-[100vh] w-[100vw] items-center justify-center overflow-y-scroll bg-white text-xl
        transition duration-300 ease-in-out ${
          !isOpen ? "pointer-events-none" : ""
        }`}
      >
        <div className="mb-20 flex flex-col justify-center gap-4 px-4">
          <Link
            href="/"
            className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/teams"
            className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
            onClick={() => setIsOpen(false)}
          >
            Teams
          </Link>
          <Link
            href="/training"
            className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
            onClick={() => setIsOpen(false)}
          >
            Training
          </Link>
          <Link
            href="/tryout"
            className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
            onClick={() => setIsOpen(false)}
          >
            Tryout
          </Link>
          <Link
            href="/alumni/a"
            className="tracking-none btn-ghost btn text-3xl font-black text-dark-gray hover:text-red"
            onClick={() => setIsOpen(false)}
          >
            Alumni
          </Link>

          <SignedIn>
            {!isAdmin && (
              <>
                <div className="divider my-0" />
                <Link
                  href="/user/training"
                  className="tracking-none btn-ghost btn w-full items-center text-xl font-black text-dark-gray hover:text-red"
                  onClick={() => setIsOpen(false)}
                >
                  My Trainings
                </Link>
              </>
            )}
          </SignedIn>

          <SignedOut>
            <div className="divider my-0" />
            <div className="flex flex-wrap justify-center">
              <SignInButton>
                <button
                  className="btn-wide btn m-1 m-4 rounded-lg border-none bg-gradient-to-r from-red to-secondary-red p-3 font-black uppercase tracking-wide text-white
                transition duration-300 ease-in-out hover:scale-110"
                >
                  Log in
                </button>
              </SignInButton>
              <SignUpButton>
                <button
                  className="btn-wide btn m-1 m-4 rounded-lg border-none bg-gradient-to-r from-red to-secondary-red p-3 font-black uppercase tracking-wide text-white
                  transition duration-300 ease-in-out hover:scale-110"
                >
                  Sign up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </div>
    </motion.ul>
  );
};

export default MenuList;
