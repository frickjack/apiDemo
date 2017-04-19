
/**
 * Simple record.  Could do more with the types
 * (ex - dateOfBirth:Date, gender enum, ...)
 * but just using strings simplifies json serialization
 */
export interface Record {
    lastName:string,
    firstName:string,
    gender:string,
    favoriteColor:string,
    dateOfBirth:string  // M/D/YYYY
}

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
export function newRecord( last:string, first:string, gender:string, favColor:string, birthDay:string ):Record {
    return {
        lastName: last,
        firstName: first,
        gender: gender,
        favoriteColor: favColor,
        dateOfBirth: birthDay
    };
}

/**
 * Test 2 Records for equality - simplifies testing
 * @param a 
 * @param b 
 */
export function isEqual( a:Record, b:Record ):boolean {
    return a && b && a.lastName === b.lastName && a.firstName === b.firstName && a.gender === b.gender &&
        a.favoriteColor === b.favoriteColor && a.dateOfBirth === b.dateOfBirth;
}

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
export function stringToRecord( line:string ):Record {
    let tokens = line.split( /[\s,\|]+/ );
    if ( tokens.length !== 5 ) {
        return null;
    }
    return newRecord.apply( this, tokens );
}