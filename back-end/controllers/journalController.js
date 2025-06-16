import JournalEntry from "../models/JournalEntry.js";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
  createdAt: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid creation date.",
    }),
});

const updateSchema = createSchema.partial();

export const getEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.userId });
    res.json(entries);
  } catch (err) {
    console.error("Get entries error:", err);
    res.status(500).json({ message: "Failed to fetch entries." });
  }
};

export const getEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await JournalEntry.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!entry) {
      return res.status(404).json({ message: "Entry not found." });
    }

    res.json(entry);
  } catch (err) {
    console.error("Get entry by ID error:", err);
    res.status(500).json({ message: "Failed to fetch entry." });
  }
};

export const createEntry = async (req, res) => {
  try {
    const parsed = createSchema.parse(req.body);

    const entry = new JournalEntry({
      userId: req.userId,
      title: parsed.title.trim(),
      content: parsed.content.trim(),
      createdAt: parsed.createdAt ? new Date(parsed.createdAt) : undefined,
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ message: err.errors[0].message });
    }
    console.error("Create entry error:", err);
    res.status(500).json({ message: "Failed to create entry." });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const parsed = updateSchema.parse(req.body);

    const entry = await JournalEntry.findOne({ _id: id, userId: req.userId });
    if (!entry) return res.status(404).json({ message: "Entry not found." });

    if (parsed.title !== undefined) entry.title = parsed.title.trim();
    if (parsed.content !== undefined) entry.content = parsed.content.trim();
    if (parsed.createdAt !== undefined)
      entry.createdAt = new Date(parsed.createdAt);

    await entry.save();
    res.json(entry);
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ message: err.errors[0].message });
    }
    console.error("Update entry error:", err);
    res.status(500).json({ message: "Failed to update entry." });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await JournalEntry.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Entry not found." });
    }

    res.json({ message: "Entry deleted." });
  } catch (err) {
    console.error("Delete entry error:", err);
    res.status(500).json({ message: "Failed to delete entry." });
  }
};
