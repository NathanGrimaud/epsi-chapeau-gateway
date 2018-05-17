import v4 from 'uuid/v4';
import fetch from 'node-fetch';
/**
 * @param {import('koa-router')} server
 * @param {import('socket.io').Server} io
 */
function routes(server, io) {
  server
    .post('/conversation', async context => {
      return fetch(`${global.api_url}/conversation`, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.text())
        .then(body => {
          context.body = { id: body };
          return context;
        });
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
