// code 500 for server error
// we can return a JSON using response.json({}); and then in C# project we can use Newtonsoft.JSON to deserialize it

const express = require("express");
const config = require("../config.json");

const app = express();
const port = 3000;

const randomStringLength = 24;

app.use(express.urlencoded( {extended: true} ));
app.use(verifyApiKey);

app.post("/:param", async (req, res) => {
    const param = req.params.param;

    try {
        const module = require(`./modules/${param}.js`);
        module.run(req, res, randomString(randomStringLength));
    } catch (err) {
        res.status(404).send("API module not found: " + param);
    }
});

function verifyApiKey(req, res, next) {
    if(req.headers.key !== config.apiKey) {
        res.status(403).send("Forbidden: API key is wrong");
        return;
    }

    next();
}

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