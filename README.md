# dbc-node-recommendations

[![David](https://img.shields.io/david/DBCDK/dbc-node-recommendations.svg?style=flat-square)](https://david-dm.org/DBCDK/dbc-node-recommendations#info=dependencies)
[![David](https://img.shields.io/david/dev/DBCDK/dbc-node-recommendations.svg?style=flat-square)](https://david-dm.org/DBCDK/dbc-node-recommendations#info=devDependencies)

Client for the DBC Recommendation service

The service returns a list of recommendations for a given profile (a list of manifestations)

## Example
```
import Recommendation from 'dbc-node-recommendation'

// Setup service 
const endpoint = 'http://url.to.service/';
let recommendation = Recommendation(endpoint);

// Parameters is an array of DBC well identifiers
const params = [
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

// Make response
recommendation.getRecommendations(params)
  .then((reponse) => {
    // Everything went well
    console.log(reponse.result);
  })
  .catch((reponse) => {
    // Something went wrong
    console.log(reponse.statusMessage);
  });

};
```

Calls to a method on the client returns a Promise object
