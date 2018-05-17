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
    const rooms = await client.video.rooms.list();
    ctx.state.data = rooms;
    await next();
};

exports.createRooms = async(ctx,next)=>{
    const client = ctx.state.client;
    const room = await client.video.rooms.create({uniqueName:ctx.request.body.uniqueName});
    ctx.state.data = room;
    await next();
};