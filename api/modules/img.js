const jimp = require("jimp");
const fs = require("fs");
const path = require("path");

module.exports.run = async (request, response, randomString) => {
    const base = await jimp.read(request.body.msg);
    const font = await jimp.loadFont("../arial.fnt");

    base.print(font, 0, 0, "SUS");

    let out = `./out/${randomString}.png`;
    base.write(out);

    setTimeout(() => {
        response.send(path.resolve(out));
    }, 10)

    await setTimeout(() => {
        fs.unlink(out, () => {})
    }, 5000)
};