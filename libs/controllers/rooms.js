exports.authenticate = async (ctx, next) => {
    ctx.state.data = {};
    await next();
};