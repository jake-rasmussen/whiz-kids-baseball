import logo from "../../assets/images/logo.png";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import BurgerMenu from "./Burger";
import { api } from "../utils/api";

const NavBar: React.FC = () => {
  const { isSignedIn } = useUser();
  const { data: isAdmin, isLoading } = api.user.isUserAdmin.useQuery(
    undefined,
    { enabled: !!isSignedIn }
  );

  return (
    <>
      <div
        className="sticky top-0 z-20 flex min-h-[7vh] w-full flex-row items-center justify-items-stretch bg-white p-3 shadow-xl"
        id="menu"
      >
        <Image src={logo} alt="Whiz Kids Logo" className="mr-5 h-12 w-auto" />

        <div className="hidden grow flex-row text-lg lg:flex">
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

        <div className="flex w-full justify-end">
          <div className="flex hidden lg:block">
            <SignedOut>
              <SignInButton>
                <button
                  className="btn mx-3 rounded-lg border-none bg-gradient-to-r from-red to-secondary-red p-3 font-black uppercase tracking-wide text-white
                transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                >
                  Log in
                </button>
              </SignInButton>
              <SignUpButton>
                <button
                  className="btn mx-3 rounded-lg border-none bg-gradient-to-r from-red to-secondary-red p-3 font-black uppercase tracking-wide text-white
                transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                >
                  Sign up
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="mx-5 my-2">
                {isAdmin ? (
                  <div className="flex-row text-lg">
                    <Link
                      href="/admin"
                      className="link-underline link-underline-black mx-2 hidden font-extrabold text-red hover:text-red md:block "
                    >
                      Admin Edit
                    </Link>
                  </div>
                ) : (
                  <div>
                    {!isLoading ? (
                      <div className="flex-row text-lg">
                        <Link
                          href="/"
                          className="link-underline link-underline-black mx-2 hidden font-extrabold text-dark-gray hover:text-red md:block"
                        >
                          My Trainings
                        </Link>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </div>
            </SignedIn>
          </div>

          <div className="mx-4 flex flex-row items-center justify-end gap-12">
            <SignedIn>
              <UserButton />
            </SignedIn>

            <div className="block lg:hidden">
              <BurgerMenu isAdmin={isAdmin ?? false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
