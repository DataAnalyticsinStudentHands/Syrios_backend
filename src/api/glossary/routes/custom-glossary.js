module.exports = {
    routes: [
        { 
            method: "GET", 
            path: "/glossry/start-with/:alphabet", 
            handler: "glossary.findStartWith", 
            config: { 
                auth: false 
            }
        },
        { 
            method: "GET", 
            path: "/glossry/by-term/:term", 
            handler: "glossary.findByTerm", 
            config: { 
                auth: false 
            }
        }
    ],
  };

