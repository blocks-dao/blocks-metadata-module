import React, { useState, useEffect } from 'react'
import './FetchContainer.css';
import Web3 from "web3";
import * as web3Utils from "web3-utils";
import { IonButton } from '@ionic/react';

declare const window: any;

const web3 = new Web3('https://mainnet.infura.io/v3/<ADD_YOUR_INFURA_API_KEY_HERE>');

interface ContainerProps { }

const FetchContainer: React.FC<ContainerProps> = () => {

  const [blocksData, setBlocksData] = useState("");
  const [blocksJson, setBlocksJson] = useState({});
  const [transaction, setTransaction] = useState("");
  
  const onChange = async (data: any) => {
    if (data) {
      console.log(data.target.value)
      setTransaction(data.target.value);
    }
  }

  const getLogData = (decode: any) => {
      //We need to decode the transaction logs to get the data. This requires the abi of the "send" function, the data and transaction topics. These are passed in as a result of fetching the transaction.
      let result: any = web3.eth.abi.decodeLog([{
        'type':'address',
        'name':'operator',
        'indexed': true
      }, {
        'type':'address',
        'name':'from',
        'indexed': true
      },{
        'type':'address',
        'name': 'to',
        'indexed': true
      },{
        'type': 'uint256',
        'name':'amount'
      },{
        'type': 'bytes',
        'name':'data'
      },{
        'type': 'bytes',
        'name':'operatorData'
      }],decode.logs[0].data, decode.logs[0].topics.slice(1));
      return result;
  }

  const fetchBlocksTransaction = async(tx: string) => {
    // let web3 = new Web3(window.ethereum);

    //Fetch the transaction id using web3. Insert the transaction id that contains BLOCKS data.
    web3.eth.getTransactionReceipt(tx).then(async(res:any) => {
        console.log(res)
      //Call a function to decode the transaction logs, see below.
      let details = await getLogData(res);
        console.log(details.data)

        //Use web3 Utils to convert the hex data to human-readable data.
        let message = web3Utils.hexToAscii(details.data);
        setBlocksData(message);
        setBlocksJson(JSON.parse(message))
        alert(message);
      });
  }

  const clear = () => {
    setBlocksData("");
    setTransaction("");
  }

  useEffect(() => {
      if(transaction){
        fetchBlocksTransaction(transaction);
      }
  }, [transaction]);

  return (
      <div className="container">
        <strong>Fetch BLOCKS NFT Metadata</strong>
        <input type='text' placeholder="Paste BLOCKS Transaction ID" value={transaction} onChange={onChange}/>
        {blocksData &&
          <>
          <div className="display">
            <p className="tx">Blockchain Metadata: {blocksData}</p>
          </div>
          <div>
            <img src={blocksJson["image"]} />
          </div>
          </>
        }
        {transaction &&
          <IonButton color="danger" size="small" onClick={clear}>CLEAR</IonButton>
        }
      </div>
  );
};

export default FetchContainer;