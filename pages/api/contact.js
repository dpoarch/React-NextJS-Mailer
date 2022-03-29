import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';


export default async (req, res) => {
  const { name, email, message, phone } = req.body;

  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  }));

    var mailOptions = {
      from: email,
      to: email,
      subject: `Contact form submission from ${name}`,
      html: `<p>You have a new contact form submission</p><br>
      <p><strong>Name: </strong> ${name} </p><br>
      <p><strong>Phone: </strong> ${phone} </p><br>
      <p><strong>Message: </strong> ${message} </p><br>`
    };


    const emailRes = await transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
      }else{
        console.log('Email sent: ' + info.response);
      }
    });

    console.log('Message Sent');


  res.status(200).json(req.body);
};
