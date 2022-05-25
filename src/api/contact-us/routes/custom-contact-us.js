module.exports = {
    routes: [
        { 
            "method": "POST", 
            "path": "/contact-us", 
            "handler": "contact-us.send", 
            "config": { 
                "policies": [] 
            }
        }
    ],
  };