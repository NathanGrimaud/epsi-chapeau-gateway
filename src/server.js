import Koa from 'koa';
import Router from 'koa-router';
import Routes from './routes';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';
import { createServer } from 'http';
import Io from 'socket.io';
const server = new Koa();
const router = new Router();
const port = process.env.API_PORT || 3000;
const http = createServer(server.callback());
const io = Io.listen(server.listen(port));
const routes = Routes(router, io);
global.api_url = process.env['API_URL'] || '';
io.on('connection', socket => {
  /* console.log('new client connected, num :');*/
});
server
  .use(cors())
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

console.log(`API started, listening on port : ${port}`);
