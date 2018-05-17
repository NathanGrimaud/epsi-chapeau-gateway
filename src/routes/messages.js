import fetch from 'node-fetch';
const api_url = process.env['API_URL'] || '';
/**
 * @param {import('koa-router')} server
 */
function routes(server) {
  server.post('/message', async context => {
    const payload = context.request.body;
    return fetch(`${api_url}/message`, {
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
