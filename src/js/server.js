const http = require('http');
const koaBody = require('koa-body');
const Koa = require('koa');
const app = new Koa();

const tickets = [
    {
        id: 1,
        name: 'Vova',
        description: 'This is Vova',
        status: true,
        created: '2012.12.13'
    }
];

app.use(koaBody({
    urlencoded: true,
    multipart: true,
}))


app.use(async (ctx, next) => {
    const origin = ctx.request.get('Origin');
    if (!origin) { return await next(); }
  
    const headers = { 'Access-Control-Allow-Origin': '*', };
    if (ctx.request.method !== 'OPTIONS') {
      ctx.response.set({...headers});
      try {
        return await next();
      } catch (e) {
        e.headers = {...e.headers, ...headers};
        throw e;
      }
    }
  
    if (ctx.request.get('Access-Control-Request-Method')) {
      ctx.response.set({
        ...headers,
        'Access-Control-Allow-Methods': 'GET, POST, PUD, DELETE, PATCH',
      });
      if (ctx.request.get('Access-Control-Request-Headers')) {
        ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
      }
      ctx.response.status = 204;
    }
  });

  app.use(async ctx => {
    const { method } = ctx.request.querystring;

    switch (method) {
        case 'allTickets':
            ctx.response.body = tickets;
            ctx.response.status = 200;
            return;
        case `ticketById`:
            const { id } = ctx.request.query;
            ctx.response.body = tickets.find(ticket => ticket.id === id);
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





const port = 7070;
const server = http.createServer(app.callback()).listen(port);

