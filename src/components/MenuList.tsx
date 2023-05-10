import { motion } from "framer-motion";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { api } from "../utils/api";

type Props = { isOpen: boolean; isAdmin: boolean };

const MenuList = ({ isOpen, isAdmin }: Props) => {
  return (
    <motion.ul
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "10px" },
      }}
      className="absolute top-full right-0 mt-4 w-full bg-white"
      id="menu"
    >
      <div
        tabIndex={0}
        className={`menu rounded-box absolute right-0 mt-4 items-center bg-white py-4 text-xl shadow-xl
        transition duration-300 ease-in-out ${
          !isOpen ? "pointer-events-none" : ""
        }`}
      >
        <div className="flex flex-col justify-center px-10 ">
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

          <SignedIn>
            {!isAdmin && (
              <>
                <div className="divider my-0"></div>
                <Link
                  href="/user/training"
                  className="tracking-none btn-ghost btn-wide btn  text-xl font-black text-dark-gray hover:text-red"
                >
                  My Trainings
                </Link>
              </>
            )}
          </SignedIn>
        </div>

        <div className="flex flex-row">
          <SignedOut>
            <SignInButton>
              <button
                className="btn m-3 rounded-lg border-none bg-gradient-to-r from-red to-secondary-red p-3 font-black uppercase tracking-wide text-white
              transition duration-300 ease-in-out hover:scale-110"
              >
                Log in
              </button>
            </SignInButton>
            <SignUpButton>
              <button
                className="btn m-3 rounded-lg border-none bg-gradient-to-r from-red to-secondary-red p-3 font-black uppercase tracking-wide text-white
              transition duration-300 ease-in-out hover:scale-110"
              >
                Sign up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </motion.ul>
  );
};

export default MenuList;
