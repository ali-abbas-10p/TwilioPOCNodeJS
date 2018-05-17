const Twilio = require('twilio');

exports.jsonContentType = async (ctx,next)=>{
  ctx.set('content-type','application/json');
  await next();
};

exports.printResponse = async (ctx,next)=>{
    if(ctx.state.data) {
        ctx.status = 200;
        const status = 200;
        const msg = 'success';
        ctx.body = {
            "meta-data":{
                statusCode:status,
                message:msg
            },
            data:ctx.state.data
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