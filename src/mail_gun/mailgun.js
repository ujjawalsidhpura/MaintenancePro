const API_KEY = process.env.REACT_APP_MAILGUN_API_KEY
const DOMAIN = process.env.REACT_APP_MAILGUN_DOMAIN
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

export default function SendMail(message) {

  mailgun.messages().send(message, (error, body) => {
    if (error) console.log(error.message)
    console.log(body);

  });
}

