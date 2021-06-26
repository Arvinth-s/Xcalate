const routes = require('next-routes')()

routes
    .add('/home/:address/market','/home/market')
    .add('/home/:address/viewPost/:orgAddress/:postId','/home/viewPost')
    .add('/home/:address/viewOrg/:orgAddress','home/viewOrg')
    .add('/home/:address/organization','/home/organization')
    .add('/home/:address/portfolio','/home/portfolio')
    .add('/subscrbibe','/subscribe');
    //add other routes


module.exports = routes;