'use strict';

/**
 *  how-to-read-a-coin controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::how-to-read-a-coin.how-to-read-a-coin', ({ strapi }) => ({
    async find(ctx) {
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
        // Frame 3's multiple images
        'zone.images',
        'zone.images.image',
        // Frame 5's image component inside of left and right, and middle text
        'zone.left.image',
        'zone.right.image',
        'zone.middle',
        // Frame 6's text component
        'zone.text6',
        'zone.image6',
        'zone.image6.image',
        // Frame 8's text element
        'zone.text8',
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
      ],

      // If a request with a different populate strategy, it'll replace the default population strategy
      ...ctx.query
    };

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  }
}));
