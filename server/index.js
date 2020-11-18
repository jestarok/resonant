const AirtableGraphQL = require('airtable-graphql');
const constants = require('./constants');
const axios = require('axios').default;
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

api = new AirtableGraphQL('airtable_api_key');
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));

console.log(
  constants.FIND_USER_URL.replace('$PARAMA', "'TEST'").replace(
    '$PARAMB',
    "'TESTB'"
  )
);

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

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`);
});

api.listen();

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
