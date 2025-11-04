import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../../services/api";
import { useAuth } from "../../AuthProvider/AuthProvider";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const { name, email, password } = data;
      const { data: resData } = await api.post("/auth/signup", { name, email, password });

      localStorage.setItem("accessToken", resData.accessToken);
      setUser(resData.user);

      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
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
        <div className="text-center mb-5">
          <div className="border w-fit bg-black p-2 rounded-full mx-auto">
            <User className="text-white" />
          </div>
          <h1 className="md:text-3xl mt-3 font-semibold">Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <label className="text-slate-800 text-sm font-medium mb-1 block">Name</label>
            <div className="flex items-center border border-zinc-200 rounded-md p-3 text-sm">
              <User className="text-zinc-400 w-5 mr-2" />
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
                className="outline-none w-full"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <label className="text-slate-800 text-sm font-medium mb-1 block">Email</label>
            <div className="flex items-center border border-zinc-200 rounded-md p-3 text-sm">
              <Mail className="text-zinc-400 w-5 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
                })}
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
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" }
                })}
                className="outline-none w-full"
              />
              <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer py-3 rounded-md text-white font-medium ${loading ? "bg-blue-500" : "bg-blue-700"} flex justify-center items-center gap-3`}
          >
            {loading && <span className="w-5 h-5 border-t-2 border-b-2 rounded-full animate-spin"></span>}
            <span>{loading ? "Signing up..." : "Sign Up"}</span>
          </button>
        </form>

        <p className="text-sm text-center mt-5">
          Already have an account? <Link to="/signin" className="text-violet-600 font-semibold">Sign In</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;
