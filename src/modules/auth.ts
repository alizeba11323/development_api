import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
export const createJWT = async (user) => {
  const token = await JWT.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const Protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({ message: "UnAuthorized" });
  }
  const [, token] = bearer.split(" ");
  if (!token) {
    return res.status(401).json({ message: "UnAuthorized" });
  }
  try {
    const usr = JWT.verify(token, process.env.JWT_SECRET);
    if (!usr) {
      return res.status(401).json({ message: "UnAuthorized" });
    }
    req.user = usr;
    next();
  } catch (err) {
    return res.status(401).json({ message: "UnAuthorized" });
  }
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};
export const comparePassword = async (password, passwordCheck) => {
  return await bcrypt.compare(password, passwordCheck);
};
