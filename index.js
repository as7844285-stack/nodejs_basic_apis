import express, { json } from "express";
import { validateUserCreation } from "./midlaware.js";
const app = express();
app.use(express.json());


const router= express.Router();

router.use((req, res, next)=>{
  console.log("router midleware")
  next();
});

const data=[
    {
        id: "01",
        name:"Ankush",
        branch : "MCA"
    },
    {
        id: "02",
        name:"Rahul",
        branch : "MCA"
    },
    {
        id: "03",
        name:"Sushant",
        branch : "MCA"
    }
];


router.get("/api/data/:id",(req,res)=>{
  res.send("user id")
});

app.use("/api",router)



app.use((req , res , next) => {
  console.log("Current Date : " , Date.now());
  next();
})

app.get("/" , (req , res) => {
  res.send("Welcome to my api")
})

app.get("/api/data", (req,res)=>{
    res.json(data);
});

// one user get
app.get("/api/data/:id", (req, res) => {
  try {
    const { id } = req.params;

    const student = data.find((item) => item.id === id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/// push user
app.post("/api/data",validateUserCreation,(req, res) => {
  try {
    const { id, name, branch } = req.body;

    data.push({
      id,
      name,
      branch,
    });

    res.status(201).json({
      success: true,
      message: "Student Added Successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//put data
app.put("/api/data/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name, branch } = req.body;

    const student = data.find((item) => item.id === id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    student.name = name;
    student.branch = branch;

    res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//delete
app.delete("/api/data/:id", (req, res) => {
  try {
    const { id } = req.params;

    const index = data.findIndex((item) => item.id === id);

    console.log("index : " , index)

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    data.splice(index, 1);

    res.status(200).json({
      success: true,
      message: "Student Deleted Successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("App is running on port : 3000");
});
