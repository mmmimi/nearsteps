const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    title: {
      type: String,
      required: "The title is required",
    },
    description: {
      type: String,
      maxlength: 10000,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: "The customer is required",
      red: "Customer",
    },
    price: {
      type: Number,
      required: "The price is required",
      trim: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },

    //think of uploading to cloudinary in production
    image: {
      data: Buffer,
      contentType: String,
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
