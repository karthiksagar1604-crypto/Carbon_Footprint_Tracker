import express from "express";
import cors from "cors";
import admin from "firebase-admin";
//import serviceAccount from "./serviceAccount.json" assert { type: "json" };
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccount.json");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

db.listCollections()
  .then(() => console.log("✅ Firestore Admin SDK connected successfully"))
  .catch((err) => console.error("❌ Firestore Admin SDK connection failed:", err));


// ============================
// 🚀 Store Calculation
// ============================
app.post("/api/calculate", async (req, res) => {
  const { transport, electricity, diet, flights, water, waste, user } = req.body;

  const footprint =
    parseFloat(transport || 0) * 0.21 +
    parseFloat(electricity || 0) * 0.5 +
    parseFloat(diet || 0) * 2.5 +
    parseFloat(flights || 0) * 90 +
    parseFloat(water || 0) * 0.001 +
    parseFloat(waste || 0) * 1.5;

  const record = {
    user,
    transport,
    electricity,
    diet,
    flights,
    water,
    waste,
    footprint,
    date: new Date().toISOString(),
  };

  try {
    await db.collection("footprints").add(record);
    res.json({ footprint });
  } catch (err) {
    console.error("❌ Error saving to Firestore:", err);
    res.status(500).json({ error: "Failed to save footprint" });
  }
});

// ============================
// 🚀 Fetch User History
// ============================
app.get("/api/history", async (req, res) => {
  const { user } = req.query;
  try {
    let query = db.collection("footprints");
    if (user) query = query.where("user", "==", user);

    const snapshot = await query.orderBy("date").get();
    const data = snapshot.docs.map((doc) => doc.data());
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching history:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// ============================
// 🚀 Clear User History
// ============================
app.post("/api/clear-history", async (req, res) => {
  const { user } = req.body;
  console.log("🟢 Clear request received for user:", user);

  if (!user || typeof user !== "string") {
    return res.status(400).json({ error: "User is required" });
  }

  try {
    const snapshot = await db.collection("footprints").where("user", "==", user).get();

    console.log("📄 Docs found:", snapshot.size);

    if (snapshot.empty) {
      return res.json({ message: "No history found for this user" });
    }

    const batch = db.batch();
    snapshot.forEach((doc) => {
      console.log("🗑️ Deleting doc:", doc.id);
      batch.delete(doc.ref);
    });

    await batch.commit();

    res.json({ message: "History cleared successfully" });
  } catch (err) {
    console.error("❌ Error clearing history:", err);
    res.status(500).json({ error: "Failed to clear history", details: err.message });
  }
});


// ============================
// 🚀 Start Server
// ============================
app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000 with Firestore")
);
