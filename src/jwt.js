import { SignJWT, jwtVerify } from "jose";

const signInoptions = {
  expiresIn: "1h",
};

const refreshOptions = {
  expiresIn: "24h",
};

// TO CREATE A JWT
export const signAccessJWT = async (payload, options) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const alg = "HS256";
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options)
      .setIssuedAt()
      .setSubject(payload)
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

export const signRefreshJWT = async (payload, option) => {
  try {
    const secret = new TextEncoder().encode(process.env.REFRESH_SECRET_KEY);
    const alg = "HS256";
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(option)
      .setIssuedAt()
      .setSubject(payload)
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

// USAGE

// TO VERIFY A JWT

export const verifyAccessJWT = async (token) => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      )
    ).payload;
  } catch (error) {
   
    throw new Error("Your token has expired.");
  }
};

export const verifyRefreshJWT = async (token) => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.REFRESH_SECRET_KEY)
      )
    ).payload;
  } catch (error) {
    
    throw new Error("Your token has expired.");
  }
};

