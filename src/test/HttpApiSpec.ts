import fetch = require( 'node-fetch' );
import {Record,RecordFactory} from "../ApiService";


/**
 * This test assumes that the server begins in an empty state
 */
describe( "The ApiService HTTP API", function() {
    const endpoint:string = process.env.apiEndpoint || "http://localhost:2500";
    const testData = [
        "femaleName, first, female, pink, 8/8/2001",
        "birthName, first, male, pink, 1/8/1990",
        "aaaName, first, male, blue, 9/9/2009"
    ];

    it( "Accepts records POSTed to /records", function(done) {
        Promise.all(
            testData.map(
                function(recordStr:string) {
                    return fetch( endpoint + "/records", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify( RecordFactory.stringToRecord( recordStr ) )
                    });
                }
            )
        ).then(
            function(resList) {
                console.log( "POST resolved", resList );
                expect( resList.length ).toBe( testData.length );
                expect( resList[0].status ).toBe( 200 );
                done();
            },
            function(res) {
                console.log( "POST failed", res );
                done.fail( "POST failed: " + res.status + ", " + res.statusText );
            }
        );
    });


    it( "GET requests to /records/gender retrieves the POSTed records ordered by gender", function(done) {
        fetch( endpoint + "/records/gender", { method: "GET" } ).then( function(res) {
            return res.json();
        }).then( function(recordList) {
            expect( recordList.length ).toBe( testData.length );
            expect( recordList[0].lastName ).toBe( "femaleName" );
            expect( recordList[0].gender ).toBe( "female" );
            done();
        }).catch( function(res) {
            console.log( "/records/gender failed", res );
            done.fail( "/records/gender failed" );
        });
    });

    it( "GET requests to /records/birthdate retrieves the POSTed records ordered by gender", function(done) {
        fetch( endpoint + "/records/birthdate", { method: "GET" } ).then( function(res) {
            return res.json();
        }).then( function(recordList) {
            expect( recordList.length ).toBe( testData.length );
            expect( recordList[0].lastName ).toBe( "birthName" );
            done();
        }).catch( function(res) {
            console.log( "/records/birthdate failed", res );
            done.fail( "/records/birthdate failed" );
        });
    });

    it( "GET requests to /records/name retrieves the POSTed records ordered by name", function(done) {
        fetch( endpoint + "/records/name", { method: "GET" } ).then( function(res) {
            return res.json();
        }).then( function(recordList) {
            expect( recordList.length ).toBe( testData.length );
            expect( recordList[0].lastName ).toBe( "aaaName" );
            done();
        }).catch( function(res) {
            console.log( "/records/name failed", res );
            done.fail( "/records/name failed" );
        });
    });

});

