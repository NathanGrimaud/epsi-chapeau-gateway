import Koa from 'koa';
import Router from 'koa-router';
import Routes from './routes';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';
const server = new Koa();
const router = new Router();
const port = process.env.API_PORT || 3000;
const routes = Routes(router);

server
  .use(cors())
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

server.listen(port);
console.log(`API started, listening on port : ${port}`);
