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
