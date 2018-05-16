import images from './image';
import conversation from './conversation';
import messages from './messages';
/**
 * @param {import('koa').Server} server
 */
export default server => ({
  images: images(server),
  conversation: conversation(server),
  messages: messages(server)
});
