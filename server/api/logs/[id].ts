import { connect } from "mongoose";
import Logs from "~~/models/LogModel";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  if (!/^[A-Za-z0-9]*$/.test(id)) {
    throw createError({ statusCode: 404, statusMessage: "Invalid ID." });
  }

  const config = useRuntimeConfig();
  await connect(config.mongoURI, {
    dbName: "modmail_bot",
  });
  const data = await Logs.findOne({ key: id }).exec();

  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: "Log not found.",
    });
  }

  return data;
});
