import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config();
import path from "path";
import userRoute from "./routes/userRoute.js";
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "../Frontend/dist"))); 


//API
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
	connectDB();
	console.log(`Server running at port: ${PORT}`);
});
