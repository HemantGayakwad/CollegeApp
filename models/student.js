const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    mono :{
        type : Number,
        required : true,
    },
    village : String,
    present : {
        type : String,
        set : (v) => 
            v === ""
            ? "0" 
            : v,
    },
    gpa : {
        type : String,
        set : (v) => 
            v === ""
            ? "0" 
            : v,
    },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;