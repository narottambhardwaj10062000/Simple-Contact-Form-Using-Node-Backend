import express from "express";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

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

//MIDDLEWARES
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());

//DEFINING MY SCHEMA
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});

//CREATING A MODEL ACCORDING TO THE SCHEMA USING MONGOOSE
const User = mongoose.model("User", userSchema);

//isAuthenticated Function
const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if(token){
        const decoded = jwt.verify(token, "asdfghjkl");
        req.user = await User.findById(decoded._id)

        next();
    }else{
        res.render("login"); 
    }
}

//HOME ROUTE
app.get("/", isAuthenticated, (req, res) => {
    // console.log(req.user);
    
    res.render("logout", {name:req.user.name});
});

//LOGIN ROUTE
app.post("/login", async (req, res) => {
    const {username, email } = req.body;
    //storing the data in the database
    const user = await User.create({ name:username, email });

    const token = jwt.sign({ _id:user._id }, "asdfghjkl");

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60*1000),
    });
    res.redirect("/");
});

//LOGOUT ROUTE
app.get("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.redirect("/");
});

//TO MAKE MY APPLICATION LISTEN ON A PORT
app.listen(5000, () => {
    console.log("server is up and running");
});