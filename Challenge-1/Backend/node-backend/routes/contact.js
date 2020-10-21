const express = require('express');
const router = express.Router();

router
  .route('/')
  .post(function(req, res){
    var body = [];
    body.push(`First Name: ${req.body.firstname}`);
    body.push(`Last Name: ${req.body.lastname}`);
    body.push(`Email: ${req.body.email}`);
    body.push(`Phone: ${req.body.phone}`);
    body.push(`Company: ${req.body.job_title}`);
    body.push(`Job Title: ${req.body.company}`);
    body.push(`Address 1: ${req.body.address1}`);
    body.push(`Address 2: ${req.body.address2}`);
    body.push(`City: ${req.body.city}`);
    body.push(`State: ${req.body.state}`);
    body.push(`Zip Code: ${req.body.zip_code}`);
    body.push(`Subject: ${req.body.title}`);
    body.push(`Message: ${req.body.message}`);


    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SMTP_PASSWORD);
    const msg = {
      to: process.env.TO_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: 'New Contact Email',
      text: body.join("\n\r"),
      html: body.join("<br>"),
    };
    sgMail.send(msg);


    res.status(200).json({success: true});
  });

module.exports = router;
