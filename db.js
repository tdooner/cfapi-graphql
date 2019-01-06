/*
 * Models and stuff
 */
const { Sequelize } = require('sequelize');

const db = new Sequelize('cfapi-graphql', null, null, {
  dialect: 'sqlite',
  storage: 'cfapi-graphql.sqlite3',
});

const User = db.define('user', {
  // TODO: Store non-primary email addresses in here too!
  email: { type: Sequelize.STRING },
  github_access_token: { type: Sequelize.STRING },
  github_access_token_timestamp: { type: Sequelize.DATE },
}, {
  underscored: true,
  indexes: [
    { unique: true, fields: ['email'] },
  ],
});

const Session = db.define('session', {
  uuid: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
}, {
  underscored: true,
  indexes: [
    { unique: true, fields: ['uuid'] },
  ],
});

const Brigade = db.define('brigade', {
  slug: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },

  city: { type: Sequelize.STRING },
  state: { type: Sequelize.STRING },
  region: { type: Sequelize.STRING },
  latitude: { type: Sequelize.DECIMAL(10, 2) },
  longitude: { type: Sequelize.DECIMAL(10, 2) },

  tags: { type: Sequelize.JSON },
  links: { type: Sequelize.JSON },
  last_updated: { type: Sequelize.DATE },
}, {
  underscored: true,
  indexes: [
    { unique: true, fields: ['slug'] },
  ],
});

module.exports = {
  db,
  User,
  Brigade,
  Session,
};
