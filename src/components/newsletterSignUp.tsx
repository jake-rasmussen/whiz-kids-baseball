import { TextInput, createStyles } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";

const useStyles = createStyles(() => ({
  label: {
    fontSize: 18,
    color: "black",
  },
  icon: {
    color: "",
  },
}));

interface Props {
  teamId: number;
  teamName: string;
}

const NewsletterSignUp: React.FC<Props> = ({ teamId, teamName }) => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: isEmail("Please provide a valid email"),
    },
  });

  return (
    <main
      id="contact-form"
      className="flex flex-col place-content-center px-2 md:px-0"
    >
      <div className="flex flex-col space-y-3">
        <div className="text-center text-xl font-extrabold uppercase tracking-tight text-dark-gray sm:text-2xl">
          The {teamName} Newsletter
        </div>
        <div className="text-center text-sm text-dark-gray">
          Feel free to sign up for email notifications. We will let you know of
          any practice changes or tournamnet updates this way!
        </div>
        <form
          onSubmit={form.onSubmit(console.log)}
          className="flex flex-col place-content-center space-y-2"
        >
          <h1 className="text-sm font-black uppercase tracking-wide text-dark-gray ">
            Email <span className="text-red">*</span>
          </h1>
          <TextInput
            placeholder="info@example.com"
            classNames={classes}
            className="w-full"
            {...form.getInputProps("email")}
          />

          <button
            type="submit"
            className="mx-auto mt-3 flex max-w-min items-center justify-center space-x-1 rounded-full bg-red 
            py-2 px-4 font-bold text-white transition duration-150 ease-in-out  hover:scale-110 hover:bg-secondary-red"
            onClick={() => console.log(` number is ${teamId}`)}
          >
            Join
          </button>
        </form>
      </div>
    </main>
  );
};

export default NewsletterSignUp;
