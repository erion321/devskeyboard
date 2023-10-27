const db = require("../db/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register a user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //hash password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(password, salt);

    const result = await db.query(
      "INSERT INTO users(name, email, password)  values($1 ,$2 , $3) returning *",
      [name, email, hashedPass]
    );
    res.status(200).json({
      user: result.rows[0],
      token: generateToken(result.rows[0].user_id),
    });
  } catch (error) {
    res.send(error.detail);
    console.log(error);
  }
};

//Login a user
const loginUser = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 LIMIT 1",
      [req.body.email]
    );

    if (!result.rows[0]) {
      return res.send("User does not exist");
    }

    //res.send({ pass: req.body.password, hashpass: result.password });

    //check password
    if (!bcrypt.compareSync(req.body.password, result.rows[0].password)) {
      return res.send("Incorrect passowrd");
    }

    res.status(200).json({
      user: result.rows[0],
      token: generateToken(result.rows[0].user_id),
    });
  } catch (error) {
    console.log(error);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { loginUser, registerUser };
