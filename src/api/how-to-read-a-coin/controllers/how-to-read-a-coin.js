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
                'references',
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
                'zone.flip_coin_left.coin',
                'zone.flip_coin_left.coin.obverse_file',
                'zone.flip_coin_left.coin.reverse_file',
                'zone.flip_coin_left.coin.type_category',
        
                'zone.flip_coin_right.coin',
                'zone.flip_coin_right.coin.obverse_file',
                'zone.flip_coin_right.coin.reverse_file',
                'zone.flip_coin_right.coin.type_category',
        
                //compare frame
                'zone.cc_coin',
                'zone.cc_text',
                'zone.cc_coin.coin',
                'zone.cc_coin.coin.obverse_file',
                'zone.cc_coin.coin.reverse_file',
                'zone.cc_coin.coin.type_category',
      ],

      // If a request with a different populate strategy, it'll replace the default population strategy
      ...ctx.query
    };

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  }
}));
