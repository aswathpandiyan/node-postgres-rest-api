require("dotenv").config();

const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production" ? true : false;

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

//use pool for best performance on continuous fetching
const pool = new Pool({
  connectionString: isProduction ? process.env.POSTGRES_URL : connectionString,
  ssl: isProduction,
  // maximum number of clients the pool should contain
  // by default this is set to 10.
  // max: 20,

  // number of milliseconds to wait before timing out when connecting a new client
  // by default this is 0 which means no timeout
  // connectionTimeoutMillis: 2000,

  // number of milliseconds a client must sit idle in the pool and not be checked out
  // before it is disconnected from the backend and discarded
  // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
  idleTimeoutMillis: 0,
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.on("connect", (client) => {
  console.log("db connceted    ::" + new Date().toUTCString());
});

pool.on("remove", (client) => {
  console.log("db disconnected ::" + new Date().toUTCString());
});

module.exports = { pool };
