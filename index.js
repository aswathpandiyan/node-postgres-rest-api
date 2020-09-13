const polka = require("polka");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
//import environment variables
dotenv.config();
//import helpers
const send = require("./helper/response");
const log = require("./helper/logger");
const authenticateToken = require("./helper/autheticate");
//import models
const products = require("./controller/products");
const users = require("./controller/users");
//initialize app
const app = polka({
  onError: function (err, req, res, next) {
    log.error(err);
    send.error(res, err);
  },
});
//initialize database
require("./initDb")();
//initialize midlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//initialize routes
app.all("/test", (req, res) => {
  send.json(res, req.body);
});
app.get("/products", authenticateToken, products.getAll);
app.post("/products", products.create);
app.get("/products/:id", products.findById);
app.delete("/products/:id", products.deleteById);
app.patch("/products/:id", products.updateById);

app.post("/users", users.create);
app.post("/login", users.login);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) throw err;
  log.info(`-> Running on localhost: ${PORT}`);
});
