import vision from '@google-cloud/vision';
import busyboy from 'async-busboy';
import fs from 'fs';
import { pick } from 'ramda';
const googleClient = new vision.ImageAnnotatorClient();

function toBuffer(stream) {
  return new Promise((resolve, reject) => {
    let buffers = [];
    stream.on('error', reject);
    stream.on('data', data => buffers.push(data));
    stream.on('end', () => resolve(Buffer.concat(buffers)));
  });
}
/**
 * @param {import('koa-router')} server
 */
function routes(server) {
  server.post('/images', async context => {
    const { files } = await busyboy(context.req);
    const buffer = await toBuffer(files[0]);
    const request = {
      image: { content: buffer.toString('base64') }
    };
    return googleClient
      .faceDetection(request)
      .then(images => {
        const annotations = pick(keys, images[0].faceAnnotations[0]);
        console.log(annotations);
        context.body = {
          annotations
        };
      })
      .catch(error => {
        context.body = {
          message: 'Cannot get image recognition working :(',
          error: error
        };
      });
  });
}

export default routes;
