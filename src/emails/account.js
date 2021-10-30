const sgMail = require("@sendgrid/mail");

const api_key = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(api_key);

const sendWelcomeEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: "rohinbhat123@gmail.com",
      subject: "Welcome to Task Manager",
      text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.log(error.response.body);
    });
};

const sendCancelationEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: "rohinbhat123@gmail.com",
      subject: "Sorry to see you go",
      text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.log(error.response.body);
    });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
