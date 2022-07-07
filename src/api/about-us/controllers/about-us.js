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
        'media_content_team',
        'media_content_team.picture',
        'past_student_research_assistants',
        'acknowledgment_left_link',
        'acknowledgment_right_link',
      ],
      ...ctx.query
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  }
}));
