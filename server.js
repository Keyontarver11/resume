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

//purpose of this is to enable cross domain requests
// Add headers
server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', ['http://142.93.198.70:8000','http://ktarver.techlaunch.io:8000']);
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

server.use("/", express.static(path.join(__dirname, "assets")));
///////////
server.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./assets/form.html"));
});

server.post("/", function(req, res) {
  console.log(req.body);
  let emailBody = fs.readFileSync("./assets/index.html");
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
