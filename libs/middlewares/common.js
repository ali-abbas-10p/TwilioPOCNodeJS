const Twilio = require('twilio');

exports.jsonContentType = async (ctx,next)=>{
  ctx.set('content-type','application/json');
  await next();
};

exports.printResponse = async (ctx,next)=>{
    if(ctx.state.data) {
        ctx.status = ctx.state.status?ctx.state.status === 204?200:ctx.state.status:200;
        ctx.body = {
            "meta-data": {
                statusCode: ctx.state.status ? ctx.state.status : 200,
                message: ctx.state.message ? ctx.state.message : 'success'
            },
            data: _.isEmpty(ctx.state.data) ? undefined : ctx.state.data
        };
    }
    else
        await next()
};


exports.getClient = async (ctx ,next)=> {
    const ACCOUNT_SID = 'AC9822ca525a02b450ba9a441565b7a6df';
    const API_KEY_SID = 'SKd52341c9be50557de9465aaca14fbe0c';
    const API_KEY_SECRET = '7uxVfwGVi9hmo7nZiOfpIydaD0fIyGqU';
    ctx.state.client = new Twilio(API_KEY_SID,API_KEY_SECRET,{accountSid:ACCOUNT_SID});
    await next();
};