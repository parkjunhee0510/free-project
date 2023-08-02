import nodemailer from "nodemailer";

export const smtpTransport = (nodemailer.createTransport = {
  pool: true,
  maxConnections: 1,
  service: "naver",
  host: "smtp.naver.com",
  post: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "junhee5143@naver.com",
    pass: "qkrwnsgml0510@@",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
