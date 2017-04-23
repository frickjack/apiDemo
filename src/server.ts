import express = require( 'express' );
import bodyParser = require( 'body-parser' );
import * as api from "./ApiService";

const app = express();
const service = api.ServiceFactory.getService();

//app.use( express.static( __dirname ) );

app.post( "/records", bodyParser.json(), function(req,res) {
    const rec = api.RecordFactory.objectToRecord( req.body );
    if ( ! rec ) {
        res.status( 400 );
        res.setHeader( "Content-Type", "application/json" );
        res.json( {} );
        return;
    }
    //console.log( "Adding record", rec );
    service.addRecord( rec );
    res.status(200);
    res.json( {} );
});

app.get( "/records/:orderBy", function(req,res) {
    const orderBy = (function() {
        switch (req.params.orderBy) {
            case "name": return  "lastName";
            case "birthdate" : return "dateOfBirth";
            default: return req.params.orderBy;
        }
    })();
    res.json( service.fetchAllRecords( orderBy ) );     
});

const port = 2500;
app.listen( port, function() {
    console.log( "Server listening at http://localhost:" + port + "/" );
    console.log( "POST to /records" );
    console.log( "GET from /records/:orderBy" );
});
