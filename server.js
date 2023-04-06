/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const Koa = require('koa');
const Router = require('@koa/router');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');

let { tickets } = require('./db');

const Ticket = require('./Ticket').default;

const PORT = 7070;

const app = new Koa();
const router = new Router();

function isExistTicket(name) {
  return tickets.some((ticket) => ticket.name === name);
}

function isNotExistTicket(id) {
  return tickets.findIndex((ticket) => ticket.id === id) < 0;
}

app.use(cors({
  origin: 'http://localhost:9000',
}));
app.use(koaBody({ multipart: true }));
app.use(router.routes());

router
  .get('/tickets', (ctx, next) => {
    ctx.response.body = tickets.map((ticket) => ({
      id: ticket.id,
      name: ticket.name,
      status: ticket.status,
      created: ticket.created,
    }));
    next();
  })
  .get('/tickets/:id', (ctx, next) => {
    console.log(ctx.params.id);
    const findTicket = tickets.find((ticket) => ticket.id === ctx.params.id);
    if (findTicket) {
      ctx.response.body = findTicket;
      ctx.response.status = 200;
    } else {
      ctx.response.status = 404;
    }
    next();
  })
  .post('/tickets/ticket', (ctx, next) => {
    const { name, description } = ctx.request.body;

    if (isExistTicket(name)) {
      ctx.response.body = 'Ticket exist';
      ctx.response.status = 409;
    } else {
      const ticket = new Ticket(name, description);
      tickets.push(ticket);
      ctx.response.body = ticket;
    }
    next();
  })
  .put('/tickets/:id', (ctx, next) => {
    const { id } = ctx.params;
    if (isNotExistTicket(id)) {
      ctx.response.body = 'Ticket is not exist';
      ctx.response.status = 404;
      next();
    }

    const { name, description, status } = ctx.request.body;

    const findedTicket = tickets.find((ticket) => ticket.id === id);
    if (name) {
      findedTicket.name = name;
    }
    if (description) {
      findedTicket.description = description;
    }
    if (status !== findedTicket.status) {
      findedTicket.status = status;
    }

    ctx.response.body = findedTicket;
    ctx.response.status = 200;
    next();
  })
  .delete('/tickets/:id', (ctx, next) => {
    const { id } = ctx.params;
    if (isNotExistTicket(id)) {
      ctx.response.body = 'Ticket is not exist';
      ctx.response.status = 404;
      next();
    }

    tickets = tickets.filter((ticket) => ticket.id !== id);
    ctx.response.body = 'Ticket is deleted';
    ctx.response.status = 200;
    next();
  });

app.on('error', (err) => {
  console.log('server error', err);
});

app.listen(PORT);
