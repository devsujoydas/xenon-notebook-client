import { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";

const ResetPassword = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [validToken, setValidToken] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const passwordValue = watch("newPassword", "");

    useEffect(() => {
        if (token) verifyToken();
    }, [token]);

    const verifyToken = async () => {
        try {
            setLoading(true);
            const { data } = await api.get(`/password/reset-password?token=${token}`);
            if (data.success) {
                toast.success("Token verified, you can now reset your password!");
                setValidToken(true);
                setStep(2);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid or expired link");
        } finally {
            setLoading(false);
        }
    };

    const handleRequestLink = async (data) => {
        setLoading(true);
        try {
            await api.post("/password/forgot-password", { email: data.email })
                .then(res => console.log(res.data))
            toast.success("Reset link sent to your email!");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (data) => {
        if (!token) {
            toast.error("Missing reset token");
            return;
        }
        setLoading(true);
        try {
            const { newPassword, confirmNewPassword } = data;
            const { data: res } = await api.post(
                `/password  /reset-password?token=${token}`,
                { newPassword, confirmNewPassword }
            );
            if (res.success) {
                toast.success("Password reset successfully!");
                setTimeout(() => navigate("/signin"), 2000);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Reset failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="min-h-[80vh] flex justify-center items-center"
        >
            <form
                onSubmit={
                    step === 1
                        ? handleSubmit(handleRequestLink)
                        : handleSubmit(handleResetPassword)
                }
                className="bg-white w-full max-w-md mx-3 md:mx-0 p-6 md:p-8 rounded-xl shadow-lg border border-gray-200"
            >
                {/* ICON */}
                <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-black">
                    <User className="text-white w-6 h-6" />
                </div>

                <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">
                    {step === 1 ? "Request Password Reset" : "Set New Password"}
                </h1>

                {/* STEP 1 → Email */}
                {step === 1 && (
                    <div className="mb-4">
                        <label className="text-gray-700 text-sm font-medium mb-1 block">Email</label>
                        <div className="flex items-center border border-gray-300 rounded-lg p-3 text-sm focus-within:ring-2 focus-within:ring-indigo-500 transition">
                            <Mail className="text-gray-400 w-5 mr-2" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                                })}
                                className="outline-none w-full bg-transparent text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                )}

                {/* STEP 2 → Password Reset */}
                {step === 2 && validToken && (
                    <>
                        <div className="mb-4 relative">
                            <label className="text-gray-700 text-sm font-medium mb-1 block">New Password</label>
                            <div className="flex items-center border border-gray-300 rounded-lg p-3 text-sm focus-within:ring-2 focus-within:ring-indigo-500 transition">
                                <Lock className="text-gray-400 w-5 mr-2" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    {...register("newPassword", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Minimum 8 characters required" },
                                    })}
                                    className="outline-none w-full bg-transparent text-gray-800 placeholder-gray-400"
                                />
                                <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>
                            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                        </div>

                        <div className="mb-4 relative">
                            <label className="text-gray-700 text-sm font-medium mb-1 block">Confirm Password</label>
                            <div className="flex items-center border border-gray-300 rounded-lg p-3 text-sm focus-within:ring-2 focus-within:ring-indigo-500 transition">
                                <Lock className="text-gray-400 w-5 mr-2" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    {...register("confirmNewPassword", {
                                        required: "Confirm Password is required",
                                        validate: (value) => value === passwordValue || "Passwords do not match",
                                    })}
                                    className="outline-none w-full bg-transparent text-gray-800 placeholder-gray-400"
                                />
                                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer">
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>
                            {errors.confirmNewPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>}
                        </div>
                    </>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-white font-medium flex justify-center items-center gap-3 transition ${loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                >
                    {loading ? "Please wait..." : step === 1 ? "Send Reset Link" : "Reset Password"}
                </button>

                <p className="text-center mt-3 text-sm text-gray-600">
                    Back to?{" "}
                    <Link to="/signin" className="text-indigo-600 font-semibold underline">
                        Sign in
                    </Link>
                </p>
            </form>
        </motion.div>
    );
};

export default ResetPassword;
