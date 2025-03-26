const mongoose = require("mongoose");
const initData = require("./data2.js");
const Bcastudent = require("../models/bcastudent.js");

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
    await Bcastudent.deleteMany({});
    await Bcastudent.insertMany(initData.data2);
    console.log("Data was initialized !");
}

initDB();