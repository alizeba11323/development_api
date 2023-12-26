import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createUser = async (req, res, next) => {
  const { name, username, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        username,
        password: await hashPassword(password),
      },
    });
    const token = await createJWT({ id: user.id, username: user.username });
    return res
      .status(201)
      .json({ message: "user Reguistered successfully", token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const LoginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "user Not Found" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password Not Matched" });
    }
    const token = await createJWT({ id: user.id, username: user.username });
    return res
      .status(200)
      .json({ message: "user Logged In successfully", token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
