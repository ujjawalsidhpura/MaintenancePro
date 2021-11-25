const API_KEY = '411db4214a38bdae64ff6adc5099dec8-7dcc6512-0e3a2314'
const DOMAIN = 'sandbox822d5bc82a394414b4cf3a42d4d0f4f1.mailgun.org'

console.log('API====', API_KEY)
console.log('Domain===', DOMAIN)

const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

const data = {
  from: 'Admin <admin@maintenancePro.com>',
  to: 'ujjawalsidhpura@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};

mailgun.messages().send(data, (error, body) => {
  if (error) console.log(error.message)
  console.log(body);
});

