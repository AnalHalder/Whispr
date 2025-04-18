const mongoose = require('mongoose')

async function connectDB() {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("mongodb connected"))
        .catch((error) => console.log(error))
}

module.exports = connectDB
