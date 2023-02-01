const mongoose = require("mongoose");

// to connect to database

const main = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/firstdb"
    );

    await connection.disconnect();
  } catch (err) {
    console.log("Error occured while connecting to MongoDB", "\n", err);
  }
};

main();

const studentSchema = mongoose.Schema(
  {
    student_name: String,
    age: { type: Number, required: true },
    city: String,
  },
  {
    __v: false,
  }
);

const StudentModel = mongoose.model("student", studentSchema);

//!Defining the structure of our document
//**Schema -> structure/blueprint**
//**Model ->  consist of schema*/

/*
!for adding one entry 
    const student = new StudentModel({
      student_name: "Yash Kuthiyal",
      city: "Kangra",
      age: 20,
    });
    student.save();
    
*/
/*
 *for multiple entries
 *await StudentModel.insertMany([{},{},{}])
 */

/**
 *! for getting all the students
 *   const students = await StudentModel.find({ city: "Istanbul" });
    console.log(students);
 */
/*
 *typecasting
 * const str = "1997" --> Number(str) - doable
 * const str = "asdf" --> Number(str) - not doable
 */
