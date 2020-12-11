const http = require('http');
const koaBody = require('koa-body');
const Koa = require('koa');
const app = new Koa();

const tickets = [
    {},
    {}
];

app.use(koaBody({
    urlencoded: true,
    multipart: true,
}))

app.use(async ctx => {

    const origin = ctx.request.get('Origin');
    if (!origin) {
        return await next();
    }

    const headers = { 'Access-Control-Allow-Origin': '*', };

    if (ctx.request.method !=='OPTIONS') {
        ctx.response.set({ ...headers} );
        try {
            const { method } = ctx.request.querystring;

    switch (method) {
        case 'allTickets':
            ctx.response.body = tickets;
            return;
        case `ticketById`:
            const { id } = ctx.request.query;
            ctx.response.body = tickets[id];
            return;
        case 'createTicket':
            ctx.response.body = 'Тикет создан';
            console.log(ctx.request.query);
            ctx.response.status = 200;
        default:
            ctx.response.status = 404;
            return;
    }
        } catch (e) {
            e.headers = {...e.headers, ...headers };
            throw e; 
        }
    }

    if (ctx.request.get('Access-Control-Request-Method')) {
        ctx.response.set({ ...headers, 'Access-Control-Allow-Methods': 'GET, POST' });
        if (ctx.request.get('Access-Control-Request-Headers')) {
            ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
        }
    }

});
const port = process.env.PORT||7070;
const server = http.createServer(app.callback()).listen(port);

