const userServices = require('../services/users');
const bcrypt = require('bcryptjs');

const expressValidator = {
  // eslint-disable-next-line valid-jsdoc
  /**
   * @param {boolean} shouldExist
   * @returns {import('express-validator').CustomValidator}
   */
  emailShouldExist: (shouldExist) => async (value, {req}) => {
    const user = await userServices.findUserByEmail(value);
    if (shouldExist && !user) {
      throw new Error('Email not found');
    } else if (!shouldExist && user) {
      throw new Error('Email exists');
    }
    req.user = user;
    return true;
  },
  // eslint-disable-next-line valid-jsdoc
  /** @type {import('express-validator').CustomValidator} */
  passwordMatchesHash: async (value, {req}) => {
    // req.user is attached in emailShouldExist middleware
    const matched = bcrypt.compare(value, req.user.password);
    if (!matched) {
      throw new Error('Incorrect password');
    }
  },
  // eslint-disable-next-line valid-jsdoc
  /** @type {import('express-validator').CustomValidator} */
  matches: (value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Passwords don\'t match');
    }
    return true;
  },
};

module.exports = {
  expressValidator,
};