import { useState } from "react";
import { api } from "../utils/api";
import { toast, Toaster } from "react-hot-toast";
import { isEmptyString } from "../utils/helpers";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userEmail: "",
    message: "",
  });

  const resetForm = () => {
    setFormData({
      fullName: "",
      userEmail: "",
      message: "",
    });
  };

  const sendEmail = api.email.sendContactUsEmail.useMutation({
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
      isEmptyString(formData.fullName) ||
      isEmptyString(formData.userEmail) ||
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
      fullName: formData.fullName,
      userEmail: formData.userEmail,
      message: formData.message,
    });
  };

  return (
    <>
      <form className="ng-untouched ng-pristine ng-valid flex flex-col space-y-6 py-6 md:py-0 md:px-6">
        <Toaster />
        <label className="block">
          <span className="mb-1">Full name</span>
          <input
            className="input-bordered input block h-10 w-full rounded-md bg-white font-semibold text-dark-gray shadow-sm"
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.currentTarget.value })
            }
            value={formData.fullName}
            required
          />
        </label>
        <label className="block">
          <span className="mb-1">Email address</span>
          <input
            className="input-bordered input block h-10 w-full rounded-md bg-white font-semibold text-dark-gray shadow-sm"
            type="email"
            onChange={(e) =>
              setFormData({ ...formData, userEmail: e.currentTarget.value })
            }
            value={formData.userEmail}
            required
          />
        </label>
        <label className="block">
          <span className="mb-1">Message</span>
          <textarea
            className="text-md textarea-bordered textarea block w-full rounded-md bg-white font-semibold text-dark-gray"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.currentTarget.value })
            }
            required
          ></textarea>
        </label>
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
          Submit
        </button>
      </form>
    </>
  );
};

export default ContactForm;
