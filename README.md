This is the Sundensity Sale Page webapp


== Dev notes ==

To build production version, 

    npm run build

then copy the build_webpack/ folder contents to a hosting location. The index.html might have to be edited for correct relative pathing if copying this built static app somewhere if the location hosted is not at root



To compile smart contracts, 

    truffle compile


To migrate smart contracts to local testrpc ethereum network

    Start testrpc locally as per its website instructions
    truffle migrate --reset

This will migrate all contracts as per migrations/ folder





