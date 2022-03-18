'use strict'

module.exports = {
  // GET /hello
  send: async ctx => {
    const from =ctx.request.body.from
    const fullName =ctx.request.body.fullName

    strapi.services.download.send(
      from, 
      'shaotianhao1997@gmail.com', 
      'Strapi Download Data', 
      `${fullName} request download data, and the email is ${from}`
    );

    // Send response to the server.
    ctx.send({
      ok: true,
    });
  },
};

