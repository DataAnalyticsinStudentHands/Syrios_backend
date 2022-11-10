module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/user-subscription', 
        handler: 'contact-user-info.subscription',
      },
      {
        method: 'POST',
        path: '/user-download', 
        handler: 'contact-user-info.download',
      },
      // {
      //   method: 'POST',
      //   path: '/user-contact-us', 
      //   handler: 'contact-user-info.contactus',
      // },
    ]
  }