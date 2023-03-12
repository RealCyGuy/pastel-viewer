import { Schema, model } from "mongoose";

interface IUser {
  id: string;
  name: string;
  discriminator: string;
  avatar_url: string;
  mod: boolean;
}

const userSchema = new Schema<IUser>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  discriminator: { type: String, required: true },
  avatar_url: { type: String, required: true },
  mod: { type: Boolean, required: true },
});

interface IAttachment {
  id: number;
  filename: string;
  url: string;
  is_image: boolean;
  size: number;
}

const attachmentSchema = new Schema<IAttachment>({
  id: { type: Number, required: true },
  filename: { type: String, required: true },
  url: { type: String, required: true },
  is_image: { type: Boolean, required: true },
  size: { type: Number, required: true },
});

interface IMessage {
  timestamp: string;
  message_id: string;
  author: IUser;
  content?: string;
  type: string;
  attachments: IAttachment[];
  edited?: boolean;
}

const messageSchema = new Schema<IMessage>({
  timestamp: { type: String, required: true },
  message_id: { type: String, required: true },
  author: { type: userSchema, required: true },
  content: { type: String, required: false },
  type: { type: String, required: true },
  attachments: { type: [attachmentSchema], required: true },
  edited: { type: Boolean, required: false },
});

interface ILogs {
  _id: string;
  key: string;
  open: boolean;
  created_at: string;
  closed_at: string;
  channel_id: string;
  guild_id: string;
  bot_id: string;
  recipient: IUser;
  creator: IUser;
  closer?: IUser;
  messages: IMessage[];
  close_message?: string;
  nsfw: boolean;
  title?: string;
}

const logsSchema = new Schema<ILogs>({
  _id: { type: String, required: true },
  key: { type: String, required: true },
  open: { type: Boolean, required: true },
  created_at: { type: String, required: true },
  closed_at: { type: String, required: true },
  channel_id: { type: String, required: true },
  guild_id: { type: String, required: true },
  bot_id: { type: String, required: true },
  recipient: {
    type: userSchema,
    required: true,
  },
  creator: {
    type: userSchema,
    required: true,
  },
  closer: {
    type: userSchema,
    required: false,
  },
  messages: { type: [messageSchema], required: true },
  close_message: { type: String, required: false },
  nsfw: { type: Boolean, required: true },
  title: { type: String, required: false },
});

const LogModel = model("Logs", logsSchema);

export default LogModel;
export { ILogs, IUser, IMessage, IAttachment };
