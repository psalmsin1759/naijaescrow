"use client";
import React, { useState } from "react";
import { debitWallet } from "@/utils/api/Wallet";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import {  usePayoutContext } from "@/context/PayoutContext";

interface Props {
  businessId: string | undefined;
  closeModal: () => void;
  refresh: () => void;
}

export default function WithdrawForm({ businessId, closeModal, refresh }: Props) {

  const {payouts} = usePayoutContext();

  const [selectedPayout, setSelectedPayout] = useState<string>("")
  
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!businessId) {
      toast.error("Business ID is missing");
      return;
    }

    if (!amount || !selectedPayout) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    const payload = {
      userId: businessId,
      amount: parseFloat(amount),
      reference: `WD-${Date.now()}`,
      narration: narration || `Withdrawal to ${selectedPayout} `,
      source: "withdrawal",
      type: "business",
    };

    
    const response = await debitWallet(payload);
    setLoading(false);

    if (response.success) {
      toast.success("Withdrawal submitted successfully");
      setAmount("");
      setNarration("");
      closeModal()
      refresh()
    } else {
      toast.error(response.message || "Withdrawal failed");
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleWithdrawal}>
        <input
          type="number"
          placeholder="Amount to Withdraw"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <select
          value={selectedPayout}
          onChange={(e) => setSelectedPayout(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
           <option value="">Select Payout Account</option> 
          {payouts.map((payout, index) => (
            <option key={index} value={payout.accountNumber}>
              {payout.accountNumber} -  {payout.bank}
            </option>
          ))}
        </select>

       

        <button
          type="submit"
          disabled={loading}
          className="bg-primary w-full text-white px-4 py-2 rounded-md hover:bg-primary-dark transition flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> Processing...
            </>
          ) : (
            "Submit Withdrawal"
          )}
        </button>
      </form>
    </div>
  );
}
