import React, {
  useState
} from "react";

import axios from "axios";

import {
  Link
} from "react-router-dom";

function Login() {

  const [email,
    setEmail
  ] = useState("");

  const [password,
    setPassword
  ] = useState("");

  const [message,
    setMessage
  ] = useState("");

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await axios.post(

            "http://localhost:5000/api/auth/login",

            {
              email,
              password
            }
          );

        // Save token
        localStorage.setItem(

          "token",

          res.data.token
        );

        // Save user
        localStorage.setItem(

          "currentUser",

          JSON.stringify(
            res.data.user
          )
        );

        setMessage(
          "Login successful 🚀"
        );

        // Redirect
        setTimeout(() => {

          window.location.href =
            "/dashboard";

        }, 1000);

      }

      catch (error) {

        console.log(error);

        setMessage(

          error.response?.data
            ?.message ||

          "Server Error"
        );
      }
    };

  return (

    <div
      style={{
        display: "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        height: "100vh",

        background:
          "#f3f4f6"
      }}
    >

      <form
        onSubmit={handleLogin}

        style={{
          background: "white",

          padding: "40px",

          borderRadius:
            "20px",

          width: "350px",

          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h1
          style={{
            textAlign:
              "center"
          }}
        >

          Login

        </h1>

        <input
          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          required

          style={{
            width: "100%",

            padding: "12px",

            marginTop: "20px",

            borderRadius:
              "10px",

            border:
              "1px solid #ccc"
          }}
        />

        <input
          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          required

          style={{
            width: "100%",

            padding: "12px",

            marginTop: "20px",

            borderRadius:
              "10px",

            border:
              "1px solid #ccc"
          }}
        />

        <button
          type="submit"

          style={{
            width: "100%",

            marginTop: "20px",

            padding: "12px",

            background:
              "#111827",

            color: "white",

            border: "none",

            borderRadius:
              "10px",

            cursor:
              "pointer"
          }}
        >

          Login

        </button>

        {

          message && (

            <p
              style={{
                marginTop:
                  "15px",

                textAlign:
                  "center",

                color:
                  message.includes(
                    "successful"
                  )

                    ? "green"

                    : "red"
              }}
            >

              {message}

            </p>
          )
        }

        <p
          style={{
            marginTop: "20px",

            textAlign:
              "center"
          }}
        >

          Don’t have an account?

          {" "}

          <Link
            to="/register"
          >

            Register

          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;