import mongoose from "mongoose";


const connectDB = async ()=>{
    try {
        const CONNECTION =process.env.MongoDB_URI 
        const conn = await mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`MongoDB connected: ${conn.connection.host}`);
        console.log(`MongoDB connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // process.exit(1);
    }
}

export default connectDB;