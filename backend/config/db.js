import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDB, {})
        console.log('MongoDb connection is successful');

        // ── one-time fix: drop stale slug index ──
        try {
            await mongoose.connection.collection('websites').dropIndex('slug_1')
            console.log('✅ slug_1 index dropped')
        } catch (e) {
            console.log('slug index already clean:', e.message)
        }
        // ─────────────────────────────────────────

    } catch (error) {
        console.error("Error in MongoDB connection");
        process.exit(10)
    }
}

export default connectToDB;