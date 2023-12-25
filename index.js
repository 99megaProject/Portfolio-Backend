import app from "./app.js";
import dbConnection from './src/db/index.js'
import dotenv from 'dotenv'

dotenv.config()


const PORT = process.env._PORT || 8080

dbConnection()
    .then((res) => {
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        })
    })
    .catch((error) => console.log(`Server run failed message : ${error.message} `))
