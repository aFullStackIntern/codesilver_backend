import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = e();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(e.json({ limit: "16kb" }));
app.use(e.urlencoded({ extended: true, limit: "16kb" }));
app.use(e.static("public"));
app.use(cookieParser());

// routes declaration
import adminRouter from "./routes/admin.route.js";
import customerRouter from "./routes/customer.route.js";
import collectionRouter from "./routes/collection.route.js";
import varientRouter from "./routes/varient.route.js";
import blogRouter from "./routes/blog.route.js";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/collection", collectionRouter);
app.use("/api/v1/varient", varientRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/amount", blogRouter);
app.use("/api/v1/blog", blogRouter);

export default app;
