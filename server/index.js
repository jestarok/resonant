const constants = require('./constants');
const templates = require('./templates');
const axios = require('axios').default;
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const AirtableGraphQL = require('airtable-graphql');
api = new AirtableGraphQL(constants.AIRTABLE_API_TOKEN);

const aws = require('aws-sdk');
aws.config.loadFromPath('./config.json');
const ses = new aws.SES();

app.get('/pictures', cors(), (req, res) => {
  axios
    .get(constants.GET_PICTURES_URL, {
      headers: { Authorization: 'Bearer ' + constants.AIRTABLE_API_TOKEN },
    })
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
  axios
    .get(constants.GET_PRODUCT_URL.replace('$PARAMA', req.body.product), {
      headers: { Authorization: 'Bearer ' + constants.AIRTABLE_API_TOKEN },
    })
    .then(async function (response) {
      // handle success
      const { fields } = response.data;
      let designer;
      if (fields.Designer) {
        await axios
          .get(constants.GET_DESIGNER_URL.replace('$PARAMA', fields.Designer), {
            headers: {
              Authorization: 'Bearer ' + constants.AIRTABLE_API_TOKEN,
            },
          })
          .then(function (response) {
            designer = response.data.fields;
          });
      }

      //format email
      const email = 'jesus9528@gmail.com';
      let ses_mail = '' + templates.PRODUCT_INFO;
      ses_mail = ses_mail.replace('$productName.', fields.Name);
      ses_mail = ses_mail.replace('$productName.', fields.Name);
      ses_mail = ses_mail.replace('$productName.', fields.Name);
      ses_mail = ses_mail.replace('$productType.', fields.Type);
      ses_mail = ses_mail.replace(
        '$productDimensions.',
        fields['Size (WxLxH)']
      );
      ses_mail = ses_mail.replace(
        '$productMaterials.',
        fields['Materials and Finishes']
      );
      ses_mail = ses_mail.replace('$productCost.', fields['Unit Cost']);
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
      } else {
        ses_mail = ses_mail.split('$Designer').join('');
      }

      var params = {
        RawMessage: { Data: new Buffer(ses_mail) },
        Destinations: [email],
        Source: "'Resonant Marketplace' <" + email + ">'",
      };
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
    });
});

app.post('/login', cors(), (req, res) => {
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
      const { records } = response.data;
      let foundUser = false;
      if (records.length > 0) {
        foundUser = records.sort(function (a, b) {
          return new Date(b.createdTime) - new Date(a.createdTime);
        })[0];
      }

      if (foundUser) {
        //   get user data
        let success = false;
        let username = '';
        axios
          .get(constants.GET_USER_URL + foundUser.id, {
            headers: {
              Authorization: 'Bearer ' + constants.AIRTABLE_API_TOKEN,
            },
          })
          .then(async function (response) {
            // handle success
            const { fields } = response.data;
            username = fields.username;
            if (req.body.encrypted == 'true') {
              success = await comparePassword(
                req.body.password,
                fields.Password
              );
            } else {
              success = req.body.password == fields.Password;
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
            if (success) {
              res.send({
                message: 'Login successful',
                user: username,
                success: true,
                value: uuidv4(),
              });
            } else {
              res.send({
                message: 'Login failed',
                success: false,
              });
            }
          });
      } else {
        res.send({ message: 'Login failed', success: false });
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.post('/register', cors(), (req, res) => {
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
    .then(async function (response) {
      // handle success
      if (response.data.records.length > 0) {
        res.send('username or email arleady in use');
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
                    Password: await encryptPassword(fields.password),
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
            let success = result.data.records.length > 0 ? true : false;
            if (success) {
              res.send({
                message: 'Login successful',
                user: result.data.records[0].fields.username,
                success: true,
                value: uuidv4(),
              });
            } else {
              res.send({
                message: 'Login failed',
                success: false,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
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
  return hash;
}
async function comparePassword(password, password2) {
  const isSame = await bcrypt.compare(password, password2);
  return isSame;
}
