const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//define paths for express config
const publicDirPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

//setup handlebars engine and views location
app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);

//To use html,css,js setting it to a specific path
//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
    res.render(viewsPath+"\\index.hbs",{
        title:"Weather app",
        name: "Jose"
    });
});
app.get("/weather", (req, res) => {
    if(!req.query.address){
        res.send({error:"Query address is mandatory"});
        return ;
    }
    let address = req.query.address;
    geocode(address,(err,data) =>{
        if(err){
            return res.send({err});
        }
        forecast(data.latitude,data.longitude, (err,dataF)=>{
            if(err){
                return res.send({err});
            }
            res.send({dataF,data});
        });
    });
});

app.get("/about", (req, res) => {
    res.render(viewsPath+"\\about.hbs",{
        title:"About me",
        name: "-> Jose Alvarez Pumarino"
    });
});
app.get("/help", (req, res) => {
    res.render(viewsPath+"\\help.hbs",{
        title:"Help page",
        name: "-> Page to help users"
    });
});
app.get("/help/*", (req, res) => {
    res.render(viewsPath+"\\404.hbs",{
        title:"No page found inside help page",
        name: "Jose Alvarez Pumarino",
        errorMessage: "Look for a valid url."
    });
});
app.get("*", (req, res) => {
    res.render(viewsPath+"\\404.hbs",{
        title:"No page found",
        name: "Jose Alvarez Pumarino",
        errorMessage: "Look for a valid url."
    });
});

app.listen(port, () => {
    console.log("Server is running correctly:\nlocalhost:3000");
});