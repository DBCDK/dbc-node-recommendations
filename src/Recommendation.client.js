'use strict';

import request from 'request';
import {curry, isPlainObject, isUndefined, isArray} from 'lodash';

/**
 * Method for getting recommendations
 *
 * @param {String} endpoint
 * @param {Array} filters
 * @param {Object} params
 * @returns {Promise}
 */
function getRecommendations(endpoint, filters, params) {
  if (!isPlainObject(params) || isUndefined(params.likes) || isUndefined(params.dislikes)) {
    return Promise.reject({statusMessage: 'Parameters should be an objet that contains both a like and a dislike parameter. I.e. { like: [], dislike: [] }'});
  }

  if (!isArray(params.likes) || !isArray(params.dislikes)) {
    return Promise.reject({statusMessage: 'Parameters \'like\' and \'dislike\' should be arrays. I.e. { like: [], dislike: [] }'});
  }

  var parameters = JSON.stringify({like: params.likes, dislike: params.dislikes, filter: filters, maxresults: 100});
  console.error(parameters);

  return new Promise((resolve, reject) => {
    request.post({
      url: endpoint,
      body: parameters
    }, (err, response) => {
      if (err) {
        return reject(err);
      }
      if (response.statusCode !== 200) {
        return reject(response);
      }
      return resolve(JSON.parse(response.body));
    });
  });
}

/**
 * Initialises the client and returns the request methods
 *
 * @param {String} endpoint
 * @param {Array} filters
 * @returns {{getRecommendations}}
 * @constructor
 */
export default function Recommendations(endpoint, filters) {
  console.error(filters);
  return {
    getRecommendations: curry(getRecommendations)(endpoint, filters)
  };
}
