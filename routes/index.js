const router = new (require('koa-router'))({
    prefix:'/v1'
});
const path = require('path');

//controllers
const controllers = requireAll(path.join(_dirRoot,'libs','controllers'));

router.post('/authenticate',controllers.rooms.authenticate);

module.exports = router;

