module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
      auth:false
    },
  },
  {
    method: 'GET',
    path: '/find',
    handler: 'emailservice.find',
    config: {
      policies: [],
      auth:false
    },
  },
  {
    method: 'PUT',
    path: '/update',
    handler: 'emailservice.update',
    config: {
      policies: [],
      auth:false
    },
  },
  { 
    method: "POST", 
    path: "/send", 
    handler: "emailservice.send", 
    config: { 
        policies: [],
        auth:false
    }
}
];
