'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaDownload } from 'react-icons/fa';
import { format } from 'date-fns';

interface Transaction {
  id: string;
  date: string;
  type: 'Credit' | 'Debit';
  amount: number;
  description: string;
}

export default function TransactionPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'date' | 'amount'>('date');
  const [sortAsc, setSortAsc] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const transactions: Transaction[] = [
    { id: 'T1', date: '2024-06-01', type: 'Credit', amount: 200000, description: 'Payment from John' },
    { id: 'T2', date: '2024-06-05', type: 'Debit', amount: 50000, description: 'Withdrawal to UBA' },
    { id: 'T3', date: '2024-06-10', type: 'Credit', amount: 150000, description: 'Payment from Zainab' },
    { id: 'T4', date: '2024-06-12', type: 'Debit', amount: 20000, description: 'Transfer to supplier' },
  ];

  // Filter + sort
  const filtered = transactions
    .filter(tx =>
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!fromDate || new Date(tx.date) >= new Date(fromDate)) &&
      (!toDate || new Date(tx.date) <= new Date(toDate))
    )
    .sort((a, b) => {
      if (sortField === 'amount') {
        return sortAsc ? a.amount - b.amount : b.amount - a.amount;
      } else {
        return sortAsc
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const handleExport = () => {
    const exportData = filtered.map(tx => ({
      Date: tx.date,
      Type: tx.type,
      Amount: tx.amount,
      Description: tx.description,
    }));
    const csv = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(row => Object.values(row).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions_${format(new Date(), 'yyyyMMdd')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search description..."
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <input
            type="date"
            className="p-2 border rounded-md"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="p-2 border rounded-md"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <button
          onClick={handleExport}
          className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary-dark"
        >
          <FaDownload />
          Export PDF
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow p-6 rounded-md overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => {
                  setSortField('date');
                  setSortAsc(prev => sortField === 'date' ? !prev : true);
                }}
              >
                Date {sortField === 'date' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th className="px-4 py-3">Type</th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => {
                  setSortField('amount');
                  setSortAsc(prev => sortField === 'amount' ? !prev : true);
                }}
              >
                Amount {sortField === 'amount' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{tx.date}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${tx.type === 'Credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {tx.type}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold">₦{tx.amount.toLocaleString()}</td>
                <td className="px-4 py-3">{tx.description}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
