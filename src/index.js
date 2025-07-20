import dotenv from "dotenv"
import connectDB from "./db/db.js";

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.on('error', (err) => {
        console.error('Server error:', err);
        throw err;
    });
    app.listen(process.env.PORT || 8000,()=>{ 
        console.log(`Server is running at port:${process.env.PORT}`);
        
    })
})
.catch((err) =>{
    console.log("DB connection failed !!!",err);
    
})



/*(async ()=> {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, )
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
        
    }
}) ()
*/