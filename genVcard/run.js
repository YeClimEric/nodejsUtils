const fs = require( 'fs-extra' );
const quotePrintable = require( 'quoted-printable' );
const utf8 = require( 'utf8' );

function appendFile( file, txt ) {
    fs.outputFile( file, txt, {
        flag: "a+"
    }, ( err ) => {} );
}

let cardModule = "BEGIN:VCARD\nVERSION:2.1\nN;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:;name;;;\nFN;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:fname\nTEL;CELL:mobile\nEND:VCARD\n"


let data = fs.readFileSync( "./data.txt" ).toString();

data.split( "\n" ).forEach( ( line ) => {
    d = line.split( ',' )
    if ( d.length != 2 ) {
        return;
    }
    let name = quotePrintable.encode( utf8.encode( d[ 1 ] ) );
    let mobile = d[ 0 ];
    mobile = mobile.slice( 0, 3 ) + " " + mobile.slice( 3, 6 ) + " " + mobile.slice( 6 );
    appendFile( "./cus_card.vcf", cardModule.replace( "name", name ).replace( "fname", name ).replace( 'mobile', mobile ) );
} )
