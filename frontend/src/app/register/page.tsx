"use client"
import AddAdmin from '@/components/register/AddAdmin';
import BusinessDetails from '@/components/register/BusinessDetails';
import VerifyEmail from '@/components/register/VerifyEmail';
import Review from '@/components/register/Review';
import SidebarStepper from '@/components/register/SidebarStepper';
import React, {useState} from 'react'

export default function Register() {
    const [step, setStep] = useState(1);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const handleFinalSubmit = () => {
 
  console.log('Submitting data...');
  //console.log(data); // or use fetch/axios
  setStep(5);
};
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2  p-4">
     
     <div className=''>
        <SidebarStepper  step={step} />
     </div>
     

      <div className="md:col-span-3 flex-1">
        {step === 1 && <BusinessDetails onNext={next} />}
        {step === 2 && <AddAdmin onNext={next} onBack={prev} />}
        {step === 3 && <VerifyEmail onNext={next} onBack={prev} />}
        {step === 4 && <Review onBack={next} onSubmit={handleFinalSubmit} />}
        
      </div>
    </div>
  )
}
