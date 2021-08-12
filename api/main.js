// TODO: start making the images, etc. api for the bot.

// for the image api, the bot could make a request for the api, providing name, etc. and then the api outputs the image requested

// USE A PRIVATE KEY FOR API REQUEST, because people can crash the bot spamming outside discord api requests

import Express from "express";
import fs from "fs";
import path from "path";
import jimp from "jimp";

const app = Express();
const port = 3000;

const outFileNameLength = 24;

app.use(Express.urlencoded( {extended: true} )); 

let apiKey;
fs.readFile('apiKey.txt', 'utf8', (err,data) => {
    if (err) return console.log(err);

    apiKey = data.toString();
});

app.post("/:param", async (request, response) => {
    if(request.headers.key !== apiKey) {
        response.status(403).send("Forbidden : API key is wrong");
        return;
    }

    const param = request.params.param;
    
    let out;

    switch(param) {
        case "test": {
            out = `out/${randomString(outFileNameLength)}.png`;
            fs.copyFile("../output.png", out, () => {});

            break;
        }

        case "img": {
            const base = await jimp.read(request.body.msg);
            const font = await jimp.loadFont("../arial.fnt");

            base.print(font, 0, 0, "SUS");

            out = `out/${randomString(outFileNameLength)}.png`;
            base.write(out);

            break;
        }

        default: {
            response.status(404).send("Not found : " + param);
            return;
        }
    }

    setTimeout(() => {
        response.send(path.resolve(out));
    }, 10)

    setTimeout(() => {
        fs.unlink(out, () => {})
    }, 5000)
});


function randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

app.listen(port, () => console.log("API started on port " + port));