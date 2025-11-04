import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../../services/api";
import { useAuth } from "../../AuthProvider/AuthProvider";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const { data: resData } = await api.post("/auth/signin", { email: data.email, password: data.password });
      localStorage.setItem("accessToken", resData.accessToken);
      setUser(resData.user);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="h-[80dvh] w-full flex justify-center items-center"
    > 
      <div className="bg-white w-[420px] p-5 md:p-8 rounded-xl shadow-lg">
        <div className="text-black text-center mb-5">
          <div className="border w-fit bg-black p-2 rounded-full mx-auto">
            <User className="text-white" />
          </div>
          <h1 className="md:text-3xl mt-3 font-semibold">Sign In</h1>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <label className="text-slate-800 text-sm font-medium mb-1 block">Email</label>
            <div className="flex items-center border border-zinc-200 rounded-md p-3 text-sm">
              <Mail className="text-zinc-400 w-5 mr-2" />
              <input
                type="email"
                placeholder="Enter email"
                {...register("email", { required: "Email is required" })}
                className="outline-none w-full"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-slate-800 text-sm font-medium mb-1 block">Password</label>
            <div className="flex items-center border border-zinc-200 rounded-md p-3 text-sm">
              <Lock className="text-zinc-400 w-5 mr-2" />
              <input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", { required: "Password is required" })}
                className="outline-none w-full"
              />
              <span onClick={() => setShow(!show)} className="cursor-pointer">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" className="w-4 h-4 accent-[#4B1E2F]" {...register("remember")} />
              Remember me
            </label>
            <Link to="/reset-password" className="text-[#4B1E2F] text-sm font-medium underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 cursor-pointer rounded-md text-white font-medium ${loading ? "bg-blue-500" : "bg-blue-700"} flex justify-center items-center gap-3`}
          >
            {loading && <span className="w-5  h-5 border-t-2 border-b-2 rounded-full animate-spin"></span>}
            <span>{loading ? "Signing in..." : "Sign In"}</span>
          </button>
        </form>

        <p className="text-sm text-center mt-5">
          Don't have an account? <Link to="/signup" className="text-violet-600 font-semibold">Sign Up</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignIn;
