"use client";

import React, { useState } from "react";
import AddAdmin from "@/components/register/AddAdmin";
import BusinessDetails from "@/components/register/BusinessDetails";
import Review from "@/components/register/Review";
import SidebarStepper from "@/components/register/SidebarStepper";
import WelcomePage from "@/components/register/WelcomePage";
import { FormProvider, useForm } from "@/context/FormContext";
import { createBusinessWithAdmin } from "@/utils/api/Business";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";


function RegisterSteps({
  step,
  setStep,
  next,
  prev,
}: {
  step: number;
  setStep: (s: number) => void;
  next: () => void;
  prev: () => void;
}) {
  const { data } = useForm();
  const { setAuth } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleFinalSubmit = async () => {
    const payload = {
      businessName: data.businessName!,
      businessEmail: data.businessEmail!,
      businessPhone: data.businessPhone!,
      website: data.website,
      description: data.description,
      address: data.address,
      adminFirstName: data.adminFirstName!,
      adminLastName: data.adminLastName!,
      adminEmail: data.adminEmail!,
      adminPhone: data.adminPhone!,
      password: data.password!,
    };

    setLoading(true);

    try {
      const res = await createBusinessWithAdmin(payload);

      if (res.success) {
       const authData  = {...data}
        setAuth(authData);
        toast.success("Business created successfully");
        setStep(4);
      } else {
        toast.error(res.message || "Something went wrong");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Server error occurred");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-4">
      <div>
        <SidebarStepper step={step} />
      </div>

      <div className="md:col-span-3 flex-1">
        {step === 1 && <BusinessDetails onNext={next} />}
        {step === 2 && <AddAdmin onNext={next} onBack={prev} />}
        {step === 3 && <Review onBack={prev} onSubmit={handleFinalSubmit} loading={loading} />}
        {step === 4 && <WelcomePage />}
      </div>
    </div>
  );
}

export default function Register() {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  return (
    <FormProvider>
      <RegisterSteps step={step} setStep={setStep} next={next} prev={prev} />
    </FormProvider>
  );
}
