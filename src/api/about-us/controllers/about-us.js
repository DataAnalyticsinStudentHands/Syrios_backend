'use strict';

/**
 *  about-us controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::about-us.about-us', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      populate: [
        'logo',
        'project_directors',
        'project_directors.picture',
        'student_lead',
        'student_lead.picture',
        'student_collaborators',
        'humanities_advisors',
        'external_funding',
        'internal_funding',
        'coin_source',
        'present_mus_org'
      ],
      ...ctx.query
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  }
}));
