let port = process.env.PORT || 8000;
let fs = require("fs");
let express = require("express");
let nodemailer = require("nodemailer");
let server = express();
let path = require("path");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fviclass@gmail.com",
    pass: "fviclass2017"
  }
});
//these are important middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/", express.static(path.join(__dirname, "assets")));
///////////
server.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "form.html"));
});

server.post("/", function(req, res) {
  console.log(req.body);
  let emailBody = fs.readFileSync("./index.html");
  let mailOptions = {
    from: req.body.from,
    to: req.body.destination,
    html: emailBody,
    subject: req.body.subject
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err)
      return res.send({
        success: false,
        message: err.message
      });

    res.send({
      success: true,
      message: "Your message was sent succesfully."
    });
  });
});

server.listen(port, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("server listening on port", port);
});
