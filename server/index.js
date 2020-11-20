const AirtableGraphQL = require('airtable-graphql');
const constants = require('./constants');
const templates = require('./templates');
const axios = require('axios').default;
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
api = new AirtableGraphQL('key1E9cyPLu4piroN');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const aws = require('aws-sdk');
aws.config.loadFromPath('./config.json');
const ses = new aws.SES();

// Sending RAW email including an attachment.
// app.get('/send', function (req, res) {
//   const email = 'jesus9528@gmail.com';
//   const ses_mail = templates.ses_mail;

//   const params = {
//     RawMessage: { Data: new Buffer(ses_mail) },
//     Destinations: [email],
//     Source: "'Resonant Marketplace' <" + email + ">'",
//   };

//   ses.sendRawEmail(params, function (err, data) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(data);
//     }
//   });
// });

app.get('/pictures', cors(), (req, res) => {
  axios
    .get(
      'https://api.airtable.com/v0/appzeUDpZOqRjLPaJ/tblk386O2A5yPd04l?fields%5B%5D=Name&fields%5B%5D=Picture',
      {
        headers: { Authorization: 'Bearer ' + constants.AIRTABLE_API_TOKEN },
      }
    )
    .then(function (response) {
      // handle success
      if (response.data.records.length > 0) {
        res.send(response.data);
      } else {
        res.send([]);
      }
    });
});

app.post('/info', cors(), (req, res) => {
  //find matching username
  axios
    .get(constants.GET_PRODUCT_URL.replace('$PARAMA', req.body.product), {
      headers: { Authorization: 'Bearer ' + constants.AIRTABLE_API_TOKEN },
    })
    .then(async function (response) {
      // handle success
      let designer;
      if (response.data.fields.Designer) {
        await axios
          .get(
            constants.GET_DESIGNER_URL.replace(
              '$PARAMA',
              response.data.fields.Designer
            ),
            {
              headers: {
                Authorization: 'Bearer ' + constants.AIRTABLE_API_TOKEN,
              },
            }
          )
          .then(function (response) {
            designer = response.data.fields;
          });
      }

      //format email
      const email = 'jesus9528@gmail.com';
      let ses_mail = '' + templates.PRODUCT_INFO;
      ses_mail = ses_mail.replace('$productName.', response.data.fields.Name);
      ses_mail = ses_mail.replace('$productName.', response.data.fields.Name);
      ses_mail = ses_mail.replace('$productName.', response.data.fields.Name);
      ses_mail = ses_mail.replace('$productType.', response.data.fields.Type);
      ses_mail = ses_mail.replace(
        '$productDimensions.',
        response.data.fields['Size (WxLxH)']
      );
      ses_mail = ses_mail.replace(
        '$productMaterials.',
        response.data.fields['Materials and Finishes']
      );
      ses_mail = ses_mail.replace(
        '$productCost.',
        response.data.fields['Unit Cost']
      );
      ses_mail = ses_mail.replace('$productDimensions.', 'visu chair');
      ses_mail = ses_mail.replace('$email', email);
      ses_mail = ses_mail.replace('$email', email);

      if (designer) {
        let designerDetails = templates.DESIGNER_INFO.replace(
          '$designerName',
          designer.Name
        );
        designerDetails = designerDetails.replace(
          '$designerBackground',
          designer.Background
        );
        ses_mail = ses_mail.split('$Designer').join(designerDetails);
        // console.log(ses_mail);
      } else {
        ses_mail = ses_mail.split('$Designer').join('');
        // console.log('no designer ' + ses_mail);
      }

      // send;
      var params = {
        RawMessage: { Data: new Buffer(ses_mail) },
        Destinations: [email],
        Source: "'Resonant Marketplace' <" + email + ">'",
      };
      // console.log(ses_mail);
      ses.sendRawEmail(params, function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

app.post('/login', cors(), (req, res) => {
  //find mathing username
  axios
    .get(
      constants.FIND_USER_URL.replace(
        '$PARAMA',
        "'" + req.body.username + "'"
      ).replace('$PARAMB', "'" + req.body.username + "'"),
      {
        headers: { Authorization: 'Bearer ' + constants.AIRTABLE_API_TOKEN },
      }
    )
    .then(function (response) {
      // handle success
      let foundUser = false;
      if (response.data.records > 0) {
        foundUser = response.data.records.sort(function (a, b) {
          return new Date(b.createdTime) - new Date(a.createdTime);
        })[0];
        console.log('found one');
      }

      if (foundUser) {
        //   get user data
        const success = false;
        axios
          .get(constants.GET_USER_URL + foundUser.id, {
            headers: {
              Authorization: 'Bearer ' + constants.AIRTABLE_API_TOKEN,
            },
          })
          .then(function (response) {
            // handle success
            console.log(response.data.fields);
            console.log(req.body.password, response.data.fields.Password);
            success = comparePassword(
              req.body.password,
              response.data.fields.Password
            );
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
            if (success) {
              res.send('Login successful');
            } else {
              res.send('Login failed');
            }
          });
      } else {
        res.send('Login failed');
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

app.post('/register', cors(), (req, res) => {
  console.log(req.body.username);
  //find mathing user
  axios
    .get(
      constants.FIND_USER_URL.replace(
        '$PARAMA',
        "'" + req.body.username + "'"
      ).replace('$PARAMB', "'" + req.body.username + "'"),
      {
        headers: { Authorization: 'Bearer ' + constants.AIRTABLE_API_TOKEN },
      }
    )
    .then(function (response) {
      // handle success

      if (response.data.records.length > 0) {
        res.send('username or email arleady in use');
        console.log('en uso');
      } else {
        let fields = req.body;

        const config = {
          headers: {
            Authorization: 'Bearer ' + constants.AIRTABLE_API_TOKEN,
            'Content-Type': 'application/json',
          },
        };

        axios
          .post(
            constants.GET_USER_URL,
            JSON.stringify({
              records: [
                {
                  fields: {
                    Password: encryptPassword(fields.password),
                    'First Name': fields.firstName,
                    'Last Name': fields.lastName,
                    email: fields.email,
                    username: fields.username,
                  },
                },
              ],
            }),
            config
          )
          .then((result) => {
            // Do somthing
            console.log(result);
          })
          .catch((err) => {
            // Do somthing
            console.log(err);
          });
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

app.listen(constants.PORT_REST, () => {
  console.log(
    `Server app listening at http://localhost:${constants.PORT_REST}`
  );
});

api.listen(constants.PORT_GRAPHQL);

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log(hash);
  return hash;
}
async function comparePassword(password, password2) {
  // updated
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  // ​
  const isSame = await bcrypt.compare(password2, hash); // updated
  console.log(isSame); // updated
  return isSame;
}
