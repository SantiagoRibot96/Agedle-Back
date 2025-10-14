const app = require("./app");
const db = require("./Configs/db");
const port = 8080;

// start the server and bind to all interfaces
app.listen(port, "0.0.0.0", () => {
    console.log(`Listening at http://localhost:${port}`);
});

// handle ctrl + c
process.on("SIGINT", function() {
    console.log("Caught interrupt signal");
    db.end(function (err) {
        // all connections in the pool have ended
        console.log("Closed all pool connections");
        process.exit();
    });
});