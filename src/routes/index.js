import images from './image';
import conversation from './conversation';
import messages from './messages';
/**
 * @param {import('koa').Server} server
 */
export default (server, socket) => ({
  images: images(server),
  conversation: conversation(server, socket),
  messages: messages(server, socket)
});
