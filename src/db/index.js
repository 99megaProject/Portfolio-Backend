import mongoose from "mongoose";




const dbConnection = async () => {
    //console.log(process.env.DB_URL);
    try {

        const instance = await mongoose.connect(`${process.env.DB_URL}/portfolio`)

        //console.log(instance.connection.host);

        return true
    } catch (error) {
        console.log(`db connection failed and message  : ${error.message}`);
    }
}


export default dbConnection 