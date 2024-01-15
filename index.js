import express from "express";
import path from "path";

const app = express();

const db = [];

//MIDDLEWARES
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/users", (req, res) => {
    res.json({db});
})

app.get("/success", (req, res) => {
    res.render("success");
})


app.post("/", (req, res) => {
    db.push({name: req.body.username, email: req.body.email});
    // console.log("info stored successfully in db");
    res.redirect("success");
})

app.listen(5000, () => {
    console.log("server is up and running");
})













// app.get("/about", (req, res) => {
//     res.send("<h1>I Am Narottam Bhardwaj</h1>");
// })