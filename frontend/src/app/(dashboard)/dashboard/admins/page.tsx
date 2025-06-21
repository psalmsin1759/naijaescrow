'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserSlash, FaTrash, FaPlus } from 'react-icons/fa';

interface Admin {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'disabled';
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: '1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '08012345678',
      status: 'active',
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '08098765432',
      status: 'disabled',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  const handleDisable = () => {
    if (selectedAdmin) {
      setAdmins((prev) =>
        prev.map((admin) =>
          admin.id === selectedAdmin.id ? { ...admin, status: 'disabled' } : admin
        )
      );
    }
    setShowDisableModal(false);
  };

  const handleDelete = () => {
    if (selectedAdmin) {
      setAdmins((prev) => prev.filter((admin) => admin.id !== selectedAdmin.id));
    }
    setShowDeleteModal(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddAdmin = (e: any) => {
    e.preventDefault();
    const newAdmin: Admin = {
      id: (admins.length + 1).toString(),
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      status: 'active',
    };
    setAdmins((prev) => [...prev, newAdmin]);
    setShowAddModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admins</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        >
          <FaPlus />
          Add Admin
        </button>
      </div>

      <div className="bg-white shadow p-6 rounded-lg overflow-x-auto">
        <table className="min-w-[600px] text-sm w-full">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-t">
                <td className="p-4">{admin.name}</td>
                <td className="p-4">{admin.email}</td>
                <td className="p-4">{admin.phone}</td>
                <td className="p-4 capitalize">{admin.status}</td>
                <td className="p-4 text-right space-x-2">
                  {admin.status === 'active' && (
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

      {/* Add Admin Modal */}
      {showAddModal && (
        <Modal title="Add New Admin" onClose={() => setShowAddModal(false)}>
          <form className="space-y-4" onSubmit={handleAddAdmin}>
            <input
              name="name"
              required
              placeholder="Full Name"
              className="w-full p-2 border rounded"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            <input
              name="phone"
              required
              placeholder="Phone"
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
              Add Admin
            </button>
          </form>
        </Modal>
      )}

      {/* Disable Admin Modal */}
      {showDisableModal && selectedAdmin && (
        <Modal title="Disable Admin" onClose={() => setShowDisableModal(false)}>
          <p className="text-sm text-gray-700 mb-4">
            Are you sure you want to disable <strong>{selectedAdmin.name}</strong>?
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
            Are you sure you want to permanently delete <strong>{selectedAdmin.name}</strong>?
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

/** Reusable Modal Component */
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
