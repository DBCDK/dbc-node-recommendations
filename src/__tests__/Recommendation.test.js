'use strict';

import Recommendations from '../Recommendation.client.js';
import {expect} from 'chai';

describe('Test method getRecommendations', () => {

  it('gives results with a working client', (done) => {
    let endpoint = 'http://xp-p01:8017/recommend';
    let client = Recommendations(endpoint);

    const likes = [
      '870970-basis:44582937',
      '870970-basis:42307963',
      '870970-basis:26488303',
      '870970-basis:29008736',
      '870970-basis:25801253',
      '870970-basis:25490487',
      '870970-basis:43266403',
      '870970-basis:40456775',
      '870970-basis:25254996',
      '870970-basis:20414642',
      '870970-basis:27088988',
      '870970-basis:23202182',
      '870970-basis:43847546',
      '870970-basis:44777010'
    ];
    client.getRecommendations({likes: likes, dislikes: []})
      .then((response) => {
        expect(response.result.length).to.equal(100);
        expect(response.result[0][0]).to.equal('870970-basis:27175953');
        done();
      });
  });

  it('catches failing client', (done) => {
    let endpoint = 'http://xp-p01:8017/not.valid/';
    let client = Recommendations(endpoint);
    const params = {likes: [], dislikes: []};
    client.getRecommendations(params)
      .catch((response) => {
        expect(response.statusMessage).to.equal('Not Found');
        done();
      });
  });

  it('catch wrong parameters - likes is not an array', (done) => {
    let endpoint = 'http://xp-p01:8017/recommend';
    let client = Recommendations(endpoint);
    const params = {likes: {}, dislikes: []};
    client.getRecommendations(params)
      .catch((response) => {
        expect(response.statusMessage).to.equal('Parameters \'like\' and \'dislike\' should be arrays. I.e. { like: [], dislike: [] }');
        done();
      });
  });

  it('catch wrong parameters - dislikes is not an array', (done) => {
    let endpoint = 'http://xp-p01:8017/recommend';
    let client = Recommendations(endpoint);
    const params = {likes: [], dislikes: {}};
    client.getRecommendations(params)
      .catch((response) => {
        expect(response.statusMessage).to.equal('Parameters \'like\' and \'dislike\' should be arrays. I.e. { like: [], dislike: [] }');
        done();
      });
  });

  it('catch wrong parameters', (done) => {
    let endpoint = 'http://xp-p01:8017/recommend';
    let client = Recommendations(endpoint);
    const params = 'this should be an object';
    client.getRecommendations(params)
      .catch((response) => {
        expect(response.statusMessage).to.equal('Parameters should be an objet that contains both a like and a dislike parameter. I.e. { like: [], dislike: [] }');
        done();
      });
  });

  it('has no results', (done) => {
    let endpoint = 'http://xp-p01:8017/recommend';
    let client = Recommendations(endpoint);
    const params = {likes: [], dislikes: []};
    client.getRecommendations(params)
      .then((response)=> {
        expect(response.result.length).to.be.equal(0);
        done();
      });
  });
});
