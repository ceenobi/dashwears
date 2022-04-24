import mongoose from 'mongoose'

const connectDatabse = async () => {
try {
  const conn = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) 
  console.log('Mongo connected'); 
} catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1)
}
}

export default connectDatabse