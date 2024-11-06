import mongoose from "mongoose";

const dbconnect = async (): Promise<void> => {
  // Check if the connection is already established
  if (mongoose.connection.readyState >= 1) {
    console.log("Database is already connected");
    return;
  }

  try {
    const db = await mongoose.connect( "mongodb://localhost:27017/NotesHub", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database is connected");

  } catch (err) {
    console.error("Connection error:", err);
  }
};

export default dbconnect;
