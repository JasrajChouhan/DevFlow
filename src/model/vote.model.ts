import { model, models, Schema, Types } from "mongoose";

export interface IVote {
  author: Types.ObjectId;
  id: Types.ObjectId;
  type: "question" | "answer";
  voteType: "upvote" | "downvote";
}

export const VoteSchema = new Schema<IVote>(
  {
    voteType: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["question", "answer"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Vote = models?.Vote || model("Vote", VoteSchema);
