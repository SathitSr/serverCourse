const app = require("express")();
const server = require("http").createServer(app);
const util = require("util");
var mysql = require("mysql");

const port = 3500;

var con = mysql.createConnection({
  host: "178.128.20.202",
  user: "monty",
  password: "some_pass",
});

const query = util.promisify(con.query).bind(con);

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//show data in device info

// const testerList = (await testerInfo).map((item) => item.toJSON())
app.get("/", async (req, res) => {
  const rows = await query("SELECT * FROM test.user");

  res.send(rows);
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
