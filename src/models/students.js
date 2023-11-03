const mongoose = require("mongoose")
const validator = require("validator");

// creating schema

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
     //   minlength: 3// adding validators

    },

    email: {
        type: String,
        required: true,
        unique: [true, "Email id already present"],
       // adding validator,here we are getting the value which user is inputting while typing the email... this validator checjs whether the mail is valid or not
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email")
            }
        }
    },
    phone: {
        type: Number,
        min: 0,
        max: 10,
        required: true,
        unique: true,


    },
    address: {
        type: String,
        required: true
    }

})

// defining model means we are creating a new collections
const Student=new mongoose.model("Student",studentSchema);
module.exports=Student;
module.exports = mongoose.model("Students", studentSchema)