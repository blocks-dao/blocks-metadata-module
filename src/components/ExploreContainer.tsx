import React, { useState, useRef, useEffect } from 'react';
import { IonButton, IonRow, IonCol, IonGrid } from '@ionic/react';
import './ExploreContainer.css';
import {ethers} from "ethers";
import BigNumber from "bignumber.js";
import * as rlp from "rlp";
import * as keccak from "keccak";
import * as web3Utils from "web3-utils";
import Web3 from "web3";
import blocksData from "../blocksDetails";
import uploadToIpfs from "../ipfsService";

declare const window: any;

const web3 = new Web3('https://mainnet.infura.io/v3/d3c4f2797e3a4cf58abe072ec382a191');
// URL to connect to xDAI Network: https://rpc.xdaichain.com
// URL to connect to Polygon Network: https://polygon-rpc.com

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {

  const [file, setFile] = useState("");
  const [viewFile, setViewFile] = useState("");
  const [viewMediaFile, setViewMediaFile] = useState("");
  const [mediaFile, setMediaFile] = useState("");
  const [ipfsImage, setIpfsImage] = useState("");
  const [ipfsMedia, setIpfsMedia] = useState("");
  const [transaction, setTransaction] = useState("");
  const [metadata, setMetadata] = useState("");
  const [contractAddress, setContractAddress] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [youtube, setYoutube] = useState("");

  const fileInput = useRef<any>(null)
  const mediaInput = useRef<any>(null)
  
  const onChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setViewFile(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
      uploadImageToIpfs(e.target.files[0]);
    }
  }

  const onMedia = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setViewMediaFile(URL.createObjectURL(e.target.files[0]))
      setMediaFile(e.target.files[0])
      uploadMediaToIpfs(e.target.files[0])
    }
  }

  const uploadImageToIpfs = async (file: any) => {
    let json: any = uploadToIpfs(file);
    if (json) {
      json.then(res => {
        console.log(res)
        setIpfsImage(`https://ipfs.io/ipfs/${res.Hash}?filename=${res.Name}`);
      })
    }
  }

  const uploadMediaToIpfs = async (file: any) => {
    let json: any = uploadToIpfs(file);
    if (json) {
      json.then(res => {
        console.log(res)
        setIpfsMedia(`https://ipfs.io/ipfs/${res.Hash}?filename=${res.Name}`);
      })
    }
  }

  const onName = async (e: any) => {
    setName(e.target.value);
  }

  const onDescription = async (e: any) => {
    setDescription(e.target.value);
  }

  const onWebsite = async (e: any) => {
    setWebsite(e.target.value);
  }

  const onYoutube = async (e: any) => {
    setYoutube(e.target.value);
  }

  const setMetadataJson = () => {
    const jsonData = {
      "name": `${name}`,
      "description": `${description}`,
      "image":`${ipfsImage}`,
      "external_url":`${website}`,
      "youtube_url":`${youtube}`,
      "animation_url":`${ipfsMedia}`,
      "blocks_data":``
  }
    setMetadata(JSON.stringify(jsonData));

  }

  const calculateContractAddress = async (address: string) => {
    const count = await web3.eth.getTransactionCount(address);
    console.log(count)
    const nonce = web3Utils.toHex(count) //The nonce must be a hex literal!
    console.log(nonce)
    const sender = address; //Requires a hex string as input!

    let input_arr = [ sender, nonce ];
    let rlp_encoded = rlp.encode(input_arr);

    let contract_address_long = keccak('keccak256').update(rlp_encoded).digest('hex');

    const contract_address = contract_address_long.substring(24); //Trim the first 24 characters.
    console.log("0x" + contract_address)
    setContractAddress("0x" + contract_address);
  }

  const blocksDataTransaction = () => {
      setMetadataJson();
      console.log(metadata)
      //Connect to Ethereum through the Metamask Provider
      let provider: any;
      provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Connect to the BLOCKS Smart Contract via the contract address, abi and provider
      const contract = new ethers.Contract(blocksData.blocksAddress, blocksData.blocksAbi, provider);
      let contractSigner = contract.connect(signer);

      //When connecting to the xDAI Network use blocksData.blocksXdaiAddress above.
      //When connecting to the Polygon Network use blocksData.blocksPolygonAddress above.

      //Define the data you want to insert on-chain and convert to hex
      let dataConverted = web3Utils.toHex(metadata);

      //You can send any amount of BLOCKS tokens with the transaction. BigNumber helps JavaScript deal with large numbers involving BLOCKS' 18 decimals. In this case we are sending 2 BLOCKS.
      let amount = new BigNumber(2000000000000000000);
      console.log(amount.toFixed())

      //Now you can call the "send" function by entering a receiving address, amount and the converted data.
      let receivingAddress = "0xf0e3ea754D038b979CD0124e2f1A4Bf44f32746a"
      contractSigner.send(receivingAddress, amount.toFixed(), dataConverted).then((tx: any)=>{
        if(tx){
          //View the transaction response and get the transaction hash
          console.log(tx)
          alert(tx.hash);
          setTransaction(tx.hash);
          setContractAddress("")
        }
      }).catch((e: any) => {
        alert(e.message);
        setTransaction("");
      });
  }

  const clear = () => {
    setFile("");
    setViewFile("");
    setMediaFile("");
    setViewMediaFile("");
    setName("");
    setDescription("");
    setYoutube("");
    setWebsite("");
    setTransaction("");
    setContractAddress("");
    setIpfsImage("");
    setIpfsMedia("");
    setMetadata("");
  }

  useEffect(() => {
    if (window.ethereum && !contractAddress) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
      .then((res:any) => {
        console.log(res[0])
        calculateContractAddress(res[0])
      })
      .catch((error: any) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          alert('Please connect to MetaMask.');
        } else {
          console.error(error);
        }
      });
    }
    setMetadataJson();
  }, [ipfsImage, ipfsMedia]);

  return (
      <div className="main">
        <h2>NFT Metadata Module</h2>
        <IonRow>
          <IonCol>
            <div>
              <input type='text' placeholder="Asset Name 'My NFT'" value={name} onChange={onName}/>
            </div>
            <div>
              <input type='text' placeholder="External URL 'https://myurl.com'" value={website} onChange={onWebsite}/>
            </div>
            <div>
              <input type='text' placeholder="Media URL 'https://myyoutubelink.com'" value={youtube} onChange={onYoutube}/>
            </div>  
            <div>
              <textarea placeholder="Asset Description" value={description} onChange={onDescription}/>
            </div>      
          </IonCol>
        </IonRow>
        <div className="col">
            <input
              type='file'
              name='image'
              ref={fileInput}
              onChange={onChange}
              style={{ display: 'none' }}
            />
            <IonButton
              className="button"
              color="danger"
              onClick={() => fileInput.current?.click()}>Upload Image File</IonButton>
            {file && viewFile &&
              <img className="upload-image" src={viewFile} />
            }
            <input
              type='file'
              name='image'
              ref={mediaInput}
              onChange={onMedia}
              style={{ display: 'none' }}
            />
            <IonButton
              className="button"
              color="danger"
              onClick={() => mediaInput.current?.click()}>Upload Media File</IonButton>
            {mediaFile && viewMediaFile &&
              <img className="upload-image" src={viewMediaFile} />
            }
        </div>
        <IonButton className="button" disabled={name === "" || description === "" || file === ""} color="danger" size="small" onClick={blocksDataTransaction}>Generate Metadata</IonButton>
        <IonButton className="button" disabled={name === "" && description === "" && file === ""} color="danger" fill="outline" size="small" onClick={clear}>CLEAR</IonButton>
      </div> 
  );
};

export default ExploreContainer;
