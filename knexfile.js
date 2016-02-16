require('dotenv').load();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/plf'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true',
    port: 5432,
    user: 'oarvjbkyuhobmg',
    password: 'uzEYEcmew_fRg0XEiNPK9x12EJ'
  }

};
