import { openDB } from "idb";

const DB_NAME = "SparkEFieldToolDB";
const DB_VERSION = 1;

export const getDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("journalDrafts")) {
        db.createObjectStore("journalDrafts", { keyPath: "date" });
      }
      if (!db.objectStoreNames.contains("submissionQueue")) {
        db.createObjectStore("submissionQueue", { autoIncrement: true });
      }
    },
  });
};

export const saveJournalDraft = async (date: string, data: any) => {
  const db = await getDB();
  await db.put("journalDrafts", { date, ...data });
};

export const loadJournalDraft = async (date: string) => {
  const db = await getDB();
  return db.get("journalDrafts", date);
};

export const queueSubmission = async (data: any) => {
  const db = await getDB();
  await db.add("submissionQueue", data);
};

export const getQueuedSubmissions = async () => {
  const db = await getDB();
  const all = await db.getAll("submissionQueue");
  const keys = await db.getAllKeys("submissionQueue");
  keys.forEach((key) => db.delete("submissionQueue", key));
  return all;
};
