module.exports = {
    routes: [
        { 
            method: "GET", 
            path: "/glossry/start-with/:alphabet", 
            handler: "glossary.findStartWith", 
            config: { 
                auth: false 
            }
        }
    ],
  };

