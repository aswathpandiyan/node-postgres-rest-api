const polka = require("polka");
const bodyParser = require("body-parser");
const send = require("./helper/response");
const products = require("./controller/products");
const dotenv = require("dotenv").config();

const app = polka({
  onError: function (err, req, res, next) {
    console.log("onError Called", err);
    send.error(res, err);
  },
});

//initialize database
require("./initDb")();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.all("/test", (req, res) => {
  send.json(res, req.body);
});
app.get("/products", products.getAll);
app.post("/products", products.create);
app.get("/products/:id", products.findById);
app.delete("/products/:id", products.deleteById);
app.patch("/products/:id", products.updateById);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`-> Running on localhost: ${PORT}`);
});
