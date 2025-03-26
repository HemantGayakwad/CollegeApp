const mongoose = require("mongoose");
const initData = require("./data.js");
const Student = require("../models/student.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/college";
main().
    then(()=>{
        console.log("connected DB");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async() => {
    await Student.deleteMany({});
    await Student.insertMany(initData.data);
    console.log("Data was initialized !");
}

initDB();