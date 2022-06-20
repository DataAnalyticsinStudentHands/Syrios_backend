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
        // All head elements
        'zone.head',

        // image_text
        'zone.it_text',
        
        'zone.it_image',
        'zone.it_image.image',
        'zone.it_image.coin',
        'zone.it_image.coin.obverse_file',
        'zone.it_image.coin.reverse_file',
        'zone.it_image.coin.type_category',
        // image_text_image
        'zone.iti_image_left',
        'zone.iti_image_left.image',
        'zone.iti_image_left.coin',
        'zone.iti_image_left.coin.obverse_file',
        'zone.iti_image_left.coin.reverse_file',
        'zone.iti_image_left.coin.type_category',

        'zone.iti_text_middle',

        'zone.iti_image_right',
        'zone.iti_image_right.image',
        'zone.iti_image_right.coin',
        'zone.iti_image_right.coin.obverse_file',
        'zone.iti_image_right.coin.reverse_file',
        'zone.iti_image_right.coin.type_category',
        //image_text_text
        'zone.itt_texts',
        'zone.itt_text',

        'zone.itt_image',
        'zone.itt_image.image',
        'zone.itt_image.coin',
        'zone.itt_image.coin.obverse_file',
        'zone.itt_image.coin.reverse_file',
        'zone.itt_image.coin.type_category',

        // text_text
        'zone.tt_text_left',
        'zone.tt_text_right',
        //images
        'zone.images',
        'zone.images.image',
        'zone.images.coin',
        'zone.images.coin.obverse_file',
        'zone.images.coin.reverse_file',
        'zone.images.coin.type_category',

        //sacle frame
        'zone.scale_coin_left',
        'zone.scale_coin_left.dynamic_images',
        'zone.scale_coin_right.dynamic_images',

        'zone.scale_coin_left.coin',
        'zone.scale_coin_left.coin.obverse_file',
        'zone.scale_coin_left.coin.reverse_file',
        'zone.scale_coin_left.coin.type_category',

        'zone.scale_coin_right',
        'zone.scale_coin_right.coin',
        'zone.scale_coin_right.coin.obverse_file',
        'zone.scale_coin_right.coin.reverse_file',
        'zone.scale_coin_right.coin.type_category',

        // fade frame
        'zone.fades',
        'zone.fades.coin_left',
        'zone.fades.coin_left.obverse_file',
        'zone.fades.coin_left.reverse_file',
        'zone.fades.coin_left.type_category',
        'zone.fades.coin_right',
        'zone.fades.coin_right.obverse_file',
        'zone.fades.coin_right.reverse_file',
        'zone.fades.coin_right.type_category',
        'zone.fades.image_left',
        'zone.fades.image_right',

        //flip frame
        'zone.flip_coin_left',
        'zone.flip_coin_left.dynamic_images',
        'zone.flip_coin_left.coin',
        'zone.flip_coin_left.coin.obverse_file',
        'zone.flip_coin_left.coin.reverse_file',
        'zone.flip_coin_left.coin.type_category',

        'zone.flip_coin_right.dynamic_images',
        'zone.flip_coin_right.coin',
        'zone.flip_coin_right.coin.obverse_file',
        'zone.flip_coin_right.coin.reverse_file',
        'zone.flip_coin_right.coin.type_category',


        ////Frame 1's, Frame 4's, Frame 5's, left and right components
        // 'zone.left',
        // 'zone.right',
        ////Frame 2's image component
        // 'zone.image2',
        // 'zone.image2.image',
        ////Frame 3's multiple images
        // 'zone.images',
        // 'zone.images.image',
        ////Frame 4's three image
        // 'zone.image_left',
        // 'zone.image_left.image',
        // 'zone.image_middle',
        // 'zone.image_middle.image',
        // 'zone.image_right',
        // 'zone.image_right.image',
        ////Frame 5's image component inside of left and right, and middle text
        // 'zone.image5_left',
        // 'zone.text5_middle',
        // 'zone.image5_right',
        // 'zone.image5_left.image',
        // 'zone.image5_right.image',

        ////Frame 6's text component
        // 'zone.text6',
        // 'zone.image6',
        // 'zone.image6.image',
        ////Frame 7
        // 'zone.text7',
        // 'zone.text7_right',
        // 'zone.image7_left',
        // 'zone.image7_left.image',



        // Frame 8's text element
        // 'zone.image8',
        // 'zone.image8.image',
        // 'zone.image8.coin',
        // 'zone.image8.coin.obverse_file',
        // 'zone.image8.coin.reverse_file',
        // 'zone.image8.coin.type_category',
        // 'zone.images8',
        // 'zone.images8.image',
        // 'zone.images8.coin',
        // 'zone.images8.coin.obverse_file',
        // 'zone.images8.coin.reverse_file',
        // 'zone.images8.coin.type_category',


        // Frame 9's middle image component
        // 'zone.mid.image',
        // Frame 11's front and back images
        // 'zone.left_front11',
        // 'zone.left_back11',
        // 'zone.right_front11',
        // 'zone.right_back11',
        // Frame 12's front and back images
        // 'zone.left_back12',
        // 'zone.left_back12.image',
        // 'zone.left_front12',
        // 'zone.left_front12.image',
        // 'zone.right_front12',
        // 'zone.right_front12.image',
        // 'zone.right_back12',
        // 'zone.right_back12.image',
        // Frame 13's front and back images
        // 'zone.left_back13',
        // 'zone.left_back13.image',
        // 'zone.left_front13',
        // 'zone.left_front13.image',
        // 'zone.right_front13',
        // 'zone.right_front13.image',
        // 'zone.right_back13',
        // 'zone.right_back13.image',
        // Frame 14's component
        // 'zone.component',
        // 'zone.component.images_left',
        // 'zone.component.images_right',
        // Frame 15's images
        // 'zone.left_front',
        // 'zone.left_back',
        // 'zone.left_front.image',
        // 'zone.left_back.image',
      ],

      // If a request with a different populate strategy, it'll replace the default population strategy
      ...ctx.query
    };

    const { data, meta } = await super.findOne(ctx);

    return { data, meta };
  }
}));
