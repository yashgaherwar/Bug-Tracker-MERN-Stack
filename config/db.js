const mongoose = require('mongoose');
const config = require('config');
mongoURI="mongodb+srv://Yash:yash@cluster0.gtnju.mongodb.net/Bug-Tracker-MERN?retryWrites=true&w=majority"
//const db = config.mongoURI;
const db = config.get('mongoURI');

// const connectDB = mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
//   if(!err) return console.log('connected to DB')
//   console.log(err)
// })

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected !!');
  } catch (err) {
    console.error(err.message);
    // Exit process
    process.exit(1);
  }
};

module.exports = connectDB;