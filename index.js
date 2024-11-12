import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import ProductRoutes from './Routes/ProductRoutes.js'
import AuthRoutes from './Routes/AuthRoutes.js'
import UserRoutes from './Routes/UserRoutes.js'



dotenv.config()


const app = express()
app.use(express.json())
dotenv.config()
const CorsOptions = {
    origin:"*",
    methods : ["POST" , "PUT" , "GET" , "DELETE"],
}
app.use(cors(CorsOptions))
app.use('/auth' , AuthRoutes)
app.use( '/product' , ProductRoutes )
app.use('/user' , UserRoutes)

const PORT = process.env.PORT
const URL = process.env.DB_URL

const ConnectToDb = async() => {
    try{
        await mongoose.connect(URL)
        console.log("you are connected to the database")
    }
    catch(error){
        console.log(error)
    }
}


app.listen(PORT, () => {
    ConnectToDb();
    console.log(`Your server is running on port ${PORT}`);

});
