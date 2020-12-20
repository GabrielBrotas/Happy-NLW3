import nodemailer from 'nodemailer' 

const transport = nodemailer.createTransport({
  host: process.env.host,
  port: 2525,
  auth: {
    user: process.env.user,
    pass: process.env.pass
  }
});

export default transport