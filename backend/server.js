import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";
import path from "path"
dotenv.config();

const app=express();
const PORT = process.env.PORT || 5003;
const __dirname = path.resolve();
const stripe = Stripe("sk_test_51QIvGEKKDaEXrAi5WZNgdQdTHEjZlGjHEeXarEEed8Q6pFVJJvh8TD4eOlfkb2eoXOJ8bi73514W5wHNh36QyhZx00itUxWnl3");
if (process.env.NODE_ENV !== "production") {
	app.use(
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		})
	);
}

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth" , authRoutes)
app.use("/api/v1/users" , userRoutes)
app.use('/api/v1/posts', postRoutes);

app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/connections', connectionRoutes);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
app.post("/create-payment-intent", async (req, res) => {
	try {
	  const { amount } = req.body; // amount should be in cents (e.g., $10.00 is 1000 cents)
	  const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency: "usd",
		payment_method_types: ["card"],
	  });
	  res.send({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
	  res.status(400).send({ error: error.message });
	}
  });
  

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
    connectDB();
})