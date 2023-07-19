import useAuth from "@/hooks/useAuth";
import createJWT from "@/utils/createJWT";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = ({ from }) => {
  const { googleLogin } = useAuth();
  const { replace, refresh } = useRouter();

  const handleGoogleLogin = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const { user } = await googleLogin();
      await createJWT({ email: user.email });
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
    <div className="flex justify-center items-center cursor-pointer">
    <button
      onClick={handleGoogleLogin}
      type="button"
      className=""
    >
      <FcGoogle className="text-3xl mr-3" /> 
    </button><p>Continue with google</p>
    </div>
  );
};

export default GoogleLogin;
