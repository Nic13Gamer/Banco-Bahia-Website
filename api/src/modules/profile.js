const jimp = require("jimp");
const fs = require("fs");
const path = require("path");

module.exports.run = async (req, res, randomString) => {
    const base = await jimp.read("../base.jpg");
    const font = await jimp.loadFont(jimp.FONT_SANS_128_BLACK);
    const fontSmall = await jimp.loadFont(jimp.FONT_SANS_64_BLACK);

    const baseWidth = base.getWidth();
    const baseHeight = base.getHeight();

    const profilePic = await jimp.read(req.body.profilePic);
    const username = req.body.username;
    const money = parseInt(req.body.money);

    base.composite(profilePic.resize(328, 328), baseWidth / 2 - profilePic.getWidth() / 2, 60);
    base.print(font, 0, 0, {
        text: username,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
    }, baseWidth, 1000);
    base.print(font, 0, 0, {
        text: "$" + money,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
    }, baseWidth, 1300);
    base.print(fontSmall, 0, 0, {
        text: "alpha",
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
    }, baseWidth, 2800);

    let out = `./out/profile_${randomString}.png`;
    await base.writeAsync(out);

    res.send(path.resolve(out));

    await setTimeout(() => {
        fs.unlink(out, () => {})
    }, 3000)
};