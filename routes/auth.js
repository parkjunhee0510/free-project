const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();
var appDir = path.dirname(require.main.filename);

router.post("/mail", async (req, res) => {
  let authNum = Math.random().toString().substr(2, 6);
  let emailTemplete;
  ejs.renderFile(
    appDir + "/views/test.ejs",
    { authCode: authNum },
    (err, data) => {
      if (err) {
        console.log(err);
      }
      emailTemplete = data;
    }
  );

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: "8080",
    secure: false,
    auth: {
      user: "junhee430628@gmail.com",
      pass: "Wns430628@@",
    },
  });

  let mailObject = await transporter.sendMail({
    from: "test",
    to: req.body.mail,
    subject: "회원가입을 위한 이메일을 입력해주세요.",
    html: emailTemplete,
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log("확인완료 : " + info.response);
    res.send(authNum);
    transporter.close();
  });
});

module.exports = router;
