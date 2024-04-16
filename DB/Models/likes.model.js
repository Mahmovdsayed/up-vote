import { Schema, model } from "mongoose";

const likesSchema = new Schema(
  {
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likeDoneOnId: {
      type: Schema.Types.ObjectId,
      refPath: "onModel",
    },
    onModel: {
      type: String,
      enum: ["Posts", "User", "Comment", "Reply"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("Likes", likesSchema);
