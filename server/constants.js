module.exports = Object.freeze({
  PORT_REST: 5000,
  PORT_GRAPHQL: 5001,
  GET_USER_URL: 'https://api.airtable.com/v0/appzeUDpZOqRjLPaJ/Users/',
  FIND_USER_URL:
    'https://api.airtable.com/v0/appzeUDpZOqRjLPaJ/tbl22nzKjbBma826N?fields%5B%5D=email&filterByFormula=OR(%7Bemail%7D%3D$PARAMA%2C%7Busername%7D%3D$PARAMB)',
  GET_PRODUCT_URL:
    'https://api.airtable.com/v0/appzeUDpZOqRjLPaJ/Furniture/$PARAMA',
  GET_DESIGNER_URL:
    'https://api.airtable.com/v0/appzeUDpZOqRjLPaJ/Designers/$PARAMA',
  AIRTABLE_API_TOKEN: 'key1E9cyPLu4piroN',
});
