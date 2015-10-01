'use strict';

import {Promise} from 'es6-promise';
import {Client} from 'node-rest-client';
import {isPlainObject, isUndefined, isArray} from 'lodash';
const client = new Client();

/**
 * Method for getting recommendations
 *
 * @param {Object} params
 * @returns {Promise}
 */
function getRecommendations(params) {
  if (!isPlainObject(params) || isUndefined(params.likes) || isUndefined(params.dislikes)) {
    return Promise.reject({statusMessage: 'Parameters should be an objet that contains both a like and a dislike parameter. I.e. { like: [], dislike: [] }'});
  }

  if (!isArray(params.likes) || !isArray(params.dislikes)) {
    return Promise.reject({statusMessage: 'Parameters \'like\' and \'dislike\' should be arrays. I.e. { like: [], dislike: [] }'});
  }

  var parameters = {
    data: JSON.stringify({like: params.likes, dislike: params.dislikes})
  };
  return new Promise((resolve, reject) => {
    client.methods.getRecommendations(parameters, (data, response) => {
      if (response.statusCode === 200) {
        resolve(JSON.parse(data));
      }
      else {
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
