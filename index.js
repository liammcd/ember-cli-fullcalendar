'use strict';

module.exports = {
  name: require('./package').name,

  included (app) {
    this._super.call (this, ...arguments);

    app.import ({
      development: 'node_modules/@fullcalendar/core/main.css',
      production: 'node_modules/@fullcalendar/core/main.min.css'
    });

    app.import ({
      development: 'node_modules/@fullcalendar/daygrid/main.css',
      production: 'node_modules/@fullcalendar/daygrid/main.min.css'
    })
  }

};
