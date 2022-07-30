const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const dotenv = require("dotenv").config();
const URL = process.env.DB;
//Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

let users = [];
app.post("/register",async function (req,res){
  try {
     //open the connection
     const connection = await mongoClient.connect(URL);
     //select the DB
    const db = connection.db("b35wd");

    // const connection = await mongoclient.connect(URL);  //open the connection 

    // const db = connection.db("students")

    console.log(req.body);
    //select the collection
    await db.collection("users").insertOne(req.body);
    //close the connection
    await connection.close();
    
    res.json({
      message:"Successfully registered",
    });

  } catch (error) {
    res.json({
      message:"Error",
    });
  }
})

app.get("/users", async function (req, res) {
  try {
    //open the connection
    const connection = await mongoClient.connect(URL);
    //select the DB
    const db = connection.db("b35wd");
    
    //select the collection and do operation
    let students = await db.collection("users").find().toArray();
    //close the connection
    await connection.close(); 
    res.json(students);
  } catch (error) {
    console.log(error);
  }
});

app.post("/student", async function (req, res) {
  try {
    //open the connection
    const connection = await mongoClient.connect(URL);
    //select the DB
    const db = connection.db("b35wd");
    //select the collection and do operation
    await db.collection("students").insertOne(req.body);
    //close the connection
    await connection.close();
    res.json({
      message: "student added successfully",
    });
  } catch (error) {
    console.log(error);
  }

  //    req.body.id=students.length+1;
  //     console.log(req.body);
  //     students.push(req.body);
  //     res.json({
  //         message:"Student added Successfully"
  //     });
});
app.get("/user/:id", async function (req, res) {
  try {
    //open the connection
    const connection = await mongoClient.connect(URL);
    //select the db
    const db = connection.db("b35wd");
    //select the collection
    let student = await db
      .collection("students")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
    //close the connection
    await connection.close();
    res.json(student);
  } catch (error) {
    console.log(error);
  }

  
});
app.put("/user/:id", async function (req, res) {
  try {
    //open the connection
    const connection = await mongoClient.connect(URL);
    //select the db
    const db = connection.db("b35wd");
    //select the collection
    let student = await db
      .collection("users")
      .updateOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body });
    //close the connection
    await connection.close();
    res.json({
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error);
  }

  //find the student with id
  //   const id = req.params.id;
  //   const studentindex = students.findIndex((student) => student.id == id); //1=="1"(true)
  //   students[studentindex].email = req.body.email;
  //   students[studentindex].password = req.body.password;
  //   res.json({
  //     message: "updated successfully",
  //   });
});

app.delete("/user/:id", async function (req, res) {
  try {
    //open the connection
    const connection = await mongoClient.connect(URL);
    //select the dbs
    const db = connection.db("b35wd");
    //select the collection
    const student = await db
      .collection("users")
      .deleteOne({ _id: mongodb.ObjectId(req.params.id) });
    //close the connection
    await connection.close();
    res.json({
      message: "deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
  //find the student with id
  //     const id=req.params.id;
  //     const studentindex=students.findIndex((student)=>student.id==id);//1=="1"(true)
  //    students.splice(studentindex,1);
});
app.listen(process.env.PORT || 5000);
