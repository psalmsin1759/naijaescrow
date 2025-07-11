export const welcomeText = (name: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Welcome to NaijaEscrow, ${name}!</h2>
      <p>We're excited to have you on board. With NaijaEscrow, you can raise and support innovative ideas and projects.</p>
      <p>Start exploring campaigns or create your own now!</p>
      <p>Cheers,<br>The NaijaEscrow Team</p>
    </div>
  `;
};

export const forgotPasswordText = (name: string, url: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Hi ${name},</h2>
      <p>We received a request to reset your password for your NaijaEscrow account.</p>
      <p>You can reset your password by clicking the link below:</p>
      <p><a href="${url}" target="_blank" style="color: #007bff;">Reset Password</a></p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Thanks,<br>The NaijaEscrow Team</p>
    </div>
  `;
};


export const businessVerificationEmail = (businessName: string, code: string) => `
  <div>
    <h2>Welcome to NaijaEscrow, ${businessName}</h2>
    <p>Thank you for registering your business with us.</p>
    <p>Please verify your email address using the code below:</p>
    <h3 style="color: #2c3e50;">${code}</h3>
    <p>This code will expire in 1 hour.</p>
    <p>If you didn't initiate this, please ignore this email.</p>
  </div>
`;
