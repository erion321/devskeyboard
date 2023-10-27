const db = require("../db/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

//Register a user
const getPosts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts WHERE user_id != $1", [
      req.body,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
  }
};

//Login a user
const createPost = async (req, res) => {
  const token = req.body.token;
  const decoded = jwt_decode(token);

  const result = await db.query(
    "INSERT INTO posts (user_id, content, isOpen) values($1, $2, $3) returning *",
    [decoded.id, req.body.content, false]
  );

  res.status(200).json(result);
};

const createReply = async (req, res) => {
  const result = await db.query(
    "UPDATE posts SET replies = array_append(replies,'new item') WHERE post_id = $1",
    [req.params.id]
  );
  res.send(result);
};

const openPost = async (req, res) => {
  const result = await db.query(
    "UPDATE posts SET isOpen = true WHERE post_id = $1 returning *",
    [req.params.id]
  );
  res.json(result.rows);
};

const closePost = async (req, res) => {
  const result = await db.query(
    "UPDATE posts SET isOpen = false WHERE post_id = $1 returning *",
    [req.params.id]
  );
  res.send(result.rows);
};

module.exports = { createPost, getPosts, createReply, openPost, closePost };
