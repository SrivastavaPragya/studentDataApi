// requiring express
const express=require("express")
//requiring monggose which is in db folder and inside it a file name conn.js
require("./db/conn");
const Student=require("./models/students")
const app=express();
const port=process.env.PORT||3000
//using express json an inbuilt method which is used to recgnize incoming requesr object as json object
// also known as middle ware in the application

app.use(express.json());

// create a new students after connecting from the post man
// using promises
app.post("/student",(req,res)=>{
    console.log(req.body)
const user= new Student(req.body)
// to store in the data base in mongo compass
user.save().then(()=>{
    res.send(user);
}).catch((e)=>{
    res.send(e)
})
})


// using assync await instead of promises for creating students after connecting to the postman
// app.post("/student",async(req,res)=>{

// try{
    
//         const user= new Student(req.body)
    
//         const createUser= await user.save();
//         res.status(201).send(createUser)
// }catch(e){
//     res.status(400).send(e);
// }
// })



// Student.create({
//     name:"Omi",
//     email:"dkdkd",
//     phone:1234567899,
//     address:"dfasdfad"
// })





// read the data of registered Students
// basically getting the data from the api

app.get("/student",async(req,res)=>{

    try{

       const studentData= await Student.find();
       res.send(studentData);
    }catch (e){
res.send(e);
    }
})


// get individual student data

app.get("/student/:id",async (req,res)=>{
    try{
const _id=req.params.id// jobhi url mai data hota hai uska recod mill rha hota hai
// console.log(req.params.id);
const studentsData=await Student.findById(_id);
res.send(req.params.id);
if(!studentsData){
    return res.statusMessage(404).send();
}
else{
    res.send(studentsData)
}
    }catch (e){
res.status(500).send(e)
    }

})

//delete the students by its id

app.delete("/student/:id",async (req,res)=>{
    try{

const deleteStudent=await Student.findByIdAndDelete(req.params.id);
// first finding the id and then deleting it

if(!req.params.id){
    // id we are getting is invalid then this if function will get executed
    return res.statusMessage(404).send();
}
else{
    res.send(deleteStudent)
}
    }catch (e){
        // showing server error
        
res.status(500).send(e)
    }

})
// updating the request
app.patch("/student/:id",async(req,res)=>{
try{
    const _id=req.params.id
    const UpdateStudents=await Student.findByIdAndUpdate(_id,req.boby)
     
        res.send(UpdateStudents)
    
}catch (e){
    res. status(400).send(e)
}
})

app.listen(port,()=>{
    console.log(`connection is setup at ${port}`)
})