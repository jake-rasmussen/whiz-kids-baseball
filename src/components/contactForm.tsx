import { TextInput, Textarea, createStyles } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { IconMail, IconMapPin, IconPhoneCall, IconSend } from "@tabler/icons";

const useStyles = createStyles(() => ({
  label: {
    fontSize: 20,
    color: "white",
  },
  icon: {
    color: "",
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
      name: isNotEmpty("Please provide a your name"),
      email: isEmail("Please provide a valid email"),
      subject: isNotEmpty(),
      message: isNotEmpty(),
    },
  });

  return (
    <main id="contact-form" className="relative bg-dark-gray py-10 px-4">
      <div className=" mx-auto flex max-w-6xl flex-col items-center">
        <div className="mb-10 inline-flex w-full items-center justify-center">
          <hr className="mt-8 h-1 w-96 -translate-y-4 border-0 bg-red" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-dark-gray px-3 text-3xl font-bold uppercase tracking-wide text-white">
            Contact Us
          </span>
        </div>
        <div className="flex w-full flex-col lg:flex-row lg:space-x-4">
          <div
            id="contact-info-section"
            className="flex w-full flex-col border-t-4 border-red lg:w-[56%] lg:space-y-3 lg:border-b-4 "
          >
            <div
              id="contact-icon-list"
              className="my-4 mb-6 flex flex-col space-y-3 border-red p-1 lg:mb-0"
            >
              <div className="flex items-center space-x-5">
                <IconPhoneCall className="h-auto w-10 justify-start rounded-full bg-red p-2 text-white transition delay-150 duration-150 ease-in-out hover:-translate-y-1  hover:scale-110 hover:bg-light-gray  hover:text-red" />
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium text-white">Call</h1>
                  <h2 className="text-md font-normal text-light-gray">
                    +1 347 000 0000
                  </h2>
                </div>
              </div>
              <div className="flex items-center space-x-5">
                <IconMail className="h-auto w-10 justify-start rounded-full bg-red p-2 text-white transition delay-150 duration-150 ease-in-out hover:-translate-y-1  hover:scale-110 hover:bg-light-gray  hover:text-red" />
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium text-white">Email</h1>
                  <h2 className="text-md font-normal text-light-gray">
                    info@gmail.com
                  </h2>
                </div>
              </div>
              <div className="flex items-center space-x-5">
                <IconMapPin className="h-auto w-10 justify-start rounded-full bg-red p-2 text-white transition delay-150 duration-150 ease-in-out hover:-translate-y-1  hover:scale-110 hover:bg-light-gray  hover:text-red" />
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium text-white">Location</h1>
                  <h2 className="text-md font-normal text-light-gray">
                    1234 Location Drive
                  </h2>
                </div>
              </div>
            </div>

            <div id="location-map" className=" hidden lg:flex">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12211.268525051191!2d-75.31353371330565!3d40.07949099559987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6be6b132b4dd3%3A0x729816f6f78c9527!2sThe%20Proving%20Grounds!5e0!3m2!1sen!2sus!4v1673367573937!5m2!1sen!2sus"
                className="mb-4 h-[290px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="flex w-full flex-col place-content-center space-y-3 border-y-4 border-red py-5  ">
            <form
              onSubmit={form.onSubmit(console.log)}
              className="flex flex-col space-y-3"
            >
              <div className="flex w-full place-content-start space-x-2">
                <TextInput
                  label="Name"
                  placeholder="Name"
                  withAsterisk
                  classNames={classes}
                  className="w-full"
                  {...form.getInputProps("name")}
                />
                <TextInput
                  label="Email"
                  placeholder="info@example.com"
                  withAsterisk
                  classNames={classes}
                  className="w-full"
                  {...form.getInputProps("email")}
                />
              </div>

              <TextInput
                label="Subject"
                placeholder="Subject"
                withAsterisk
                classNames={classes}
                {...form.getInputProps("subject")}
              />
              <Textarea
                minRows={12}
                label="Message"
                autosize
                withAsterisk
                classNames={classes}
                {...form.getInputProps("message")}
              />
              <button
                type="submit"
                className="mx-auto mt-3 flex max-w-min items-center justify-center space-x-1 rounded-full bg-red py-2 px-4 font-bold text-white transition duration-150 ease-in-out hover:-translate-y-1  hover:scale-110 hover:bg-light-gray  hover:text-red "
              >
                <IconSend /> Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactForm;
