
/**
 * Simple record.  Could do more with the types
 * (ex - dateOfBirth:Date, gender enum, ...)
 * but just using strings simplifies json serialization
 */
export interface Record {
    lastName:string;
    firstName:string;
    gender:string;
    favoriteColor:string;
    dateOfBirth:string;  // M/D/YYYY

    equals( other:Record ):boolean;
    toString():string;
    toJson():string;
}

class SimpleRecord implements Record {
    lastName:string;
    firstName:string;
    gender:string;
    favoriteColor:string;
    dateOfBirth:string;  // M/D/YYYY

    constructor( last:string, first:string, gender:string, favColor:string, birthDay:string ) {
        this.lastName = last;
        this.firstName = first;
        this.gender = gender;
        this.favoriteColor = favColor;
        this.dateOfBirth = birthDay;
    }

    equals( other:Record ):boolean {
        return this && other && this.lastName === other.lastName && this.firstName === other.firstName && this.gender === other.gender &&
            this.favoriteColor === other.favoriteColor && this.dateOfBirth === other.dateOfBirth;
    }

    toString():string {
        return "" + this.lastName + ", " + this.firstName + ", " + this.gender + ", " + this.favoriteColor +
            ", " + this.dateOfBirth;
    }

    toJson():string { return JSON.stringify( this ); }
}

export const RecordFactory = {
    /**
     * Little factory method
     * 
     * @param last 
     * @param first 
     * @param gender 
     * @param favColor 
     * @param birthDay 
     * @return Record
     */
    newRecord:function( last:string, first:string, gender:string, favColor:string, birthDay:string ):Record {
        return new SimpleRecord( last, first, gender, favColor, birthDay );
    },

    /**
     * The pipe-delimited file lists each record as follows: 
     *   `LastName | FirstName | Gender | FavoriteColor | DateOfBirth`
     *
     * The comma-delimited file looks like this: 
     *   `LastName, FirstName, Gender, FavoriteColor, DateOfBirth`
     *
     * The space-delimited file looks like this: 
     *   `LastName FirstName Gender FavoriteColor DateOfBirth`
     *
     * @param line in one of the 3 formats
     * @return record or null if unable to parse line
     */
    stringToRecord:function( line:string ):Record {
        let tokens = line.split( /[\s,\|]+/ );
        if ( tokens.length !== 5 ) {
            return null;
        }
        return RecordFactory.newRecord.apply( this, tokens );
    },

    objectToRecord:function( obj:any ):Record {
        const rec = obj as Record;
        return new SimpleRecord( rec.lastName, rec.firstName, rec.gender, rec.favoriteColor, rec.gender );
    }
}


export interface Service {
    addRecord( rec:Record ):void;

    /**
     * Fetch the records ordered by the given field
     * 
     * @param orderBy one of lastName, firstName, ...
     */
    fetchAllRecords( orderBy:string ):Record[];
}

class SimpleService implements Service {
    recs:Record[];

    constructor() {
        this.recs = [];
    }

    addRecord(rec:Record):void {
        this.recs.push( rec );
    }

    fetchAllRecords( orderBy:string ):Record[] {
        const copy = [].concat( this.recs );
        const compare = (a:Record, b:Record) => {
            if ( a === b ) { return 0; }
            if ( ! a ) { return 1; }
            if ( ! b ) { return -1; }
            if ( a[orderBy] === b[orderBy] ) { return 0; }
            if ( ! a[orderBy] ) { return 1; }
            if ( ! b[orderBy] ) { return -1; }
            if ( orderBy === "dateOfBirth" ) {
                const aMs = new Date( a.dateOfBirth ).getTime();
                const bMs = new Date( b.dateOfBirth ).getTime();
                return aMs < bMs ? -1 : 1;
            }
            return (a[orderBy] as string).localeCompare( b[orderBy] as string );
        };
        return copy.sort( compare );
    }
}

const singleton:SimpleService = new SimpleService();

export const ServiceFactory = {
    getService:function ():Service { return singleton; }
}


