module.exports = {
    routes: [
        { 
            "method": "POST", 
            "path": "/download", 
            "handler": "download.send", 
            "config": { 
                "policies": [] 
            }
        }
    ],
  };