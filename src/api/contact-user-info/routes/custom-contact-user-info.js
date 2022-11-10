module.exports = {
    routes: [
      { // Path defined with an URL parameter
        method: 'POST',
        path: '/user-subscription', 
        handler: 'contact-user-info.subscription',
      }
    ]
  }