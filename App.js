const dbConnect = require("./db/dbConnect");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose=require("mongoose");
app.use(express.json());
app.use(cors);
const bcrypt=require("bcryptjs");
const res = require("express/lib/response");
const User = require("./db/userModel");

const JWT_SECRET= ("jsonwebtoken");

app.post("/register", (request, response) => {
    bcrypt
      .hash(request.body.password, 10)
      .then((hashedPassword) => {
        const user = new User({
          name: request.body.name,
          surname: request.body.surname,
          village: request.body.village,
          phoneNo: request.body.phoneNo,
          email: request.body.email,
          password: hashedPassword,
        });

        user
          .save()
          .then((result) => {
            response.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          .catch((error) => {
            response.status(500).send({
              message: "Error creating user",
              error,
            });
          });
      })
      .catch((e) => {
        response.status(500).send({
          message: "Password was not hashed successfully",
          e,
        });
      });
  });


  // login endpoint
app.post("/login", (request, response) => {
    User.findOne({ email: request.body.email })
  
   
      .then((user) => {

        bcrypt
          .compare(request.body.password, user.password)
  
          .then((passwordCheck) => {

            if(!passwordCheck) {
              return response.status(400).send({
                message: "Passwords does not match",
                error,
              });
            }

            const token = jwt.sign(
              {
                userId: user._id,
                userEmail: user.email,
              },
              "RANDOM-TOKEN",
              { expiresIn: "24h" }
            );
            response.status(200).send({
              message: "Login Successful",
              email: user.email,
              token,
            });
          })
          .catch((error) => {
            response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          });
      })
      .catch((e) => {
        response.status(404).send({
          message: "Email not found",
          e,
        });
      });
  });
  
app.listen(5000, () => {
    console.log("Server Started");
});

