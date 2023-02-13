const characterController = require("../controller.js/characterController");

const routerCharacter = require("express").Router();

routerCharacter.get("/", characterController.getAllCharacter);
routerCharacter.get("/:character", characterController.getCharacter);

module.exports = routerCharacter;
