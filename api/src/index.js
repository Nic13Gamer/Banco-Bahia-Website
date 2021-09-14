// code 500 for server error
// we can return a JSON using response.json({}); and then in C# project we can use Newtonsoft.JSON to deserialize it

const Express = require("express");
const fs = require("fs");

const app = Express();
const port = 3000;

const randomStringLength = 24;

app.use(Express.urlencoded( {extended: true} ));
app.use(verifyApiKey);

app.post("/:param", async (req, res) => {
    const param = req.params.param;

    try {
        const file = require(`./modules/${param}.js`);
        file.run(req, res, randomString(randomStringLength));
    } catch (err) {
        res.status(404).send("API module not found: " + param);
    }
});

function verifyApiKey(req, res, next) {
    fs.readFile('./apiKey.txt', 'utf8', (err,data) => {
        if (err) return console.log(err);

        if(req.headers.key !== data.toString()) {
            res.status(403).send("Forbidden: API key is wrong");
            return;
        }

        next();
    });
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