import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export default mongoose.model("JournalEntry", journalSchema);
