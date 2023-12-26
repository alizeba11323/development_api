import prisma from "../db";

export const getAllProducts = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        products: true,
      },
    });
    return res.status(200).json({ products: user.products });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const getSingleProduct = async (req, res) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const createProduct = async (req, res) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        user_id: req.user.id,
      },
    });
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id, user_id: req.user.id },
      data: {
        name: req.body.name,
      },
    });
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id, user_id: req.user.id },
    });
    return res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
