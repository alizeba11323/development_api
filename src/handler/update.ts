import prisma from "../db";
export const getAllUpdates = async (req, res) => {
  try {
    const productWithUpdates = await prisma.product.findMany({
      where: {
        user_id: req.user.id,
      },
      include: {
        updates: true,
      },
    });
    const updates = productWithUpdates.reduce((finalResult, item) => {
      return [...finalResult, item.updates];
    }, []);
    return res.status(200).json({ updates });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getSingleUpdate = async (req, res) => {
  try {
    const singleUpdate = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ update: singleUpdate });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const createUpdate = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.body.product_id },
    });
    if (!product) return res.status(400).json({ message: "product Not Found" });
    const updateCreated = await prisma.update.create({
      data: {
        body: req.body.body,
        title: req.body.title,
        assets: req.body.assets,
        status: req.body.status,
        product_id: req.body.product_id,
      },
    });

    return res.status(200).json({ update: updateCreated });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const updateUpdates = async (req, res, next) => {
  try {
    const productWithUpdates = await prisma.product.findMany({
      where: { user_id: req.user.id },
      include: {
        updates: true,
      },
    });
    const updates = productWithUpdates.reduce((finalResult, item) => {
      return [...finalResult, item.updates];
    }, []);
    const isMatched = updates.find((update) => update.id === req.params.id);
    if (!isMatched) {
      return res.status(400).json({ message: "Update Not Found" });
    }
    const updateUpdate = await prisma.update.update({
      where: { id: req.params.id },
      data: req.body,
    });
    return res.status(200).json({ update: updateUpdate });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteUpdate = async (req, res) => {
  try {
    const productWithUpdates = await prisma.product.findMany({
      where: { user_id: req.user.id },
      include: {
        updates: true,
      },
    });
    const updates = productWithUpdates.reduce((finalResult, item) => {
      return [...finalResult, item.updates];
    }, []);
    const isMatched = updates.find((update) => update.id === req.params.id);
    if (!isMatched) {
      return res.status(400).json({ message: "Update Not Found" });
    }
    await prisma.product.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ message: "Update Deleted Successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
