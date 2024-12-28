import moment from "moment";
import { Discounts } from "../models/discount.model.js";
import { Orders } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AmountOffOrderCode } from "../models/amountOffOrderCode.js";
import { AmountOffOrderAuto } from "../models/amountOffOrderAuto.js";
import { Products } from "../models/product.model.js";
import mongoose from "mongoose";
import { BuyXGetYCode } from "../models/buyXGetYCode.js";
import { Collections } from "../models/collection.model.js";

const createOrder = asyncHandler(async (req, res) => {
  const customerId = req.customer._id;
  if (!customerId) {
    throw new ApiError(400, "Please login!!!");
  }

  const {
    date,
    channel,
    deliveryMethod,
    amount,
    address,
    progress,
    notes,
    isDraft,
    isAbandoned,
    discountedAmount,
    isCompleted,
    isPaid,
    isFullfilled,
    isDelivered,
    products,
  } = req.body;

  if (
    !amount ||
    !date ||
    !deliveryMethod ||
    !address ||
    !(isPaid === true || isPaid === false) ||
    !products
  ) {
    throw new ApiError(400, "Fill all the required fields!!!");
  }

  const order = await Orders.create({
    ...req.body,
    customerId,
  });
  if (!order) {
    throw new ApiError(500, "Something went wrong while creating the order!!!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Order created successfully!!!", order));
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Orders.find();
  if (!orders) {
    throw new ApiError(
      500,
      "SOmething went wrong while fetching the orders!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Orders fetched!!!", orders));
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Orders.find({ customerId: req.customer._id });
  if (orders.length === 0) {
    throw new ApiError(400, "No orders found!!!");
  }

  res.status(200).json(new ApiResponse(200, "Orders fetched!!!", orders));
});

const updateProgress = asyncHandler(async (req, res) => {
  const order = await Orders.findOne({ _id: req.customer._id });
  if (!order) {
    throw new ApiError(400, "Order not found!!!");
  }

  const { progress } = req.body;
  if (!progress) {
    throw new ApiError(400, "Progress is empty!!!");
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    req.customer._id,
    { $set: { progress } },
    { new: true }
  );

  if (!updatedOrder) {
    throw new ApiError(500, "Something went wrong while updating the progress");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Progress updated successfully!!!", updatedOrder)
    );
});

const updatePayment = asyncHandler(async (req, res) => {
  const order = await Orders.findOne({ _id: req.params.id });
  if (!order) {
    throw new ApiError(400, "Order not found!!!");
  }

  const { isPaid } = req.body;
  if (!isPaid) {
    throw new ApiError(400, "All fields are empty!!!");
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    req.params.id,
    { $set: { isPaid } },
    { new: true }
  );

  if (!updatedOrder) {
    throw new ApiError(500, "Something went wrong while updating the order");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "order updated successfully!!!", updatedOrder));
});

const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const order = await Orders.findOne({ _id: req.params.id });
  if (!order) {
    throw new ApiError(400, "Order not found!!!");
  }

  const { isDelivered } = req.body;
  if (!isDelivered) {
    throw new ApiError(400, "All fields empty!!!");
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    req.params.id,
    { $set: { isDelivered } },
    { new: true }
  );

  if (!updatedOrder) {
    throw new ApiError(500, "Something went wrong while updating the order");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Order updated successfully!!!", updatedOrder));
});

const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findOne({ _id: req.params.id });
  if (!order) {
    throw new ApiError(400, "Order not found!!!");
  }

  const { isCancelled } = req.body;
  if (!isCancelled) {
    throw new ApiError(400, "All fields are empty!!!");
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    req.params.id,
    { $set: { isCancelled } },
    { new: true }
  );

  if (!updatedOrder) {
    throw new ApiError(500, "Something went wrong while updating the order");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Progress updated successfully!!!", updatedOrder)
    );
});

const abandonOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findOne({ _id: req.params.id });
  if (!order) {
    throw new ApiError(400, "Order not found!!!");
  }

  const { isAbandoned } = req.body;
  if (!isAbandoned) {
    throw new ApiError(400, "All fields are empty!!!");
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    req.params.id,
    { $set: { isAbandoned } },
    { new: true }
  );

  if (!updatedOrder) {
    throw new ApiError(500, "Something went wrong while updating the order");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Order updated successfully!!!", updatedOrder));
});

const completeOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findOne({ _id: req.params.id });
  if (!order) {
    throw new ApiError(400, "Order not found!!!");
  }

  const { isCompleted } = req.body;
  if (!isCompleted) {
    throw new ApiError(400, "All fields are empty!!!");
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    req.params.id,
    { $set: { isCompleted } },
    { new: true }
  );

  if (!updatedOrder) {
    throw new ApiError(500, "Something went wrong while updating the order");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Orders updated successfully!!!", updatedOrder));
});

const fulfillOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findOne({ _id: req.params.id });
  if (!order) {
    throw new ApiError(400, "Order not found!!!");
  }

  const { isFullfilled } = req.body;
  if (!isFullfilled) {
    throw new ApiError(400, "All fields are empty!!!");
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    req.params.id,
    { $set: { isFullfilled } },
    { new: true }
  );

  if (!updatedOrder) {
    throw new ApiError(500, "Something went wrong while updating the order");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Order updated successfully!!!", updatedOrder));
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findOne({ _id: req.params.id });
  if (!order) {
    throw new ApiError(400, "No order found!!!");
  }

  const deleteOrder = await Orders.findByIdAndDelete(req.params.id);
  if (!deleteOrder) {
    throw new ApiError(500, "Something went wrong while deleting the Order!!!");
  }

  res.status(200).json(new ApiResponse(200, "Order deleted successfully!!!"));
});

