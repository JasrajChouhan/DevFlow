import mongoose, { Document, models } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  name: string;
  bio?: string;
  location?: string;
  reputation?: number;
  portfolio?: string;
  image?: string;
}
export interface IUserDoc extends IUser, Document {}
const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      index: true,
      match: [/^[a-zA-Z0-9_]+$/, "username is invalid"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      index: true,
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        "email is invalid",
      ],
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    reputation: {
      type: Number,
      default: 0,
    },
    portfolio: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = models?.User || mongoose.model("User", userSchema);

export default User;
