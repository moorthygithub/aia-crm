import { Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <section className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex-1 lg:w-3/5 m-4 lg:m-12 px-4 lg:px-8">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Forget Password
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email to reset your password.
          </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-full max-w-md lg:w-3/4">
          <div className="mb-6 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Your email
            </Typography>
            <Input
              id="email"
              name="email"
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Reset Password
          </Button>

          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Remembered your password?
            <Link to="/" className="text-gray-900 ml-1">
              Sign In
            </Link>
          </Typography>
        </form>
      </div>
      <div className="w-full lg:w-2/5 h-auto lg:h-full hidden  lg:block">
        <img
          src="/img/pattern.png"
          className="h-full max-h-screen w-full object-cover rounded-none"
          alt="Forget Password Background"
        />
      </div>
    </section>
  );
};

export default ForgetPassword;
