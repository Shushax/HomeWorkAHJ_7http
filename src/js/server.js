/* eslint consistent-return:0 */ // --> OFF
/* eslint no-return-await:0 */ // --> OFF
/* eslint no-case-declarations:0 */ // --> OFF
/* eslint no-unused-vars:0 */ // --> OFF

const

const http = require('http');
const koaBody = require('koa-body');
const Koa = require('koa');

const app = new Koa();
const uuid = require('uuid');
const moment = require('moment');

const tickets = [
  {
    id: 15678,
    name: 'Vova',
    description: 'This is Vova',
    status: true,
    created: moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
];

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) { return await next(); }

  const headers = { 'Access-Control-Allow-Origin': '*' };
  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
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

app.use(async (ctx) => {
  const { method } = ctx.request;

  switch (method) {
    case 'GET':
      const methodParam = ctx.request.query.method;
      if (methodParam === 'allTickets') {
        ctx.response.body = tickets;
        ctx.response.status = 200;
        return;
      } if (methodParam === 'ticketById') {
        const { id } = ctx.request.query;
        ctx.response.body = tickets.find((ticket) => ticket.id === id);
        return;
      }
      return;
    case 'POST':
      const postParams = ctx.request.body;
      ctx.response.body = 'Тикет создан';
      tickets.push({
        id: uuid.v4(),
        name: postParams.name,
        description: postParams.description,
        status: false,
        created: moment().format('MMMM Do YYYY, h:mm:ss a'),
      });
      ctx.response.status = 200;
      return;
    default:
      ctx.response.status = 200;
  }
});

const port = process.env.PORT || 8080;
const server = http.createServer(app.callback()).listen(port);
