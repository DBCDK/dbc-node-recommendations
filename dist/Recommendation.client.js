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
 * @param {Object} params
 * @returns {Promise}
 */
function getRecommendations(params) {
  if (!(0, _lodash.isPlainObject)(params) || (0, _lodash.isUndefined)(params.likes) || (0, _lodash.isUndefined)(params.dislikes)) {
    return _es6Promise.Promise.reject({ statusMessage: 'Parameters should be an objet that contains both a like and a dislike parameter. I.e. { like: [], dislike: [] }' });
  }

  if (!(0, _lodash.isArray)(params.likes) || !(0, _lodash.isArray)(params.dislikes)) {
    return _es6Promise.Promise.reject({ statusMessage: 'Parameters \'like\' and \'dislike\' should be arrays. I.e. { like: [], dislike: [] }' });
  }

  var parameters = {
    data: JSON.stringify({ like: params.likes, dislike: params.dislikes })
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