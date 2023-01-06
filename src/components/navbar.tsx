import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="fixed w-full bg-[#1F1F1F]">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a href="https://flowbite.com/" className="flex items-center">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6"
            alt="Flowbite Logo"
            width={30}
            height={30}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            Whiz Kids
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="
          ml-3 
          inline-flex 
          items-center 
          rounded-lg 
          p-2 
          text-sm 
          text-gray-500 
          hover:bg-gray-100 
          focus:outline-none 
          focus:ring-2 
          focus:ring-gray-200 
          md:hidden
          "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            className="
            mt-4 
            flex 
            flex-col 
            rounded-lg 
            border 
            border-gray-100 
            p-4 
            md:mt-0 
            md:flex-row 
            md:space-x-8 
            md:border-0 
            md:text-sm 
            md:font-medium
            "
          >
            <li>
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-white md:text-[#FFFFFF]"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-[#C2C2C2] hover:bg-[#C2C2C2] md:border-0 md:hover:bg-transparent md:hover:text-[#FFFFFF]"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-[#C2C2C2] hover:bg-[#C2C2C2] md:border-0 md:hover:bg-transparent md:hover:text-[#FFFFFF]"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-[#C2C2C2] hover:bg-[#C2C2C2] md:border-0 md:hover:bg-transparent md:hover:text-[#FFFFFF]"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-[#C2C2C2] hover:bg-[#C2C2C2] md:border-0 md:hover:bg-transparent md:hover:text-[#FFFFFF]"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
