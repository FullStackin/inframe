import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { register } from "./controllers/auth.js";

// CONFIGURATION:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // set the directory where we keep the images.(locally)
// in real life production we store in a cloud storage like S3.

// FILE STORAGE: - this will save your file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets"); // into this particular folder.
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// ROUTES + FILES
app.post("/auth/register", upload.single("picture"), register); // Middleware

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// MONGOOSE SETUP:
const PORT = process.env.PORT || 6001; // back up port incase original doesn't work.
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect, Sorry.`)); // in case we run into any errors
