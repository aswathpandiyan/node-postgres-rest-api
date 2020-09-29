const send = require("../helper/response");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const log = require("../helper/logger");
const token = require("../helper/token");
const { pool } = require("../config/db.js");
const { updateDynamicQueryWithValue } = require("../helper/queryBuilder");

const getBooks = async (req, res) => {
  pool.query("SELECT * FROM books", (error, results) => {
    if (error) {
      throw error;
    }
    send.json(res, results.rows, 200);
    // response.status(200).json(results.rows);
  });
};

const addBook = async (req, res, next) => {
  const { author, title } = req.body;
  pool.query(
    "INSERT INTO books (author, title) VALUES ($1, $2)",
    [author, title],
    (error) => {
      if (error) {
        throw error;
      }
      send.json(res, { status: "success", message: "Book added." }, 201);
    }
  );
};

const deleteBook = async (req, res, next) => {
  const id = req.params.bookId;
  if (!id) throw createError.BadRequest(`book id is missing`);
  const text = "DELETE FROM books WHERE id=$1";
  const values = [id];

  pool
    .query(text, values)
    .then((results) => {
      send.json(res, results.rows, 200);
    })
    .catch((err) => {
      next(err);
    });
};

const getBookById = async (req, res, next) => {
  const bookId = req.params.bookId;
  if (!bookId) throw createError.BadRequest(`book id is missing`);
  const query = {
    text: "SELECT * FROM books WHERE id = $1",
    values: [bookId],
  };
  pool
    .query(query)
    .then((results) => {
      send.json(res, results.rows, 200);
    })
    .catch((err) => next(err));
};

const updateBookById = async (req, res, next) => {
  const id = req.params.bookId;
  const data = req.body;
  if (!data) throw createError.BadRequest(`book details is missing`);
  //(tablename,data to be update,where condition)
  const query = updateDynamicQueryWithValue("books", data, ["id", id]);
  pool
    .query(query)
    .then((results) => {
      send.json(
        res,
        { status: "success", message: "Updated", data: results.rows },
        200
      );
    })
    .catch((err) => next(err));
};

module.exports = { getBooks, getBookById, addBook, deleteBook, updateBookById };
