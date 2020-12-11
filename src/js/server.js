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
    ctx.response.set({
        'Access-Control-Allow-Origin': '*',
    })
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
});

const server = http.createServer(app.callback()).listen(8080);

