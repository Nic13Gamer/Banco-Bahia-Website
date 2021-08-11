// TODO: start making the images, etc. api for the bot.

// for the image api, the bot could make a request for the api, providing name, etc. and then the api outputs the image requested

// USE A PRIVATE KEY FOR API REQUEST, because people can crash the bot spamming outside discord api requests

import Express from "express";
import fs from "fs";

const app = Express();
const port = 3000;

app.use(Express.json());
app.use(Express.urlencoded( {extended: true} )); 

let apiKey;
fs.readFile('api.key', 'utf8', (err,data) => {
    if (err) {
        return console.log(err);
    }

    apiKey = data.toString();
});

app.post("/", (request, response) => {
    if(request.headers.key !== apiKey) {
        response.send("Forbidden : API key is wrong");
        return;
    } 

    response.send("success");
})

app.listen(port, () => console.log("API started on port " + port));