'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Recommendations;

var _es6Promise = require('es6-promise');

var _nodeRestClient = require('node-rest-client');

var _lodash = require('lodash');

var client = new _nodeRestClient.Client();

/**
 * Method for getting recommendations
 *
 * @param params
 * @returns {Promise}
 */
function getRecommendations(profile) {
  if (!(0, _lodash.isArray)(profile)) {
    return _es6Promise.Promise.reject({ statusMessage: 'Parameters should be an array' });
  }
  var parameters = {
    data: JSON.stringify({ like: profile })
  };
  return new _es6Promise.Promise(function (resolve, reject) {
    client.methods.getRecommendations(parameters, function (data, response) {
      if (response.statusCode === 200) {
        resolve(JSON.parse(data));
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
 * @returns {{getRecommendations: getRecommendations}}
 */
function registerMethods(endpoint) {
  client.registerMethod('getRecommendations', endpoint, 'POST');
  return {
    getRecommendations: getRecommendations
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

function Recommendations(endpoint) {

  return registerMethods(endpoint);
}

module.exports = exports['default'];