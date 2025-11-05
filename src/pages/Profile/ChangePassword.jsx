import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import api from "../../services/api";
import { Eye, EyeOff, Lock } from "lucide-react";

const ChangePassword = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const { logout } = useAuth();
  const newPassword = watch("newPassword");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = data;
      if (newPassword !== confirmPassword) {
        toast.error("New password and confirm password do not match");
        return;
      }
      const res = await api.put("/password/change-password", {
        oldPassword: currentPassword,
        newPassword,
      });
      toast.success(res.data.message);
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update password");
    }
  };

  const inputClass = (error) =>
    `w-full border rounded-md px-10 py-3 md:py-4 placeholder:md:text-md placeholder:text-sm focus:outline-none focus:border-black ${
      error ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg space-y-8">
      <h1 className="text-4xl font-semibold text-gray-900">Change Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          
          {/* Current Password */}
          <div className="relative">
            <label className="block text-black font-semibold mb-2">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                {...register("currentPassword", { required: "Current password is required" })}
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                className={inputClass(errors.currentPassword)}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-black font-semibold mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                className={inputClass(errors.newPassword)}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="relative">
            <label className="block text-black font-semibold mb-2">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === newPassword || "Passwords do not match",
                })}
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                className={inputClass(errors.confirmPassword)}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

        </div>

        <div>
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-black text-white hover:text-black rounded-full font-semibold hover:bg-transparent border border-transparent hover:border-black active:scale-95 transition"
          >
            Update Password
          </button>
        </div>
      </form>

      <div>
        <button
          onClick={logout}
          className="w-full md:w-auto px-8 py-3 bg-red-600 text-white hover:text-black rounded-full font-semibold hover:bg-transparent border border-transparent hover:border-black active:scale-95 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
