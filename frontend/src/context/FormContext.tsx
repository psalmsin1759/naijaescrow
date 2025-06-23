'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export interface FormData {
  businessName?: string;
  businessEmail?: string;
  businessPhone?: string;
  website?: string;
  description?: string;
  address?: string;
  adminFirstName?: string;
  adminLastName?: string;
  adminEmail?: string;
  adminPhone?: string;
  password?: string;
  confirmPassword?: string;
  verificationCode?: string;
}


interface FormContextType {
  data: FormData;
  setData: (data: Partial<FormData>) => void;
}

const FormContext = createContext<FormContextType | null>(null);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setFormData] = useState<FormData>({});

  const setData = (newData: Partial<FormData>) =>
    setFormData((prev) => ({ ...prev, ...newData }));

  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('useForm must be used within FormProvider');
  return context;
};
