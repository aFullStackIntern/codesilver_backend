import { Orders } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createOrder = asyncHandler(async (req, res) => {
  const {
    date,
    customerId,
    channel,
    deliveryMethod,
    amount,
    address,
    progress,
    notes,
    isDraft,
    isAbandoned,
    isCompleted,
    isPaid,
    isFullfilled,
    isDelivered,
    products,
  } = req.body;

  if (
    !date ||
    !customerId ||
    !deliveryMethod ||
    !amount ||
    !address ||
    !isPaid ||
    !products
  ) {
    throw new ApiError(400, "Fill all the required fields!!!");
  }

  const order = await Orders.create(req.body);
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
    throw new ApiError(400, "Progress is empty!!!");
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    req.params.id,
    { $set: { isPaid } },
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

const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const order = await Orders.findOne({ _id: req.params.id });
  if (!order) {
    throw new ApiError(400, "Order not found!!!");
  }

  const { isDelivered } = req.body;
  if (!isDelivered) {
    throw new ApiError(400, "Progress is empty!!!");
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    req.params.id,
    { $set: { isDelivered } },
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

const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findOne({ _id: req.params.id });
  if (!order) {
    throw new ApiError(400, "Order not found!!!");
  }

  const { isCancelled } = req.body;
  if (!isCancelled) {
    throw new ApiError(400, "Progress is empty!!!");
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    req.params.id,
    { $set: { isCancelled } },
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

const abandonOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findOne({ _id: req.params.id });
  if (!order) {
    throw new ApiError(400, "Order not found!!!");
  }

  const { isAbandoned } = req.body;
  if (!isAbandoned) {
    throw new ApiError(400, "Progress is empty!!!");
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    req.params.id,
    { $set: { isAbandoned } },
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

const completeOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findOne({ _id: req.params.id });
  if (!order) {
    throw new ApiError(400, "Order not found!!!");
  }

  const { isCompleted } = req.body;
  if (!isCompleted) {
    throw new ApiError(400, "Progress is empty!!!");
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    req.params.id,
    { $set: { isCompleted } },
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

const fulfillOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findOne({ _id: req.params.id });
  if (!order) {
    throw new ApiError(400, "Order not found!!!");
  }

  const { isFullfilled } = req.body;
  if (!isFullfilled) {
    throw new ApiError(400, "Progress is empty!!!");
  }

  const updatedOrder = await Orders.findByIdAndUpdate(
    req.params.id,
    { $set: { isFullfilled } },
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
};
