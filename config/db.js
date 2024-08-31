const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`\n __________ 😎 MongoDB connected! 🇵🇰 __________`)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
