import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { PhotoIcon } from "@heroicons/react/24/solid";

import register from "~/api/POST/register";

import { RegisterParams } from "shared/models";
import { Link } from "react-router-dom";

let notification = "";

function Register() {
  // const queryClient = useQueryClient();

  const [previewUrl, setPreviewUrl] = useState("");
  const [, setFile] = useState<File | null>(null);

  const mutation = useMutation((data: RegisterParams) => register(data), {
    onSuccess: () => {
      // queryClient.invalidateQueries(["user"]);

      toast.success("Successfully created your account", {
        id: notification,
      });
    },
    onError: (error) => {
      toast.error((error as Error).message, {
        id: notification,
      });
    },
  });

  const handleChange = (e: ChangeEvent) => {
    const form = e.target as HTMLInputElement;
    const file = form.files ? form.files[0] : null;

    if (!file) {
      setPreviewUrl("");
      return;
    }

    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    notification = toast.loading("Creating your account...");

    const form = e.target as unknown as HTMLInputElement[];

    const displayName = form[0].value;
    const email = form[1].value;
    const password = form[2].value;
    const file = form[3].files ? form[3].files[0] : null;

    mutation.mutate({ displayName, email, password, file });
  };

  return (
    <div className="bg-gray-100 h-full min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-center w-96 bg-white rounded-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full bg-white p-4 rounded-md"
        >
          <h1 className="font-bold text-blue-700 text-3xl">Nonsense Chat</h1>
          <p className="text-sm opacity-60">Register</p>
          <input
            type="text"
            placeholder="Display name"
            className="form-input"
          />
          <input type="text" placeholder="Email" className="form-input" />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
          />
          <input
            type="file"
            className="hidden"
            id="file"
            accept="image/*"
            onChange={handleChange}
          />
          <label
            htmlFor="file"
            className="flex items-center self-start py-3 cursor-pointer gap-1"
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="w-8 h-8" />
            ) : (
              <PhotoIcon className="w-8 h-8 object-contain text-blue-500" />
            )}
            <p className="text-xs opacity-80">Select an Avatar</p>
          </label>
          <button className="form-submit-button">Register</button>

          <p className="text-sm mt-4">
            Already have an account? Login{" "}
            <Link
              to="/login"
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

export default Register;
