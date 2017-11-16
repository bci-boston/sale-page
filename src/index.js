import React from 'react'
import ReactDOM from 'react-dom'
import { App, TokensForSale, TokensSold, TokenPrice } from './App'


ReactDOM.render(
    <TokensForSale />,
    document.getElementById('tokensforsale')
);


ReactDOM.render(
    <TokensSold />,
    document.getElementById('tokenssold')
);


ReactDOM.render(
    <TokenPrice />,
    document.getElementById('tokenprice')
);
