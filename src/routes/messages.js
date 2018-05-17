import fetch from 'node-fetch';

/**
 * @param {import('koa-router')} server
 */
function routes(server) {
  server.post('/message', async context => {
    const payload = context.request.body;
    return fetch(`${global.api_url}/message`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      context.body = {
        sent: true
      };
      return context;
    });
  });
}

export default routes;
