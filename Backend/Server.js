const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Base URL for MockAPI (تأكد أنه صحيح من MockAPI Dashboard)
const MOCK_API_BASE_URL = "https://6784e7831ec630ca33a640d3.mockapi.io/";

// 🔹 Route لجلب البيانات من MockAPI
app.get("/api/get-message", async (req, res) => {
    try {
        console.log("Fetching data from MockAPI...");
        const response = await axios.get(`${MOCK_API_BASE_URL}/messages`); // تأكد من المسار الصحيح
        console.log("✅ Data received:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("❌ Error fetching data from MockAPI:", error.message);
        res.status(500).json({ error: "Failed to fetch data from MockAPI" });
    }
});

// 🔹 Route للصفحة الرئيسية لتجنب 404 عند فتح localhost:8000
app.get("/", (req, res) => {
    res.send("🚀 Express Server is Running! Use /api/get-message to fetch data.");
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
