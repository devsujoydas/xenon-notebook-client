import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import api from "../../../services/api";
import { useAuth } from "../../../AuthProvider/AuthProvider";
import { motion } from "framer-motion";

const Address = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: user?.addressInfo?.address || "",
      city: user?.addressInfo?.city || "",
      state: user?.addressInfo?.state || "",
      postalCode: user?.addressInfo?.postalCode || "",
      country: user?.addressInfo?.country || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await api.put("/users/address", data);
      toast.success("Address updated successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update address");
    }
  };

  const inputClass = (error) =>
    `w-full border rounded-md px-4 py-3 md:py-4 placeholder:md:text-md placeholder:text-sm focus:outline-none focus:border-black ${
      error ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5 md:space-y-10 bg-white p-6 md:p-10 rounded-xl shadow-lg"
    >
      <h2 className="text-4xl font-semibold text-gray-900">Address</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6 mt-8">
        {/* Address */}
        <div>
          <label className="block text-black font-semibold mb-2">Street / House</label>
          <input
            {...register("address", { required: "Address required" })}
            placeholder="Street / House"
            className={inputClass(errors.address)}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* City, State, Postal Code */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          <div>
            <label className="block text-black font-semibold mb-2">City</label>
            <input
              {...register("city", { required: "City required" })}
              placeholder="City"
              className={inputClass(errors.city)}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-black font-semibold mb-2">State</label>
            <select
              {...register("state", { required: "State required" })}
              defaultValue={user?.addressInfo?.state || ""}
              className={inputClass(errors.state)}
            >
              <option value="" disabled>Select State</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Khulna">Khulna</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Barishal">Barishal</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
            )}
          </div>

          <div>
            <label className="block text-black font-semibold mb-2">Postal Code</label>
            <input
              {...register("postalCode", { required: "Postal code required" })}
              placeholder="Postal Code"
              className={inputClass(errors.postalCode)}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
            )}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-black font-semibold mb-2">Country</label>
          <select
            {...register("country", { required: "Country required" })}
            defaultValue={user?.addressInfo?.country || ""}
            className={inputClass(errors.country)}
          >
            <option value="" disabled>Select Country</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="India">India</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Nepal">Nepal</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-black text-white hover:text-black rounded-full cursor-pointer font-semibold hover:bg-transparent border border-transparent hover:border-black active:scale-95 transition"
          >
            Update Address
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Address;
