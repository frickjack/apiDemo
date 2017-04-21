import {Record, RecordFactory, Service, ServiceFactory} from "../ApiService";

describe( "the ApiService", function() {
    it ( "can construct a new record", function() {
        let a = RecordFactory.newRecord( "last", "first", "male", "blue", "1/18/2013" );
        expect( a.lastName ).toBe( "last" );
        expect( a.firstName ).toBe( "first" );
        expect( a.gender ).toBe( "male" );
        expect( a.favoriteColor ).toBe( "blue" );
        expect( a.dateOfBirth ).toBe( "1/18/2013" );
    });

    it( "can test 2 records for equality", function() {
        const a = RecordFactory.newRecord( "last", "first", "male", "blue", "1/18/2013" );
        const b = RecordFactory.newRecord( "last", "first", "male", "blue", "1/18/2013" );
        expect( a.equals(b) ).toBe( true );
        expect( b.equals( a) ).toBe( true );
        const cList = [
            RecordFactory.newRecord( "lastX", "first", "male", "blue", "1/18/2013" ),
            RecordFactory.newRecord( "last", "firstX", "male", "blue", "1/18/2013" ),
            RecordFactory.newRecord( "last", "first", "female", "blue", "1/18/2013" ),
            RecordFactory.newRecord( "last", "first", "male", "red", "1/18/2013" ),
            RecordFactory.newRecord( "last", "first", "male", "blue", "1/19/2013" )
        ];

        cList.forEach( (c) => {
            expect( a.equals( c ) ? c : "ok" ).toBe( "ok" );
            expect( c.equals( a ) ? c : "ok" ).toBe( "ok" );
        });
    })

    it( "can parse a line into a record", function() {
        let testCases = [
            { 
                line: "last first male blue 1/1/2011", 
                result: RecordFactory.newRecord( "last", "first", "male", "blue", "1/1/2011" )
            },
            { 
                line: "last , first , male , blue , 1/1/2011", 
                result: RecordFactory.newRecord( "last", "first", "male", "blue", "1/1/2011" )
            },
            { 
                line: "last | first | male | blue | 1/1/2011", 
                result: RecordFactory.newRecord( "last", "first", "male", "blue", "1/1/2011" )
            }
        ];
        testCases.forEach( (tc) => {
            expect( tc.result.equals( RecordFactory.stringToRecord( tc.line ) ) ? "ok" : tc.line ).toBe( "ok" );
        });
    });

    it( "provides a singleton service", function() {
        const service = ServiceFactory.getService();
        expect( ServiceFactory.getService() ).toBe( service );
    });

    it( "keeps a simple database of Records", function() {
        const service = ServiceFactory.getService();
        const testData = [
            "last3, first3, male, red, 3/3/2002",
            "last2, first2, male, red, 2/2/2002",
            "last1, first1, female, blue, 1/1/2001"
        ].map( (str) => { return RecordFactory.stringToRecord(str); });

        testData.forEach( (rec) => {
            service.addRecord( rec );
        });
        
        const byName = service.fetchAllRecords( "lastName" );
        const byBirth = service.fetchAllRecords( "dateOfBirth" );
        const byGender = service.fetchAllRecords( "gender" );
        expect( byName.length ).toBe( testData.length );
        expect( byBirth.length ).toBe( testData.length );
        expect( byGender.length ).toBe( testData.length );

        byName.forEach( (rec,index) => {
            expect( rec.lastName ).toBe( testData[testData.length - index - 1].lastName );
        });
        byBirth.forEach( (rec,index) => {
            expect( rec.dateOfBirth ).toBe( testData[testData.length - index - 1].dateOfBirth );
        });
        byGender.forEach( (rec,index) => {
            expect( rec.gender ).toBe( testData[testData.length - index - 1].gender );
        });
        
    });
});