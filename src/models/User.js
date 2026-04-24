const mongoose = require("mongoose");

/*
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);
*/

/*
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    status: {
      type: String,
      enum: ["admin", "general"],
      default: "general",
    },
    allow: {
      type: Boolean,
      default: false,
    },
  },
*/

const MESSAGES = require("../utils/messages");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, MESSAGES.VALIDATION.NAME_REQUIRED],
      trim: true,
    },
    email: {
      type: String,
      required: [true, MESSAGES.VALIDATION.EMAIL_REQUIRED],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, MESSAGES.VALIDATION.PASSWORD_REQUIRED],
    },
    status: {
      type: String,
      enum: ["admin", "general"],
      default: "general",
    },
    allow: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);


module.exports = mongoose.model("User", userSchema);
