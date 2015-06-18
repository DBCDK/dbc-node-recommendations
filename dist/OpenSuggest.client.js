'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = OpenSuggestion;

var _es6Promise = require('es6-promise');

var _nodeRestClient = require('node-rest-client');

var client = new _nodeRestClient.Client();

/**
 * Method for getting suggestions
 *
 * @param params
 * @returns {Promise}
 */
function getSuggestions(parameters) {
  return new _es6Promise.Promise(function (resolve, reject) {
    client.methods.getSuggestions({ parameters: parameters }, function (data, response) {
      if (response.statusCode === 200) {
        resolve(data);
      } else {
        reject(response);
      }
    });
  });
}

/**
 * Wrapper function for all the client methods
 *
 * @param endpoint
 * @returns {{getSuggestions: getSuggestions}}
 */
function registerMethods(endpoint) {
  client.registerMethod('getSuggestions', '' + endpoint + '/rest/terms', 'get');
  return {
    getSuggestions: getSuggestions
  };
}

/**
 * Initialises the client and returns the request methods
 *
 * @param endpoint
 * @param config
 * @returns {{getSuggestions}}
 * @constructor
 */

function OpenSuggestion(endpoint) {

  return registerMethods(endpoint);
}

module.exports = exports['default'];