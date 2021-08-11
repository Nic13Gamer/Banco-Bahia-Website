// TODO: start making the images, etc. api for the bot.

// for the image api, the bot could make a request for the api, providing name, etc. and then the api outputs the image requested

// USE A PRIVATE KEY FOR API REQUEST, because people can crash the bot spamming outside discord api requests

import Express from "express";

const app = Express();
const port = 3000;

app.post("/", (request, response) => {
    response.send("hello world");
})

app.get("/", (request, response) => {
    response.send("API bot disacord");
})

app.listen(port, () => console.log("API started on port " + port));