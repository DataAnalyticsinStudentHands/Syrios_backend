'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('email-service')
      .service('myService')
      .getWelcomeMessage();
  },
};
