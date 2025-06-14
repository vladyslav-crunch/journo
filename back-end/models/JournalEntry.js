import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("JournalEntry", journalSchema);
