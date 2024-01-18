import express from "express";
import mongoose from "mongoose";
import path from "path";

//CONNECTING MY DATABASE USING MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/backend")
.then(() => {
    console.log("Connected to the Database");
})
.catch((e) => {
    console.log("ERROR!!! COULDN'T CONNECT TO DATABASE");
    console.log(e);
});

const app = express();

//DEFINING MY SCHEMA
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
});

//CREATING A MODEL ACCORDING TO THE SCHEMA USING MONGOOSE
const Message = mongoose.model("Message", messageSchema);


//MIDDLEWARES
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//ADDING NEW ENTRY INTO THE DATABASE 
app.get("/add", async (req, res) => {
    await Message.create({ name:"Manikant", email:"Manikant@gmail.com" });
    res.send("Data Added");
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/users", (req, res) => {
    res.json({db});
});

app.get("/success", (req, res) => {
    res.render("success");
});


app.post("/contact", async (req, res) => {
    // db.push({name: req.body.username, email: req.body.email});
    // console.log("info stored successfully in db");
    //ADDING MY DATA IN MY DATABASE
    const data = { name:req.body.username, email:req.body.email };
    await Message.create(data);

    res.redirect("success");
});

//TO MAKE MY APPLICATION LISTEN ON A PORT
app.listen(5000, () => {
    console.log("server is up and running");
});