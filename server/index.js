const express = require('express');

const app = express();

const servePicture = (req, res) => {
    res.send({src: "https://static-cdn.jtvnw.net/jtv_user_pictures/meowntain-profile_banner-71b7a6d0d943dc9e-480.jpeg"});
};

const serveJoke = (req, res) => {
   res.send({setup: "what do you call a pile of kittens?", punchline: "a meowntain"}) 
};

const serveRoll = (req, res) => {
    const {quantity} = req.query;
    const length = Number(quantity) > 0? Number(quantity) : 1;
    const rolls = [];
    for (let i = 0; i < length; i++) {
        const roll = Math.ceil(Math.random() * 6);
        rolls.push(roll);
    };
    res.send(rolls);
};




const logRoutes = (req, res, next) => {
    const time = (new Date()).toLocaleString();
    req.time = time;
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
    next();
  };

  // The path module is useful for constructing relative filepaths
const path = require('path');

// the filepath is to the entire assets folder
const filepath = path.join(__dirname, '../vite-project/dist');

// generate middleware using the filepath
const serveStatic = express.static(filepath);

// Register the serveStatic middleware before the remaining controllers
app.use(serveStatic);

// other controllers 

app.use(logRoutes);


app.get('/api/picture', servePicture);
app.get('/api/joke', serveJoke);
app.get('/api/RollDie', serveRoll);



const port = 8080;
app.listen(port, () => {
    console.log(`listening at this port: http://localhost:${port}`)
});