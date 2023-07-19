"use client";

import GoogleLogin from "@/components/GoogleLogin";
import useAuth from "@/hooks/useAuth";
import createJWT from "@/utils/createJWT";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const { createUser, profileUpdate } = useAuth();
  const search = useSearchParams();
  const from = search.get("redirectUrl") || "/";
  const { replace, refresh } = useRouter();

  const uploadImage = async (event) => {
    const formData = new FormData();
    if (!event.target.files[0]) return;
    formData.append("image", event.target.files[0]);
    const toastId = toast.loading("Image uploading...");
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Failed to upload image");

      const data = await res.json();
      toast.dismiss(toastId);
      toast.success("Image uploaded successfully!");
      setValue("photo", data.data.url);
    } catch (error) {
      toast.error("Image not uploaded!");
      toast.dismiss(toastId);
    }
  };

  const onSubmit = async (data, event) => {
    const { name, email, password, photo } = data;
    const toastId = toast.loading("Loading...");
    try {
      await createUser(email, password);
      await createJWT({ email });
      await profileUpdate({
        displayName: name,
        photoURL: photo,
      });
      startTransition(() => {
        refresh();
        replace(from);
        toast.dismiss(toastId);
        toast.success("User signed in successfully");
      });
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "User not signed in");
    }
  };

  return (
   
    <form onSubmit = {handleSubmit(onSubmit)} >
                  
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="name"
                      className="inline-block mb-1 font-medium"
                    >
                      Name
                    </label>
                     <input
                      type="text"
                      placeholder="name"
                      id="name"
                      name="name"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-base mt-1">
                        Please enter your name.
                      </span>
                    )}
                  
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="email"
                      className="inline-block mb-1 font-medium"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      id="email"
                      name="email"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      autoComplete="email"
                      {...register("email", {
                        required: true,
                        pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
                      })}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-base mt-1">
                        Please enter a valid email address.
                      </span>
                    )}
                  </div>
                 <div className="mb-1 sm:mb-2">
                     <label
                      htmlFor="password"
                      className="inline-block mb-1 font-medium"
                     >
                            Password
                     </label>
                     <input
                       type="password"
                       placeholder="password"
                       id="password"
                       name="password"
                       className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                       autoComplete="new-password"
                       {...register("password", { required: true, minLength: 6 })}
                     />
                      {errors.password && (
                        <span className="text-red-500 text-base mt-1">
                          Please enter a password.
                        </span>
                      )}
                  </div>

                  <div className="mb-1 sm:mb-2">
                     <label
                      htmlFor="confirmPassword"
                      className="inline-block mb-1 font-medium"
                     >
                            confirm Password
                     </label>
                       <input
                        type="password"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                        autoComplete="new-password"
                        {...register("confirmPassword", {
                          required: true,
                          minLength: 6,
                          validate: (value) =>
                            value === getValues("password") || "The passwords do not match.",
                        })}
                      />
                      {errors.confirmPassword && (
                        <span className="text-red-500 text-base mt-1">
                          {errors.confirmPassword.message || "Please confirm your password."}
                        </span>
                      )}
                     
                  </div>

                     <div className="mb-1 sm:mb-2">
                     <label
                      htmlFor="password"
                      className="inline-block mb-1 font-medium"
                     >
                            Input Photo
                     </label>
                        <input
          type="file"
          id="photo"
          onChange={uploadImage}
          className="file-input file-input-bordered file-input-primary w-full"
        />
                      
                  </div>

                  <div className="mt-4 mb-2 sm:mb-4">
                    <button button className = "inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
                       type="submit"> Sign Up
                    </button>
                   
                  </div>
                   <p className="mt-3">
        Already have an account?{" "}
        <Link className="text-blue-500 underline ml-1" href="/login">
          Login
        </Link>
      </p>
      <div className="divider mt-5">OR</div>
                  <GoogleLogin  from={from} />
               
                </form>
   
  );
};

export default SignupForm;
