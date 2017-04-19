import * as ApiService from "../ApiService";

describe( "the ApiService", function() {
    it ( "can construct a new record", function() {
        let a = ApiService.newRecord( "last", "first", "male", "blue", "1/18/2013" );
        expect( a.lastName ).toBe( "last" );
        expect( a.firstName ).toBe( "first" );
        expect( a.gender ).toBe( "male" );
        expect( a.favoriteColor ).toBe( "blue" );
        expect( a.dateOfBirth ).toBe( "1/18/2013" );
    });

    it( "can test 2 records for equality", function() {
        let a = ApiService.newRecord( "last", "first", "male", "blue", "1/18/2013" );
        let b = ApiService.newRecord( "last", "first", "male", "blue", "1/18/2013" );
        expect( ApiService.isEqual( a, b) ).toBe( true );
        let cList = [
            ApiService.newRecord( "lastX", "first", "male", "blue", "1/18/2013" ),
            ApiService.newRecord( "last", "firstX", "male", "blue", "1/18/2013" ),
            ApiService.newRecord( "last", "first", "female", "blue", "1/18/2013" ),
            ApiService.newRecord( "last", "first", "male", "red", "1/18/2013" ),
            ApiService.newRecord( "last", "first", "male", "blue", "1/19/2013" )
        ];

        cList.forEach( (c) => {
            expect( ApiService.isEqual( a, b) ? "ok" : c ).toBe( "ok" );
        });
    })

    it( "can parse a line into a record", function() {
        let testCases = [
            { 
                line: "last first male blue 1/1/2011", 
                result: ApiService.newRecord( "last", "first", "male", "blue", "1/1/2011" )
            },
            { 
                line: "last , first , male , blue , 1/1/2011", 
                result: ApiService.newRecord( "last", "first", "male", "blue", "1/1/2011" )
            },
            { 
                line: "last | first | male | blue | 1/1/2011", 
                result: ApiService.newRecord( "last", "first", "male", "blue", "1/1/2011" )
            }
        ];
        testCases.forEach( (tc) => {
            expect( ApiService.isEqual( tc.result, ApiService.stringToRecord( tc.line ) ) ? "ok" : tc.line ).toBe( "ok" );
        });
    });
});