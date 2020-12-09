const http = require('http');
const Koa = require('koa');
const app = new Koa();

const port = 7070;

const tickets = [
    {},
    {}
];

app.use(async ctx => {
    const { method } = ctx.request.querystring;

    switch (method) {
        case 'allTickets':
            ctx.response.body = tickets;
        case `ticketById&id=${id}`:
            ctx.response.body = tickets[id];
        case 'createTicket':
            ctx.response.body = 'Тикет создан';
            tickets.push()
        default:
            ctx.response.status = 404;
            return;
    }
});

const server = http.createServer(app.callback()).listen(7070);

