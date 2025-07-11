import { IBusiness } from "../models/business.model";
import { UpdateQuery } from "mongoose";
import { BusinessRepository } from "../repositories/BusinessRepository";
import crypto from "crypto";
import { businessVerificationEmail } from "../utils/emailBody";
import { sendEmail } from "../events/sendEmail";

const businessRepo = new BusinessRepository();

export const createBusiness = async (data: Partial<IBusiness>) => {
  const businessEmail = await businessRepo.findByEmail(data.email!);
  if (businessEmail) {
    const error = new Error("There is a business with this email");
    (error as any).status = 404;
    throw error;
  }

  const verificationCode = generateVerificationCode();

  const newBusiness = await businessRepo.create({
    ...data,
    isVerified: false,
    verificationCode,
    verificationCodeExpires: new Date(Date.now() + 60 * 60 * 1000),
  });

  const subject = "Verify Your Business Email - NaijaEscrow";
  const html = businessVerificationEmail(newBusiness.name, verificationCode);

  await sendEmail(newBusiness.email, subject, html);

  return businessRepo.create(newBusiness);
};

export const verifyBusiness = async (email: string, code: string) => {
  const business = await businessRepo.findByEmail(email);
  if (!business) throw new Error("Business not found");

  if (
    !business.verificationCodeExpires ||
    business.verificationCode !== code ||
    new Date() > new Date(business.verificationCodeExpires)
  ) {
    throw new Error("Invalid or expired verification code");
  }

  business.isVerified = true;
  business.verificationCode = undefined;
  business.verificationCodeExpires = undefined;

  await business.save();

  return {
    success: true,
    message: "Business email verified successfully.",
  };
};

export const allBusinesses = async () => {
  return await businessRepo.all();
};

export const findBusinessById = async (id: string) => {
  return await businessRepo.findById(id);
};

export const updateBusinessInfo = async (
  id: string,
  data: UpdateQuery<IBusiness>
) => {
  return await businessRepo.update(id, data);
};

export const deleteBusinessById = async (id: string) => {
  return await businessRepo.delete(id);
};

const generateVerificationCode = () => {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
};
