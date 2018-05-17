const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const SID = 'AC9822ca525a02b450ba9a441565b7a6df';
const API_KEY = 'SKd52341c9be50557de9465aaca14fbe0c';
const SECRET = '7uxVfwGVi9hmo7nZiOfpIydaD0fIyGqU';

exports.authenticate = async (ctx, next) => {
    const token = new AccessToken(SID,API_KEY,SECRET);
    token.identity = ctx.request.body.identity;
    token.addGrant(new VideoGrant());
    ctx.state.data = {token:token.toJwt()};
    await next();
};


exports.getRooms = async (ctx, next) => {
    const client = ctx.state.client;
    ctx.state.data = await client.video.rooms.list();
    await next();
};

exports.createRooms = async(ctx,next)=>{
    const client = ctx.state.client;
    try {
        ctx.state.data = await client.video.rooms.create({uniqueName: ctx.request.body.uniqueName});
    }
    catch (err){
        ctx.state.status = err.status;
        ctx.state.message = err.message;
        ctx.state.data = {};
    }
    await next();
};