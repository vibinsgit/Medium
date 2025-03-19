// Password Hashing using Crypto web API:

export const hashPassword = async (pass: string): Promise<string> => {
  const encoder = new TextEncoder();
  const password = encoder.encode(pass);

  const hashBuffer = await crypto.subtle.digest("SHA-256", password);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashedPassword;
};
