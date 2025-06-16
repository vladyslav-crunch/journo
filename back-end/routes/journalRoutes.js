import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
  getEntry,
} from "../controllers/journalController.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getEntries);
router.get("/:id", getEntry);
router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;
