import {Record, RecordFactory, Service, ServiceFactory} from "./ApiService";
import fs = require('fs');

const fileList:string[] = process.argv.slice(2);
const service = ServiceFactory.getService();

if ( (! fileList.length) || fileList[0].match( /^-+h(elp)?$/i )) {
    console.log( "Usage: " + process.argv[1] + " file1 file2 ..." );
    process.exit(0);
}

fileList.forEach( 
    (path) => { 
        fs.readFileSync( path ).toString().split( /[\r\n]+/ 
            ).map( 
                (line) => { return RecordFactory.stringToRecord(line); }
            ).filter( (maybeNull) => { return !! maybeNull; } 
            ).forEach(
                (rec) => { service.addRecord( rec ); }
            )
    }
);


console.log( "Order by gender\n---------------------" );
service.fetchAllRecords( "gender" ).forEach(
    (rec) => { console.log( rec.toString() ); }
);

console.log( "\nOrder by birth\n------------------" );
service.fetchAllRecords( "dateOfBirth" ).forEach(
    (rec) => { console.log( rec.toString() ); }
);

console.log( "\nOrder by last name descending\n------------------" );
service.fetchAllRecords( "lastName" ).reverse().forEach(
    (rec) => { console.log( rec.toString() ); }
);
