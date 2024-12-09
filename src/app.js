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
import amountOffProductCodeRouter from "./routes/amountOffProductCode.js";
import amountOffProductAutoRouter from "./routes/amountOffProductAuto.js";
import amountOffOrderAutoRouter from "./routes/amountOffOrderAuto.js";
import amountOffOrderCodeRouter from "./routes/amountOffOrderCode.js";
import buyXGetYAutoRouter from "./routes/buyXGetYAuto.js";
import buyXGetYCodeRouter from "./routes/buyXGetYCode.js";
import freeShippingCodeRouter from "./routes/freeShippingCode.js";
import freeShippingAutoRouter from "./routes/freeShippingAuto.js";
import discountRouter from "./routes/discount.route.js";
import rateRouter from "./routes/rate.router.js";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/collection", collectionRouter);
app.use("/api/v1/varient", varientRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/amountOffProductCode", amountOffProductCodeRouter);
app.use("/api/v1/amountOffProductAuto", amountOffProductAutoRouter);
app.use("/api/v1/amountOffOrderCode", amountOffOrderCodeRouter);
app.use("/api/v1/amountOffOrderAuto", amountOffOrderAutoRouter);
app.use("/api/v1/buyXGetYAuto", buyXGetYAutoRouter);
app.use("/api/v1/buyXGetYCode", buyXGetYCodeRouter);
app.use("/api/v1/freeShippingCode", freeShippingCodeRouter);
app.use("/api/v1/freeShippingAuto", freeShippingAutoRouter);
app.use("/api/v1/discount", discountRouter);
app.use("/api/v1/rate", rateRouter);

export default app;
