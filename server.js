const app = require("express")();
const server = require("http").createServer(app);

const port = 3500;

const deviceinfo = [];

//show data in device info
app.get("/", async (req, res) => {
  res.send(deviceinfo);
});

//show data in device info
app.get("/sathit", async (req, res) => {
  res.send("Hola");
});

// API Post push notification
app.post("/Pushnotifications", (req, res) => {
  res.send("successfully");
});

//Listen port 3000
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
