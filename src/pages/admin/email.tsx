import { ReactElement, useState } from "react";
import EditLayout from "../../layouts/editLayout";
import { api } from "../../utils/api";
import toast, { Toaster } from "react-hot-toast";
import { isEmptyString } from "../../utils/helpers";

const Email = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: ""
  });

  const resetForm = () => {
    setFormData({
      subject: "",
      message: "",
    });
  };

  const sendEmail = api.email.blastEmailToUsers.useMutation({
    onMutate() {
      toast.loading("Sending Form...");
    },
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Sent Form");
      resetForm();
    },
    onError() {
      toast.dismiss();
      toast.error("Error Sending Form");
    },
  });

  const checkValidInput = () => {
    if (
      isEmptyString(formData.subject) ||
      isEmptyString(formData.message)
    ) {
      return false;
    }

    return true;
  };

  const handleSend = () => {
    if (!checkValidInput()) {
      return;
    }

    sendEmail.mutate({
      subject: formData.subject,
      text: formData.message,
    });
  };

  return (
    <div className="w-full">
      <Toaster position="top-right" />
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
            <input 
              className="input-bordered input block h-10 w-full rounded-md bg-white text-dark-gray shadow-sm" 
              onChange={(e) =>
                setFormData({ ...formData, subject: e.currentTarget.value })
              }
              value={formData.subject}
              required
            />
          </div>
          <div>
            <label className="mb-1 ml-1 block">Message</label>
            <textarea 
              className="textarea-bordered textarea block w-full rounded-md bg-white text-dark-gray"
              onChange={(e) =>
                setFormData({ ...formData, message: e.currentTarget.value })
              }
              value={formData.message}
              required
            />
          </div>
          <div>
            <button
              className="btn mx-3 self-center rounded-lg rounded border-none bg-gradient-to-r from-red to-secondary-red px-8 py-3 text-lg font-black uppercase tracking-wide text-white
                text-white transition duration-300 ease-in-out hover:scale-110"
              type="submit"
              onClick={(e) => {
                handleSend();
                if (checkValidInput()) {
                  e.preventDefault();
                }
              }}
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
