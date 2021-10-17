# BLOCKS Metadata Module

This proof of concept application leverages the BLOCKS data feature to store NFT metadata on the blockchain.

# Use Cases for BLOCKS Metadata Transactions

- Storing immutable NFT metadata
- Data redundancy
- Future alternative to the ERC721 tokenURI, replaced by a transaction id

## Project Notes:
- Project is set up for ETH mainnet
- Metamask is used as the provider to sign transactions
- Infura is used to connect to ETH for fetching/parsing data 
(manually change the Infura url for Rinkeby testing from "mainnet.infura.io" to "rinkeby.infura.io"

## Live Demo

[BLOCKS Metadata Web App](https://blocks-metadata.web.app/home)

Sample transaction id for testing the demo app 'Get Metadata' page:
```
0x6ad73e89fe25b69e3386273410c533897fadcf1bd1fbf2dfcdefdb4a7432c16c
```

## Running Locally
The app is built with ReactJs and Ionic Framework
```
npm install -g @ionic/cli
```
[Install the Ionic CLI](https://ionicframework.com/docs/cli/)

Clone the repo and run:
```
npm install
```
Start the app using:
```
ionic serve
```

## Have Fun

Have fun exploring and building on BLOCKS with metadata transactions.


## License

Copyright © 2021 <BLOCKS DAO, LLC>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.