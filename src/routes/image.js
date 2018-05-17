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
        const image = images[0];
        if (image.faceAnnotations.length < 0) {
          throw 'no mood found :(';
        }
        const keys = [
          'joyLikelihood',
          'sorrowLikelihood',
          'angerLikelihood',
          'surpriseLikelihood',
          'underExposedLikelihood',
          'blurredLikelihood',
          'headwearLikelihood'
        ];
        const annotations = pick(keys, image.faceAnnotations[0]);
        context.body = {
          annotations
        };
        return context;
      })
      .catch(error => {
        context.body = {
          message: 'Cannot get image recognition working :(',
          error: error
        };
        return context;
      });
  });
}

export default routes;
