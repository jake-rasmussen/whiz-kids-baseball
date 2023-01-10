import { TextInput, Textarea, createStyles } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { IconMail, IconMapPin, IconPhoneCall, IconSend } from "@tabler/icons";

const useStyles = createStyles(() => ({
  label: {
    fontSize: 16,
    color: "grey",
  },
}));

const ContactForm: React.FC = () => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },

    validate: {
      name: isNotEmpty(),
      email: isEmail("Please provide a valid email"),
      subject: isNotEmpty(),
      message: isNotEmpty(),
    },
  });

  return (
    <main id="contact-form" className="relative h-full bg-white">
      <div className="mx-auto flex max-w-5xl flex-col py-10">
        <span className="mx-auto pb-10 text-6xl"> Contact Us </span>
        <div className="flex w-full flex-col lg:flex-row ">
          <div
            id="contact-info-section"
            className="flex w-full flex-col lg:w-[56%]"
          >
            <div className="h-1 w-full bg-[#CC0007]" />
            <div id="contact-icon-list" className="my-4 flex flex-col p-1">
              <div className="flex items-center">
                <IconPhoneCall className="h-auto w-10 justify-start rounded-full bg-[#CC0007] p-2 text-white hover:bg-[#FF141A]" />
                <div className="flex flex-col px-10">
                  <div className="text-lg">Call</div>
                  <div className="text-md">+1 347 000 0000</div>
                </div>
              </div>
              <div className="flex items-center">
                <IconMail className="h-auto w-10 justify-start rounded-full bg-[#CC0007] p-2 text-white hover:bg-[#FF141A]" />
                <div className="flex flex-col px-10">
                  <div className="text-lg">Email</div>
                  <div className="text-md">info@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center">
                <IconMapPin className="h-auto w-10 justify-start rounded-full bg-[#CC0007] p-2 text-white hover:bg-[#FF141A]" />
                <div className="flex flex-col px-10">
                  <div className="text-lg">Location</div>
                  <div className="text-md">1234 Location Drive</div>
                </div>
              </div>
            </div>
            <div className="mb-5 h-1 w-full bg-[#CC0007] lg:hidden" />

            <div id="location-map" className="hidden lg:contents">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12211.268525051191!2d-75.31353371330565!3d40.07949099559987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6be6b132b4dd3%3A0x729816f6f78c9527!2sThe%20Proving%20Grounds!5e0!3m2!1sen!2sus!4v1673367573937!5m2!1sen!2sus"
                className="w-fullpad col-span-2 mb-4 h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="h-1 w-full lg:bg-[#CC0007]" />
          </div>

          <div className="bg-blue-300 flex w-full flex-col lg:ml-2">
            <div className="h-1 w-full bg-[#CC0007]" />
            <form
              onSubmit={form.onSubmit(console.log)}
              className="flex flex-col"
            >
              <TextInput
                label="Name"
                placeholder="Name"
                withAsterisk
                classNames={classes}
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Email"
                classNames={classes}
                placeholder="info@example.com"
                {...form.getInputProps("email")}
                withAsterisk
              />
              <TextInput
                label="Subject"
                placeholder="Subject"
                withAsterisk
                classNames={classes}
                {...form.getInputProps("subject")}
              />
              <Textarea
                minRows={3}
                label="Message"
                autosize
                withAsterisk
                classNames={classes}
                {...form.getInputProps("message")}
              />
              <button
                type="submit"
                className="mx-auto mt-3 flex max-w-min items-center justify-center  rounded-full bg-[#CC0007] py-2 px-4 font-bold text-white hover:bg-[#FF141A]"
              >
                <IconSend className="ml-1" />
                <p className="mx-1">Send</p>
              </button>
            </form>
            <div className="flex h-1 w-full justify-end bg-[#CC0007]" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactForm;
