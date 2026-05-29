const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const db = require("../config/db");


// REGISTER
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(

      sql,

      [name, email, hashedPassword],

      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            message: "Database error"
          });
        }

        res.json({
          message: "User registered successfully"
        });
      }
    );

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// LOGIN
router.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {

    if (err) {

      console.log(err);

      return res.status(500).json({
        message: "Database error"
      });
    }

    if (result.length === 0) {

      return res.status(400).json({
        message: "User not found"
      });
    }

    const user = result[0];

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {

      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(

      {
        id: user.id
      },

      "secretkey",

      {
        expiresIn: "7d"
      }
    );

    res.json({

      token,

      user: {

        id: user.id,

        name: user.name,

        email: user.email
      }
    });

  });
});

module.exports = router;