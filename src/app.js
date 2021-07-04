const express = require("express");
const path = require("path");
require("./db/conn");
const User = require("./models/userdata");
const hbs = require("hbs");

const app = express();
const port = 80;

//setting path
const staticpath = path.join(__dirname,"../public" );
const templatepath = path.join(__dirname,"../templates/views" );
const partialspath = path.join(__dirname,"../templates/partials" );


//console.log(path.join(__driname,"../public"));..to find the path of static file
//static
app.use('/css', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialspath);

// app.get("/",(req,res)=>{
//     res.send("Hii")
// })
app.get("/",(req,res)=>{
    res.render("index");
})
// app.get("/contact",(req,res)=>{
//     res.render("contact");
// })
app.post("/contact", async(req,res)=>{
    try{
        // res.send(req.body)
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }catch(error){
        res.status(500).send(error);
    }
})
app.listen(port,()=>{
    console.log(`The app started ${port}`);
})