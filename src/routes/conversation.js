import v4 from 'uuid/v4';
/**
 * @param {import('koa-router')} server
 * @param {import('socket.io').Server} io
 */
function routes(server, io) {
  server
    .post('/conversation', async context => {
      context.body = {
        id: v4()
      };
      return context;
    })
    .post('/conversation/:id/callback', async context => {
      const id = context.params.id;
      const payload = context.request.body;
      context.body = payload;
      io.emit(`response_${id}`, context.body);
      return context;
    });
}

export default routes;
