// const nodemailer = require('nodemailer')
import nodemailer from "nodemailer"

export const sendEmail =  async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user:`mohamedmasood0075@gmail.com`,
        pass:`auhcmvijozhaajmx`
      }
    })

    await transporter.sendMail({
      from:`mohamedmasood0075@gmail.com`,
      to: email,
      subject: subject,
      text: text
    }).then(()=>{
      console.log('email sent successfully')
    })
  } catch (error) {
    console.log('email not sent')
  }
}