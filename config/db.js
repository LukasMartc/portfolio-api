import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const connection = await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`MongoDb connected in: ${url}`);
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;