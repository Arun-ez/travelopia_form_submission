import mongoose from "mongoose";

const createConnection = async () => {

    if (mongoose.connection.readyState) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected');
    } catch (error) {
        console.log(error);
    }
}

export { createConnection }