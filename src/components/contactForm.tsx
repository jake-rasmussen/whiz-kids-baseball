import { TextInput, Textarea } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { IconMail, IconMapPin, IconPhoneCall, IconSend } from "@tabler/icons";

const ContactForm: React.FC = () => {
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
    <main id="contact-form" className="relative bg-dark-gray py-10 lg:px-4">
      <div className="flex w-full flex-col items-center lg:mx-auto lg:max-w-6xl">
        <div className="mb-10 inline-flex w-full items-center justify-center">
          <hr className="mt-8 h-1 w-96 -translate-y-4 border-0 bg-red" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-dark-gray px-3 text-center text-3xl font-bold uppercase tracking-wide text-white">
            Contact Us
          </span>
        </div>

        <div className="flex w-full flex-col lg:flex-row lg:space-x-20">
          <div
            id="contact-info-section"
            className="flex w-full flex-col lg:w-[56%] lg:space-y-3"
          >
            <div className="hidden sm:contents">
              <div
                id="contact-icon-list"
                className="my mb-6 ml-[4%] flex flex-col justify-center space-y-3 p-1 md:ml-0 md:flex-row lg:mb-0 lg:flex-col"
              >
                <div className="mx-5 flex items-center justify-start space-x-5 md:justify-center lg:mx-0 lg:justify-start">
                  <IconPhoneCall className="h-auto w-10 justify-start rounded-full bg-red p-2 text-white transition duration-150 ease-in-out hover:-translate-y-1  hover:scale-110 hover:bg-white hover:text-red" />
                  <div className="flex md:flex-col">
                    <h1 className="text-lg font-medium font-black uppercase tracking-wide text-white">
                      Call
                    </h1>
                    <h2 className="text-md ml-3 font-normal text-light-gray md:ml-0">
                      +1 347 000 0000
                    </h2>
                  </div>
                </div>

                <div className="mx-5 flex items-center justify-start space-x-5 md:justify-center lg:mx-0 lg:justify-start">
                  <IconMail className="h-auto w-10 justify-start rounded-full bg-red p-2 text-white transition duration-150 ease-in-out hover:-translate-y-1  hover:scale-110 hover:bg-white hover:text-red" />
                  <div className="flex md:flex-col">
                    <h1 className="text-lg font-medium font-black uppercase tracking-wide text-white">
                      Email
                    </h1>
                    <h2 className="text-md ml-3 font-normal text-light-gray md:ml-0">
                      info@example.com
                    </h2>
                  </div>
                </div>

                <div className="mx-5 flex items-center justify-start space-x-5 md:justify-center lg:mx-0 lg:justify-start">
                  <IconMapPin className="h-auto w-10 justify-start rounded-full bg-red p-2 text-white transition duration-150 ease-in-out hover:-translate-y-1  hover:scale-110 hover:bg-white hover:text-red" />
                  <div className="flex md:flex-col">
                    <h1 className="text-lg font-medium font-black uppercase tracking-wide text-white">
                      Location
                    </h1>
                    <h2 className="text-md ml-3 font-normal text-light-gray md:ml-0">
                      1234 Location Drive
                    </h2>
                  </div>
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

          <div className="flex w-full flex-col place-content-center space-y-3 py-5  ">
            <form
              onSubmit={form.onSubmit(console.log)}
              className="mx-[4%] flex flex-col space-y-3 md:mx-20 lg:m-0"
            >
              <div className="flex w-full place-content-start space-x-2">
                <div className="w-full">
                  <h1 className="text-sm font-black uppercase tracking-wide text-white ">
                    Name <span className="text-red">*</span>
                  </h1>
                  <TextInput
                    placeholder="Name"
                    {...form.getInputProps("name")}
                  />
                </div>

                <div className="w-full">
                  <h1 className="text-sm font-black uppercase tracking-wide text-white ">
                    Email <span className="text-red">*</span>
                  </h1>
                  <TextInput
                    placeholder="info@example.com"
                    {...form.getInputProps("email")}
                  />
                </div>
              </div>

              <div>
                <h1 className="text-sm font-black uppercase tracking-wide text-white ">
                  Subject <span className="text-red">*</span>
                </h1>
                <TextInput
                  placeholder="Subject"
                  withAsterisk
                  {...form.getInputProps("subject")}
                />
              </div>

              <div>
                <h1 className="text-sm font-black uppercase tracking-wide text-white ">
                  Message <span className="text-red">*</span>
                </h1>
                <Textarea
                  minRows={12}
                  autosize
                  withAsterisk
                  {...form.getInputProps("message")}
                />
                <button
                  type="submit"
                  className="mx-auto mt-3 flex max-w-min items-center justify-center space-x-1 rounded-full bg-red py-2 px-4 font-bold text-white transition duration-150 ease-in-out hover:-translate-y-1  hover:scale-110 hover:bg-light-gray  hover:text-red "
                >
                  <IconSend /> <span className="px-2">Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactForm;
