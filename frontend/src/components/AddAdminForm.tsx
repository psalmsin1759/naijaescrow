import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { adminSchema } from "@/validations/adminSchema";
import { useAuth } from "@/context/AuthContext";
import { addAdmin } from "@/utils/api/Admin";
import { toast } from "react-toastify";

type AddAdminInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export default function AddAdminForm({ onSuccess }: { onSuccess: () => void }) {
  const { auth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddAdminInputs>({
    resolver: yupResolver(adminSchema),
  });

  const onSubmit = async (data: AddAdminInputs) => {
    try {
      const res = await addAdmin({ ...data, business: auth?.business });
      if (res.success) {
        toast.success("Admin added");
        onSuccess();
      } else {
        toast.error(res.message || "Failed to add admin");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register("firstName")}
          placeholder="First Name"
          className="w-full p-2 border rounded"
        />
        {errors.firstName && (
          <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("lastName")}
          placeholder="Last Name"
          className="w-full p-2 border rounded"
        />
        {errors.lastName && (
          <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("phone")}
          placeholder="Phone"
          className="w-full p-2 border rounded"
        />
        {errors.phone && (
          <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("password")}
          placeholder="Temporary Password"
          type="password"
          className="w-full p-2 border rounded"
        />
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-white px-4 py-2 rounded w-full"
      >
        {isSubmitting ? "Adding..." : "Add Admin"}
      </button>
    </form>
  );
}
