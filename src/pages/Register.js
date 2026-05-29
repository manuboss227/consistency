import React, {
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import { toast }
from "react-toastify";

import API
from "../services/api";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword
  ] = useState("");

  const handleRegister =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await API.post(

            "https://consistency-4.onrender.com/api/auth/register",

            {
              name,
              email,
              password
            }
          );

        toast.success(

          res.data.message ||

          "Account created successfully 🚀"
        );

        // Redirect to login
        setTimeout(() => {

          window.location.href =
            "/login";

        }, 1500);

      }

      catch (error) {

        console.log(error);

        toast.error(

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
        onSubmit={
          handleRegister
        }

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

          Register

        </h1>

        <p
          style={{
            textAlign:
              "center",

            color: "#6b7280"
          }}
        >

          Create your productivity account 🚀

        </p>

        <input
          type="text"

          placeholder="Full Name"

          value={name}

          onChange={(e) =>
            setName(
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

          Register

        </button>

        <p
          style={{
            marginTop: "20px",

            textAlign:
              "center"
          }}
        >

          Already have an account?

          {" "}

          <Link
            to="/login"

            style={{
              color: "#2563eb",

              textDecoration:
                "none",

              fontWeight:
                "bold"
            }}
          >

            Login

          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;