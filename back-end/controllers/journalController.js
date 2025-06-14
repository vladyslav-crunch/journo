import JournalEntry from "../models/JournalEntry.js";

export const getEntries = async (req, res) => {
  const entries = await JournalEntry.find({ userId: req.userId });
  res.json(entries);
};

export const createEntry = async (req, res) => {
  const { title, content } = req.body;
  const entry = new JournalEntry({ userId: req.userId, title, content });
  await entry.save();
  res.status(201).json(entry);
};

export const updateEntry = async (req, res) => {
  const { id } = req.params;
  const updated = await JournalEntry.findOneAndUpdate(
    { _id: id, userId: req.userId },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
};

export const deleteEntry = async (req, res) => {
  const { id } = req.params;
  await JournalEntry.findOneAndDelete({ _id: id, userId: req.userId });
  res.json({ message: "Deleted" });
};
