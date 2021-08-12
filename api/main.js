// TODO: start making the images, etc. api for the bot.

// for the image api, the bot could make a request for the api, providing name, etc. and then the api outputs the image requested

// USE A PRIVATE KEY FOR API REQUEST, because people can crash the bot spamming outside discord api requests

const Express = require("express");
const fs = require("fs");

const app = Express();
const port = 3000;

const randomStringLength = 24;

app.use(Express.urlencoded( {extended: true} )); 

let apiKey;
fs.readFile('apiKey.txt', 'utf8', (err,data) => {
    if (err) return console.log(err);

    apiKey = data.toString();
});

app.post("/:param", async (request, response) => {
    if(request.headers.key !== apiKey) {
        response.status(403).send("Forbidden: API key is wrong");
        return;
    }

    const param = request.params.param;
    
    try {
        const file = require(`./tools/${param}.js`);
        file.run(request, response, randomString(randomStringLength));
    } catch (err) {
        response.status(404).send("API module not found: " + param);
    }
});

function randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

app.listen(port, () => console.log("API started on port " + port));