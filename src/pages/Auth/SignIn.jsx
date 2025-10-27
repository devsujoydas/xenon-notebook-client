import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../AuthProvider/AuthProvider";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const email = data.email
      const password = data.password
      await login(email, password);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[80dvh] w-full flex justify-center items-center ">
      <div className="bg-white w-[420px] p-5 md:p-8 rounded-xl shadow-md">
        <div className="text-black text-center mb-5">
          <div className="border w-fit bg-black p-2 rounded-full mx-auto">
            <User className="text-white" />
          </div>
          <h1 className="md:text-3xl mt-3 font-semibold">Sign In</h1>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="text-slate-800 text-sm font-medium mb-1 block">Email</label>
            <input type="email" placeholder="Enter email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 border border-zinc-200 rounded-md outline-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
          </div>
          <div className="relative">
            <label className="text-slate-800 text-sm font-medium mb-1 block">Password</label>
            <input type={show ? "text" : "password"} placeholder="Enter password"
              {...register("password", { required: true })}
              className="w-full px-4 py-3 border border-zinc-200 rounded-md outline-blue-500"
            />
            <div onClick={() => setShow(!show)} className="absolute top-9 right-3 cursor-pointer">
              {show ? <Eye className="w-5 text-zinc-500" /> : <EyeOff className="w-5 text-zinc-500" />}
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
          </div>
          <button type="submit"
            className={`w-full py-3 rounded-md text-white font-medium ${loading ? "bg-blue-500" : "bg-blue-700"} flex justify-center items-center gap-3`}>
            {loading && <span className="w-5 h-5 border-t-2 border-b-2 rounded-full animate-spin"></span>}
            <span>{loading ? "Signing in..." : "Sign In"}</span>
          </button>
        </form>
        <p className="text-sm text-center mt-5">
          Don't have an account? <Link to="/signup" className="text-violet-600 font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
