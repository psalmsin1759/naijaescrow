"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserSlash, FaTrash, FaPlus } from "react-icons/fa";
import {
  getAdminsByBusiness,
  Admin,
  deleteAdmin,
} from "@/utils/api/Admin";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import AddAdminForm from "@/components/AddAdminForm";

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.business) {
      fetchAdmins();
    }
  }, [auth?.business]);

  const fetchAdmins = async () => {
    if (!auth?.business) return toast.error("Unauthorized");

    try {
      const res = await getAdminsByBusiness(auth.business);
      if (res.success) {
        setAdmins(res.data!);
      } else {
        toast.error(res.message || "Something went wrong");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Server error occurred");
    }
  };

  const handleDisable = () => {
    if (selectedAdmin) {
      setAdmins((prev) =>
        prev.map((admin) =>
          admin._id === selectedAdmin._id
            ? { ...admin, isActive: false }
            : admin
        )
      );
    }
    setShowDisableModal(false);
  };

  const handleDelete = async () => {
    if (!selectedAdmin) return;
    try {
      await deleteAdmin(selectedAdmin._id!);
      fetchAdmins();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Error deleting admin");
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admins</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        >
          <FaPlus /> Add Admin
        </button>
      </div>

      <div className="bg-white shadow p-6 rounded-lg overflow-x-auto">
        <table className="min-w-[600px] text-sm w-full">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="border-t">
                <td className="p-4">
                  {admin.firstName} {admin.lastName}
                </td>
                <td className="p-4">{admin.email}</td>
                <td className="p-4">{admin.phone}</td>
                <td className="p-4">{admin.role}</td>
                <td className="p-4">
                  {admin.isActive ? "Active" : "Disabled"}
                </td>
                <td className="p-4 text-right space-x-2">
                  {admin.isActive && (
                    <button
                      onClick={() => {
                        setSelectedAdmin(admin);
                        setShowDisableModal(true);
                      }}
                      className="text-yellow-600 hover:underline text-xs"
                    >
                      <FaUserSlash className="inline mr-1" /> Disable
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedAdmin(admin);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-600 hover:underline text-xs"
                  >
                    <FaTrash className="inline mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {admins.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <Modal title="Add New Admin" onClose={() => setShowAddModal(false)}>
          <AddAdminForm
            onSuccess={() => {
              setShowAddModal(false);
              fetchAdmins();
            }}
          />
        </Modal>
      )}

      {/* Disable Admin Modal */}
      {showDisableModal && selectedAdmin && (
        <Modal title="Disable Admin" onClose={() => setShowDisableModal(false)}>
          <p className="text-sm text-gray-700 mb-4">
            Are you sure you want to disable{" "}
            <strong>
              {selectedAdmin.firstName} {selectedAdmin.lastName}
            </strong>
            ?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowDisableModal(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDisable}
              className="bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Disable
            </button>
          </div>
        </Modal>
      )}

      {/* Delete Admin Modal */}
      {showDeleteModal && selectedAdmin && (
        <Modal title="Delete Admin" onClose={() => setShowDeleteModal(false)}>
          <p className="text-sm text-gray-700 mb-4">
            Are you sure you want to permanently delete{" "}
            <strong>
              {selectedAdmin.firstName} {selectedAdmin.lastName}
            </strong>
            ?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        {children}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
      </motion.div>
    </motion.div>
  );
}
