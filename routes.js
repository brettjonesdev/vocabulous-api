var controller = require("./controller");
var auth = require("./auth");

module.exports = function (app) {
    console.log("configuring routes");

    //Open
    app.post("/register", controller.register);
    app.post("/authenticate", controller.authenticate);

    //Authenticate
    app.post("/addWord", auth.authenticate, controller.addWord);
    app.get("/allWords", auth.authenticate, controller.getAllWords);

    console.log("routes configured");
};