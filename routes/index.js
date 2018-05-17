const router = new (require('koa-router'))({
    prefix:'/v1'
});
const path = require('path');

//controllers
const controllers = requireAll(path.join(_dirRoot,'libs','controllers'));
const middlewares = requireAll(path.join(_dirRoot,'libs','middlewares'));

router.post('/authenticate',controllers.rooms.authenticate);
router.get('/rooms',middlewares.common.getClient,controllers.rooms.getRooms);
router.post('/rooms',middlewares.common.getClient,controllers.rooms.createRooms);

module.exports = router;

