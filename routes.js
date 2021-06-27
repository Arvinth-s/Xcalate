const routes = require('next-routes')()

console.log('in routes');

routes
    .add('/home/feed','/home/feed')
    .add('/home/news','/home/news')
    .add('/home/predict/:address','/home/predict')
    .add('/home/newpost','/home/newpost');


module.exports = routes;