const mongoose=require('mongoose');

const connectDB=async()=>{
    const conn=await mongoose.connect(process.env.MONGODB_URL,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
    console.log(`Mongodb connected:${conn.connection.host}`);
}

module.exports=connectDB;