'use strict';

import {Promise} from 'es6-promise';
import {Client} from 'node-rest-client';
import {isArray} from 'lodash';
let client = new Client();

/**
 * Method for getting recommendations
 *
 * @param params
 * @returns {Promise}
 */
function getRecommendations(profile) {
  if (!isArray(profile)) {
    return Promise.reject({statusMessage: 'Parameters should be an array'});
  }
  var parameters = {
    data: JSON.stringify({like: profile})
  };
  return new Promise((resolve, reject) => {
    client.methods.getRecommendations(parameters, (data, response) => {
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
export default function Recommendations(endpoint) {

  return registerMethods(endpoint);
}
