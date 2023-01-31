import { connect } from "mongoose";

export async function connectToDatabase() {
  try {
    await connect(
      `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.z8b8qya.mongodb.net/?retryWrites=true&w=majority`,
      { dbName: "test" }
    );
  } catch (err) {
    console.log(err);
    throw new Error("Error Occurred While Connecting");
  }
}
