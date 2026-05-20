const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Student = require("./models/student.js");
const Bcastudent = require("./models/bcastudent.js");
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

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

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
// app.use(express.json());
app.use(methodOverride("_method"));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.render("home.ejs");
})
app.get("/tybca",async (req,res)=>{
    const allStudents = await Bcastudent.find({});
    res.render("tybca.ejs",{allStudents});
});

app.get("/tybsc",async (req,res)=>{
    const allStudents = await Student.find({});
    res.render("tybsc.ejs",{allStudents});
});

app.post("/tybsc",async (req,res)=>{
    const newstudent = new Student(req.body.tyStudents);
    await newstudent.save();
    res.redirect("/tybsc");
});

app.post("/tybca",async (req,res)=>{
    const newstudent = new Bcastudent(req.body.tybcaStudents);
    await newstudent.save();
    res.redirect("/tybca");
});

// new route

app.get("/tybsc/new",async (req,res)=>{
    res.render("new.ejs");
});

app.get("/tybca/new",async (req,res)=>{
    res.render("new2.ejs");
});

// show route

app.get("/tybsc/:id",async (req,res)=>{
    let {id}= req.params;
    const student = await Student.findById(id);
    res.render("show.ejs",{student});
})

app.get("/tybca/:id",async (req,res)=>{
    let {id}= req.params;
    const student = await Bcastudent.findById(id);
    res.render("show2.ejs",{student});
})


app.listen(3000,()=>{
    console.log("app is listening on port 3000");
});
