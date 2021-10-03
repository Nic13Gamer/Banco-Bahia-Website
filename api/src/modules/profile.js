const jimp = require("jimp");
const fs = require("fs");
const path = require("path");

module.exports.run = async (req, res, randomString) => {
    const base = await jimp.read("./resources/profile/base.jpg");
    const profilePicMask = await jimp.read("./resources/profile/mask.png");

    const font = await jimp.loadFont(jimp.FONT_SANS_128_BLACK);
    const fontSmall = await jimp.loadFont(jimp.FONT_SANS_64_BLACK);

    jimp.read(req.body.profilePic)
    .then(async profilePic => {
        const username = req.body.username;
        const money = parseInt(req.body.money);

        profilePicMask.resize(profilePic.getWidth(), profilePic.getHeight());
        profilePic.mask(profilePicMask, 0, 0);

        base.composite(profilePic, 0, 0);
        base.print(fontSmall, 0, profilePic.getHeight() + 30, username);

        let out = `./out/profile_${randomString}.png`;
        await base.writeAsync(out);

        res.send(path.resolve(out));

        setTimeout(() => {
            fs.unlink(out, () => { });
        }, 3000)
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Internal server error");
    });
};