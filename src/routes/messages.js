import busyboy from 'async-busboy';
/**
 * @param {import('koa-router')} server
 */
function routes(server) {
  server.post('/message', async context => {
    const payload = context.request.body;
    console.log('asking,', JSON.stringify(payload));

    context.body = {
      question: payload.question,
      results: [
        "salut du cul, ça c' est une réponse du cul !",
        'https://www.pole-emploi.fr/accueil/'
      ]
    };
    return context;
  });
}

export default routes;
