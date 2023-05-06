import type { ReactElement } from "react";
import EditLayout from "../../layouts/editLayout";

const Email = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto flex flex-col items-center px-4 pt-20 text-center md:px-10 lg:px-32 xl:max-w-3xl">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl">
          Blast Email
        </h1>
        <p className="mt-8 mb-12 text-lg">
          Please note that when send is clicked, the email will be sent to all
          emails signed up with an account
        </p>
      </div>
      <section className="p-6 dark:text-gray-100">
        <form className="container mx-auto w-full max-w-xl space-y-6 rounded-xl bg-dark-gray p-8 shadow">
          <div>
            <label className="mb-1 ml-1 block">Subject</label>
            <input className="input-bordered input block h-10 w-full rounded-md bg-white text-dark-gray shadow-sm" />
          </div>
          <div>
            <label className="mb-1 ml-1 block">Message</label>
            <textarea className="textarea-bordered textarea block w-full rounded-md bg-white text-dark-gray"></textarea>
          </div>
          <div>
            <button
              className="btn mx-3 self-center rounded-lg rounded border-none bg-gradient-to-r from-red to-secondary-red px-8 py-3 text-lg font-black uppercase tracking-wide text-white
                text-white transition duration-300 ease-in-out hover:scale-110"
            >
              Send Email
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

Email.getLayout = (page: ReactElement) => {
  return (
    <>
      <EditLayout>{page}</EditLayout>
    </>
  );
};

export default Email;
