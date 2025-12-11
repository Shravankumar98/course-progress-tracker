import express from "express";
import courseRoutes from "./routes/courseRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
