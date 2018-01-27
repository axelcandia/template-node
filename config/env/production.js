var website="https://admin.eventspot.me";
module.exports = {
   
    AWS:{
       accessKeyId:"AKIAIL6MQX6NOK7S2XOA", 
       secretAccessKey: "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",
       region:  "us-west-2", 
    },
    hubspot:{
       clientID:"5d869a0f-b948-409c-a3d0-7fd0d3e56b0b",
       clientSecret:"5ae5ad88-e2b7-425c-ab09-d5fd523037c9",
       redirectUrl:website+"/hubspot/callback"
    },
    auth0:{
        domain: 'eventspot.auth0.com',
        clientID: 'y4LdbSBYvpc2B1pcgUqaecgTWYsIhfQR',
        clientSecret: '9-0N0CO1Lz36XPGxscglXSzIsWWivg9JkFE2Aq0jK0Qe8pwDp8w2tcDiKtTW5qQv',
        callbackURL: website+"/callback",
        logout:"https://eventspot.auth0.com/v2/logout?returnTo="+website+"/login"
    },
    port:80
};  