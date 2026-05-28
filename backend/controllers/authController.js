const db =
  require("../config/db");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");


// REGISTER
exports.register =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password
      } = req.body;

      // Check existing user
      const checkUser =
        "SELECT * FROM users WHERE email = ?";

      db.query(
        checkUser,
        [email],
        async (err, result) => {

          if (err) {

            return res.status(500)
              .json(err);
          }

          if (
            result.length > 0
          ) {

            return res.status(400)
              .json({
                message:
                  "Email already exists"
              });
          }

          // Hash password
          const salt =
            await bcrypt.genSalt(10);

          const hashedPassword =
            await bcrypt.hash(
              password,
              salt
            );

          // Insert user
          const sql =
            `
            INSERT INTO users
            (name, email, password)
            VALUES (?, ?, ?)
            `;

          db.query(
            sql,
            [
              name,
              email,
              hashedPassword
            ],

            (err, result) => {

              if (err) {

                return res.status(500)
                  .json(err);
              }

              res.status(201)
                .json({
                  message:
                    "User registered successfully"
                });

            }
          );

        }
      );

    }

    catch (error) {

      res.status(500)
        .json(error);
    }

};


// LOGIN
exports.login =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      // Check email
      const sql =
        "SELECT * FROM users WHERE email = ?";

      db.query(

        sql,

        [email],

        async (err, result) => {

          if (err) {

            console.log(err);

            return res.status(500)
              .json({
                message:
                  "Database error"
              });
          }

          // User not found
          if (
            result.length === 0
          ) {

            return res.status(400)
              .json({
                message:
                  "Invalid email or password"
              });
          }

          const user =
            result[0];

          // Compare password
          const isMatch =
            await bcrypt.compare(

              password,

              user.password
            );

          if (!isMatch) {

            return res.status(400)
              .json({
                message:
                  "Invalid email or password"
              });
          }

          // Create token
          const token =
            jwt.sign(

              {
                id: user.id
              },

              process.env.JWT_SECRET,

              {
                expiresIn: "7d"
              }
            );

          // Success
          res.status(200)
            .json({

              token,

              user: {

                id: user.id,

                name: user.name,

                email: user.email
              }
            });

        }
      );

    }

    catch (error) {

      console.log(error);

      res.status(500)
        .json({
          message:
            "Server Error"
        });
    }
};

