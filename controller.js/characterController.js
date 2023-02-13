const { default: axios } = require("axios");
const cheerio = require("cheerio");
const characterController = {
  getAllCharacter: (req, res1) => {
    const thumbnails = [];
    const limit = +req.query.limit;
    try {
      axios(
        "https://kimetsu-no-yaiba.fandom.com/wiki/Kimetsu_no_Yaiba_Wiki"
      ).then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);
        $(".portal", html).each(function () {
          const name = $(this).find("a").attr("title");
          const url = $(this).find("a").attr("href");
          const image = $(this).find("a > img").attr("data-src");
          thumbnails.push({
            name,
            url: "http://localhost:5000/v1" + url.split("/wiki")[1],
            image,
          });
        });
        if (limit > 0) {
          return res1.status(200).json(thumbnails.slice(0, limit));
        }
        res1.status(200).json(thumbnails);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getCharacter: (req, res) => {
    let titles = [];
    const details = [];
    const characterObj = {};
    const characters = [];
    const galleries = [];
    try {
      axios(
        `https://kimetsu-no-yaiba.fandom.com/wiki/${req.params.character}`
      ).then((resp) => {
        const html = resp.data;
        const $ = cheerio.load(html);

        $(".wikia-gallery-item", html).each(function () {
          const gallery = $(this).find("a > img").attr("data-src");
          galleries.push(gallery);
        });
        //Get title
        $("aside", html).each(function () {
          $(this)
            .find("section > div > h3")
            .each(function () {
              titles.push($(this).text());
            });

          $(this)
            .find("section > div > div")
            .each(function () {
              details.push($(this).text());
            });
          const image = $(this).find("img").attr("src");
          if (image !== undefined) {
            for (let i = 0; i < titles.length; i++) {
              characterObj[titles[i].toLowerCase()] = details[i];
            }
            characters.push({
              name: req.params.character.replace("_", " "),
              garllery: galleries,
              image,
              ...characterObj,
            });
          }
        });
        res.status(200).json(characters);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = characterController;
