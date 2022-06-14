'use strict';

/**
 *  story controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::story.story', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      populate: [
        'image'
      ],
      pagination: {
        pageSize: 2147483647,
      },
      ...ctx.query
    };

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  },

  async findOne(ctx) {
    ctx.query = {
      populate: [
        // story info
        'image',
        'credits_and_references',
        'credits_and_references.source_material',
        'credits_and_references.read_more',
        // Zones
        'zone',
        // All elements that are just zone.image
        'zone.image',
        // All background elements
        'zone.background',
        // Frame 1's, Frame 4's, Frame 5's, left and right components
        'zone.left',
        'zone.right',
        // Frame 2's image component
        'zone.image2',
        'zone.image2.image',
        'zone.head',
        // Frame 3's multiple images
        'zone.images',
        'zone.images.image',
        // Frame 4's three image
        'zone.image_left',
        'zone.image_left.image',
        'zone.image_middle',
        'zone.image_middle.image',
        'zone.image_right',
        'zone.image_right.image',
        // Frame 5's image component inside of left and right, and middle text
        'zone.image5_left',
        'zone.text5_middle',
        'zone.image5_right',
        'zone.image5_left.image',
        'zone.image5_right.image',

        // Frame 6's text component
        'zone.text6',
        'zone.image6',
        'zone.image6.image',
        // Frame 7
        'zone.text7',
        'zone.text7_right',
        'zone,image7_left',
        'zone,image7_left.image',
        // Frame 8's text element
        'zone.image8',
        'zone.image8,image',
        'zone.images8',
        'zone.images8,image',
        // Frame 9's middle image component
        'zone.mid.image',
        // Frame 11's front and back images
        'zone.left_front11',
        'zone.left_back11',
        'zone.right_front11',
        'zone.right_back11',
        // Frame 12's front and back images
        'zone.left_back12',
        'zone.left_back12.image',
        'zone.left_front12',
        'zone.left_front12.image',
        'zone.right_front12',
        'zone.right_front12.image',
        'zone.right_back12',
        'zone.right_back12.image',
        // Frame 13's front and back images
        'zone.left_back13',
        'zone.left_back13.image',
        'zone.left_front13',
        'zone.left_front13.image',
        'zone.right_front13',
        'zone.right_front13.image',
        'zone.right_back13',
        'zone.right_back13.image',
        // Frame 14's component
        'zone.component',
        'zone.component.images_left',
        'zone.component.images_right',
        // Frame 15's images
        'zone.left_front',
        'zone.left_back',
        'zone.left_front.image',
        'zone.left_back.image',
      ],

      // If a request with a different populate strategy, it'll replace the default population strategy
      ...ctx.query
    };

    const { data, meta } = await super.findOne(ctx);

    return { data, meta };
  }
}));
