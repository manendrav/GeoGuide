import { useForm } from "react-hook-form";
import Input from "../components/layout/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/layout/Button";
import toast from "react-hot-toast";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  async function signup(data) {
    if (data) {
      try {
        toast.success("Account Created Successfully!!!");
        navigate("/explore");
      } catch (error) {
        console.error("Error occurred:", error);
        toast.error("An error occurred while creating account");
      }
    }
  }

  return (
    <div className="mx-auto max-w-md p-10 rounded-lg bg-gray-50  my-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-gray-500  my-3">
          Join our community and unlock the full potential of our platform
        </p>
      </div>
      <form onSubmit={handleSubmit(signup)} className="space-y-5 mt-5">
        <div className="grid gap-4">
          <Input
            label={"Name"}
            id="name"
            placeholder="Enter your name"
            required
            {...register("name", { required: true })}
          />
        </div>
        <div className="space-y-2">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {
                email: (value) => value.includes("@") || "Invalid email",
              },
            })}
          />
        </div>
        <div className="space-y-2">
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            {...register("password", { required: true })}
          />
        </div>
        <div className="space-y-2">
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Enter your password"
            required
            {...register("confirmPassword", { required: true })}
          />
        </div>
        <div className="flex items-center space-x-2 text-sm ml-3">
          <div className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              id="terms"
              {...register("checkbox", { required: true })}
            />
            <p className="leading-none my-3 text-gray-500" htmlFor="terms">
              I agree to the{" "}
              <Link className="font-semibold"> terms and conditions</Link>
            </p>
          </div>
        </div>
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </form>
      <p className="mt-10 text-center text-sm text-gray-600">
        Already have an account?
        <Link to="/login" className="font-semibold leading-6 underline ">
          {" "}
          Sign in
        </Link>
      </p>
    </div>
  );
}