const addDiscount = asyncHandler(async (req, res) => {
  const { discountId, orderId } = req.body;
  if (!discountId || !orderId) {
    throw new ApiError(400, "Discount id or order id is missing!!!");
  }

  const discount = await Discounts.findOne({ _id: discountId });
  if (!discount) {
    throw new ApiError(400, "No discount found!!!");
  }

  const order = await Orders.findOne({ _id: orderId });
  if (!order) {
    throw new ApiError(400, "No order found!!!");
  }

  let amount = order.amount;
  let discountedAmount = 0;
  const now = moment().format("YYYY-MM-DD");

  if (discount.method.toLowerCase() === "code") {
    const orderDiscount = await AmountOffOrderCode.findOne({
      _id: discount.typeId,
    });
    if (!orderDiscount) {
      throw new ApiError(
        500,
        "Something went wrong while fetching the order discount!!!"
      );
    }

    const start = moment(orderDiscount.startTime).format("YYYY-MM-DD");
    const end = moment(orderDiscount.endTime).format("YYYY-MM-DD");

    if (now < end && now > start) {
      if (orderDiscount.uses > 0) {
        if (orderDiscount.discountValueType.toLowerCase() === "percent") {
          discountedAmount =
            amount - amount * 0.01 * orderDiscount.discountValue;
        } else if (orderDiscount.discountValueType.toLowerCase() === "amount") {
          discountedAmount = amount - orderDiscount.discountValue;
        }
      } else {
        throw new ApiError(400, "You have no discounts left!!!");
      }
    } else {
      throw new ApiError(400, "Discount not available right now!!!");
    }
  } else {
    const orderDiscount = await AmountOffOrderAuto.findOne({ _id: typeId });
    if (!orderDiscount) {
      throw new ApiError(
        500,
        "Something went wrong while fetching teh product discount!!!"
      );
    }

    const start = moment(orderDiscount.startTime).format("YYYY-MM-DD");
    const end = moment(orderDiscount.endTime).format("YYYY-MM-DD");

    if (now < end && now > start) {
      if (orderDiscount.discountValueType.toLowerCase() === "percent") {
        discountedAmount = amount - amount * 0.01 * orderDiscount.discountValue;
      } else if (orderDiscount.discountValueType.toLowerCase() === "amount") {
        discountedAmount = amount - orderDiscount.discountValue;
      }
    } else {
      throw new ApiError(400, "You have no discounts left!!!");
    }
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    orderId,
    { $set: { discountedAmount } },
    { new: true }
  );

  res.status(200).json(new ApiResponse(200, "Discount added!!!", updatedOrder));
});

const removeDiscount = asyncHandler(async (req, res) => {
  const orderId = req.params.id;

  if (!orderId) {
    throw new ApiError(400, "Order id is required!!!");
  }

  const order = await Orders.findOne({ _id: orderId });
  if (!order) {
    throw new ApiError(400, "Order not found!!!");
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    orderId,
    { $set: { discountedAmount: null } },
    { new: true }
  );

  if (!updatedOrder) {
    throw new ApiError(500, "Something went wrong while updating the order!!!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Order removed successfully!!!", updatedOrder));
});

const addBuyXGetY = asyncHandler(async (req, res) => {
  const { orderId, discountId } = req.body;

  if (!orderId || !discountId) {
    throw new ApiError(400, "All fields are empty!!!");
  }

  const order = await Orders.findOne({ _id: orderId });
  if (!order) {
    throw new ApiError(400, "No product found!!!");
  }

  const discount = await Discounts.findOne({ _id: discountId });
  if (!discount) {
    throw new ApiError(400, "No discount found!!!");
  }

  const typeId = new mongoose.Types.ObjectId(discount.typeId);

  let amount = order.amount;
  let discountedAmount = 0;
  const now = moment().format("YYYY-MM-DD");

  if (discount.method.toLowerCase() === "code") {
    const buyDiscount = await BuyXGetYCode.findOne({ _id: typeId });
    if (!buyDiscount) {
      throw new ApiError(400, "Discount not found!!!");
    }

    const start = moment(buyDiscount.startTime).format("YYYY-MM-DD");
    const end = moment(buyDiscount.endTime).format("YYYY-MM-DD");

    if (now < end && now > start) {
      if (buyDiscount.usesPerOrder > 0) {
        if (buyDiscount.customerBuys.toLowerCase() === "quantity") {
          const collection = await Collections.findOne({
            _id: buyDiscount.appliedTo,
          });
          if (!collection) {
            throw new ApiError(400, "No collections found!!!");
          }
        } else if (buyDiscount.customerBuys.toLowerCase() === "quantity") {
        }
      }
    } else {
      throw new ApiError(400, "Discount not available right now!!!");
    }
  } else {
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Discount applied successfully!!!"));
});

export {
  createOrder,
  getAllOrders,
  getOrders,
  updateProgress,
  updatePayment,
  updateDeliveryStatus,
  cancelOrder,
  abandonOrder,
  completeOrder,
  fulfillOrder,
  deleteOrder,
  addDiscount,
  removeDiscount,
  addBuyXGetY,
};
