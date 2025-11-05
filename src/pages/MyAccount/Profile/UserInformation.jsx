import { Pen } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import { useState } from "react";
import api from "../../../services/api";

const UserInformation = () => {
  const { user, setUser } = useAuth();
  const [previewImg, setPreviewImg] = useState(user?.profileImg || null);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      profileImg: null,
    },
  });

  const watchProfileImg = watch("profileImg");

  const onSubmit = async (data) => {
    try { 
      const res = await api.put("/users/profile", {
        name: data.name,
        phone: data.phone || "",
      });

      toast.success("Profile updated successfully!");
      reset(res.data.user);
      setUser(res.data.user);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800">User Information</h2>
 
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-28 h-28 md:w-36 md:h-36">
          <img
            src={previewImg || "/default.png"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-gray-200 shadow-sm"
          />
          <label className="absolute bottom-2 right-2 p-2 bg-indigo-600 rounded-full text-white cursor-pointer hover:bg-indigo-500 active:scale-95 transition-transform">
            <Pen size={16} />
            <input
              type="file"
              accept="image/*"
              {...register("profileImg")}
              className="hidden"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setPreviewImg(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </label>
        </div>
      </div>
 
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
     
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Your name"
            className={`w-full px-4 py-3 md:py-4 border rounded-md focus:outline-none focus:border-black placeholder:text-sm ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
 
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Phone</label>
          <input
            {...register("phone")}
            placeholder="+880123456789"
            className="w-full px-4 py-3 md:py-4 border rounded-md focus:outline-none focus:border-black placeholder:text-sm border-gray-300"
          />
        </div>
 
        <div className="md:col-span-2 mt-4">
          <button className="w-full md:w-auto px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-transparent hover:text-black border border-transparent hover:border-black active:scale-95 transition">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInformation;
