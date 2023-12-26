import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "./handler/product";
import { CheckMiddleware } from "./modules/middlewares";
import {
  createUpdate,
  deleteUpdate,
  getAllUpdates,
  getSingleUpdate,
  updateUpdates,
} from "./handler/update";

const router = Router();

router.get("/products", getAllProducts);
router.post(
  "/products",
  body("name").isString(),
  CheckMiddleware,
  createProduct
);
router.put(
  "/products/:id",
  body("name").isString(),
  CheckMiddleware,
  updateProduct
);
router.get("/products/:id", getSingleProduct);
router.delete("/products/:id", deleteProduct);

router.get("/updates", getAllUpdates);
router.post(
  "/updates",
  [
    body("name")
      .isString()
      .isLength({ max: 100 })
      .withMessage("Name Must Be String"),
    body("title").isString(),
    body("assets").exists(),
    body("productId").exists(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  ],
  CheckMiddleware,
  createUpdate
);
router.put(
  "/updates/:id",
  [
    body("body").optional(),
    body("title").optional(),
    body("assets").optional(),
    body("status").optional(),
  ],
  CheckMiddleware,
  updateUpdates
);
router.get("/updates/:id", getSingleUpdate);
router.delete("/updates/:id", deleteUpdate);

router.get("/updatepoints", function (req, res) {
  res.status(200).json({ message: "Hello" });
});
router.post("/updatepoints", function (req, res) {
  res.status(201).json({ message: "Hello" + req.shhh_secret });
});
router.put("/updatepoints/:id", function (req, res) {
  res.status(200).json({ message: "Hello" });
});
router.get("/updatepoints/:id", function (req, res) {
  res.status(200).json({ message: "Hello" });
});
router.delete("/updatepoints/:id", function (req, res) {
  res.status(204).json({ message: "Hello" });
});

export default router;
