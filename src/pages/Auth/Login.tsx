import React, { FormEvent } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

import login from "~/api/POST/login";

import { LoginParams } from "shared/models";
import { Link } from "react-router-dom";

let notification = "";

function Login() {
  // const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: LoginParams) =>
      login({ email: data.email, password: data.password }),
    {
      onSuccess: () => {
        // queryClient.invalidateQueries(["user"]);

        toast.success("Sign in successfully", {
          id: notification,
        });
      },
      onError: (error) => {
        toast.success((error as Error).message, {
          id: notification,
        });
      },
    }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    notification = toast.loading("Signing in...");

    const form = e.target as unknown as HTMLInputElement[];

    const email = form[0].value;
    const password = form[1].value;

    mutation.mutate({ email, password });
  };

  return (
    <div className="bg-gray h-full min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-center w-96 bg-white rounded-md shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full bg-white p-4 rounded-md"
        >
          <h1 className="font-bold text-blue-700 text-3xl">Nonsense Chat</h1>
          <p className="text-sm opacity-60">Login</p>

          <input type="text" placeholder="Email" className="form-input" />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
          />

          <button className="form-submit-button">Sign In</button>

          <p className="text-sm mt-4">
            Create an account{" "}
            <Link
              to="/register"
              className="underline text-blue-700 cursor-pointer"
            >
              here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
