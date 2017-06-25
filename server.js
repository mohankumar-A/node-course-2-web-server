const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", 'hbs');
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `Date: ${now}, ${req.method}, ${req.url}`;
    console.log(log);
    // fs.appendFileSync("server.log", log + "\n", ((err)=>{
    //     if(err) {
    //         console.log("unable to write file to server.log");
    //     }
    // }));
    fs.appendFileSync("server.log", log+"\n");
    next();
});

// app.use((req, res, next)=>{
//     res.render("maintanence.hbs");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () =>{
   return new Date().getFullYear();
});
hbs.registerHelper("screamIt", (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render("home.hbs", {
        titlePage: "Welcome Page",
        welcomeMessage: "Hi, Welcome to my page!"
    })
});

app.get('/about', (req, res) => {
   res.render("about.hbs", {
       titlePage: "About Page"
   });
});

app.get("/bad", (req, res) => {
   res.send({
        errorMessage: "Unable to fetch this request"
   });
});

app.listen(port, ()=>{
    console.log(`server is up and running on port ${port}`);
});