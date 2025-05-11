import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;
const DBCONNECT = "mongodb://localhost:27017";
let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(DBCONNECT);
    await client.connect();
    db = client.db("colleges");
    console.log("  Database Connected Successfully");
  } catch (error) {
    console.error(" Database Connec on Error:", error);
    process.exit(1);
  }
};

app.get("/getstudent", async (req, res) => {
  const students = await db.collection("student_table").find({}).toArray();
  res.json(students);
});

app.post("/addstudent", async (req, res) => {
  try {
    const { name, email, rollNo, mobile, degree, year } = req.body;
    if (!name || !email || !rollNo || !mobile || !degree || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const result = await db.collection("student_table").insertOne(req.body);
    res.status(201).json({ _id: result.insertedId, ...req.body });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/updatestudent/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = { ...req.body };
    delete updatedStudent._id;

    const result = await db
      .collection("student_table")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedStudent });

    res.json({
      message: "Student updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/deletestudent/:id", async (req, res) => {
  await db
    .collection("student_table")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ message: "Student deleted successfully" });
});

connectDB().then(() =>
  app.listen(PORT, () => console.log(`        Server running on port ${PORT}`))
);
