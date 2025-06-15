export interface JournalEntry {
  _id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface JournalEntryUpdate {
  title?: string;
  content?: string;
  createdAt?: Date;
}

export interface JournalEntryCreate {
  title: string;
  content: string;
}
