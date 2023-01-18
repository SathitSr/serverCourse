const app = require("express")();
const server = require("http").createServer(app);
const util = require("util");
var mysql = require("mysql");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
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

app.get("/", async (req, res) => {
  res.send("/api/");
});

app.get("/api/user", async (req, res) => {
  const rows = await query("SELECT * FROM test.user");

  res.send(rows);
});

app.get("/api/get-products", async (req, res) => {
  const rows = await query("SELECT * FROM test.products");
  res.send(rows);
});

//add product
app.post("/api/add-products", async (req, res) => {
  const rows = await query(
    ` INSERT INTO test.products (product_name, product_detail, price_after_discount,price_befor_discount,rate,sold,location,image) VALUES ("${req.body.product_name}", "${req.body.product_detail}", ${req.body.price_after_discount}, ${req.body.price_befor_discount},${req.body.rate},${req.body.sold},"${req.body.location}","${req.body.image}")`
  );
  res.send("success");
});

//check out
app.post("/api/delete", async (req, res) => {
  console.log("check body : ", req.body);
  const rows = await query(`DELETE FROM test.products WHERE id=${req.body.id}`);
  res.send("success");
});

//add product to cart
app.post("/api/add-cart", async (req, res) => {
  const getProduct = await query(
    `SELECT * FROM test.products WHERE id = ${req.body.product_id}`
  );

  if (getProduct) {
    let productx = JSON.stringify(getProduct);
    const addCart = await query(
      ` INSERT INTO test.cart (user_id, product_id, products) VALUES ("${req.body.user_id}", "${req.body.product_id}", ${productx})`
    );
  }

  // const addCart = await query(
  //   ` INSERT INTO test.cart (user_id, product_id) VALUES ("${req.body.user_id}", "${req.body.product_id}")`
  // );
  console.log("check getProduct : ", getProduct);

  res.send("success");
});

//product in cart
app.get("/api/cart", async (req, res) => {
  const getCart = await query(
    `SELECT * FROM test.cart WHERE user_id = ${req.body.user_id}`
  );
  console.log("check addcart : ", getCart);

  res.send(getCart);
});

app.post("/Pushnotifications", (req, res) => {
  res.send("successfully");
});

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
