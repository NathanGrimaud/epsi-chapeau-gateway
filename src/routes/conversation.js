import v4 from 'uuid/v4';
/**
 * @param {import('koa-router')} server
 */
function routes(server) {
  server
    .post('/conversation', async context => {
      context.body = {
        id: v4()
      };
      return context;
    })
    .get('/conversation/:id/callback', async context => {
      context.body = {
        ok: true
      };
      return context;
    });
}

export default routes;
