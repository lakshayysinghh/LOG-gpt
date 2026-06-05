import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: [true, "serviceName is required"],
      trim: true,
      index: true,
    },
    level: {
      type: String,
      required: [true, "level is required"],
      enum: ["DEBUG", "INFO", "WARN", "ERROR", "CRITICAL"],
      index: true,
    },
    message: {
      type: String,
      required: [true, "message is required"],
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  }
);

// Compound index for dashboard queries (recent logs by level)
logSchema.index({ level: 1, timestamp: -1 });

export const Log = mongoose.model("Log", logSchema);
