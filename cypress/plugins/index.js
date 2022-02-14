///<reference types="cypress-iframe" />
// cypress/plugins/index.js
/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

require('dotenv').config({ path: `.env` , override: true });
const webpackPreprocessor = require('@cypress/webpack-batteries-included-preprocessor');


module.exports = (on, config) => {

    on('file:preprocessor', webpackPreprocessor({
        typescript: require.resolve('typescript')
    }));

    //Inject SECRETS from .env file to cypress
    config.env.USER_ID = process.env.USER_ID;
    config.env.PASSWORD = process.env.PASSWORD;

    return config;
};
