This is the Sundensity Sale Page webapp


## To build production version, 

    npm run build

then copy the build_webpack/ folder contents to a hosting location. The index.html might have to be edited for correct relative pathing if copying this built static app somewhere if the location hosted is not at root


## To compile smart contracts, 

    truffle compile


## To migrate smart contracts to local testrpc ethereum network

    Start testrpc locally as per its website instructions
    truffle migrate --reset

This will migrate all contracts as per migrations/ folder


## To create production build of react js code to deploy to wordpress site

    npm run build
    # copy whatever was just generated under build_webpack/ to built.react.package.js
    cp build_webpack/static/js/main.16487dfb.js built.react.package.js 

    # check in the built package too, the build_webpack/ is in .gitignore so won't be committed


