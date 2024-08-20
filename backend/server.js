import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"
import connectMongoDB from "./db/connectMongoDB.js";
import { v2 as cloudinary } from "cloudinary";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: 'GET,POST,PUT,DELETE',  // Specify allowed HTTP methods
    credentials: true                // Allow credentials (if needed)
}));
const PORT = process.env.PORT || 5000;
// / Add this middleware to parse JSON bodies
app.use(express.json({ limit: "5mb" })); //to parse req.body
// limit shouldn't be too high to prevent DOS
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);



app.get('/', (req, res) => {
    res.send("Server is ready")
});

app.listen(PORT, () => {
    connectMongoDB()
    console.log("Server is running on port 8000")
})