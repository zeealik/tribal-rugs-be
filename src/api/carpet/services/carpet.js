'use strict';

/**
 * carpet service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::carpet.carpet');
