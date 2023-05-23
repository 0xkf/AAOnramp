// // フロントエンドとコントラクトを連携するライブラリをインポートします。
// import { ethers } from 'ethers';
// // useEffect と useState 関数を React.js からインポートしています。
// import React, { useEffect, useState } from 'react';

// import twitterLogo from './assets/twitter-logo.svg';
// import './styles/App.css';
// import myEpicNft from './utils/MyEpicNFT.json';

// // Constantsを宣言する: constとは値書き換えを禁止した変数を宣言する方法です。
// const TWITTER_HANDLE = 'yuki4san';
// const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

// // コトントラクトアドレスをCONTRACT_ADDRESS変数に格納
// const CONTRACT_ADDRESS = '0xF7d8473eF4555B158689Ae8F3c1b39c246A1244E';

// const App = () => {
//   // ユーザーのウォレットアドレスを格納するために使用する状態変数を定義します。
//   const [currentAccount, setCurrentAccount] = useState('');

//   // setupEventListener 関数を定義します。
//   // MyEpicNFT.sol の中で event が emit された時に、
//   // 情報を受け取ります。
//   const setupEventListener = async () => {
//     try {
//       const { ethereum } = window;

//       if (ethereum) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const connectedContract = new ethers.Contract(
//           CONTRACT_ADDRESS,
//           myEpicNft.abi,
//           signer,
//         );

//         // Event が emit される際に、コントラクトから送信される情報を受け取っています。
//         connectedContract.on('NewEpicNFTMinted', (from, tokenId) => {
//           console.log(from, tokenId.toNumber());
//           alert(
//             `あなたのウォレットに NFT を送信しました。OpenSea に表示されるまで最大で10分かかることがあります。NFT へのリンクはこちらです: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`,
//           );
//         });

//         console.log('Setup event listener!');
//       } else {
//         console.log("Ethereum object doesn't exist!");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ユーザーが認証可能なウォレットアドレスを持っているか確認します。
//   const checkIfWalletIsConnected = async () => {
//     const { ethereum } = window;

//     if (!ethereum) {
//       console.log('Make sure you have MetaMask!');
//       return;
//     } else {
//       console.log('We have the ethereum object', ethereum);
//     }

//     // ユーザーが認証可能なウォレットアドレスを持っている場合は、ユーザーに対してウォレットへのアクセス許可を求める。許可されれば、ユーザーの最初のウォレットアドレスを accounts に格納する。
//     const accounts = await ethereum.request({ method: 'eth_accounts' });

//     if (accounts.length !== 0) {
//       const account = accounts[0];
//       console.log('Found an authorized account:', account);
//       setCurrentAccount(account);

//       // イベントリスナーを設定
//       // この時点で、ユーザーはウォレット接続が済んでいます。
//       setupEventListener();
//     } else {
//       console.log('No authorized account found');
//     }
//   };

//   // connectWallet メソッドを実装します。
//   const connectWallet = async () => {
//     try {
//       const { ethereum } = window;

//       if (!ethereum) {
//         alert('Get MetaMask!');
//         return;
//       }

//       // ウォレットアドレスに対してアクセスをリクエストしています。
//       const accounts = await ethereum.request({
//         method: 'eth_requestAccounts',
//       });

//       console.log('Connected', accounts[0]);

//       // ウォレットアドレスを currentAccount に紐付けます。
//       setCurrentAccount(accounts[0]);

//       // イベントリスナーを設定
//       setupEventListener();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // NFT を Mint する関数を定義しています。
//   const askContractToMintNft = async () => {
//     try {
//       const { ethereum } = window;

//       if (ethereum) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const connectedContract = new ethers.Contract(
//           CONTRACT_ADDRESS,
//           myEpicNft.abi,
//           signer,
//         );

//         console.log('Going to pop wallet now to pay gas...');
//         const nftTxn = await connectedContract.makeAnEpicNFT();

//         console.log('Mining...please wait.');
//         await nftTxn.wait();
//         console.log(nftTxn);
//         console.log(
//           `Mined, see transaction: https://sepolia.etherscan.io/tx/${nftTxn.hash}`,
//           // polygonに変更予定
//         );
//       } else {
//         console.log("Ethereum object doesn't exist!");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ページがロードされた際に下記が実行されます。
//   useEffect(() => {
//     checkIfWalletIsConnected();
//   }, []);

//   // renderNotConnectedContainer メソッド（ Connect to Wallet を表示する関数）を定義します。
//   const renderNotConnectedContainer = () => (
//     <button
//       onClick={connectWallet}
//       className="cta-button connect-wallet-button"
//     >
//       Connect to Wallet
//     </button>
//   );

//   // Mint NFT ボタンをレンダリングするメソッドを定義します。
//   const renderMintUI = () => (
//     <button
//       onClick={askContractToMintNft}
//       className="cta-button connect-wallet-button"
//     >
//       Mint NFT
//     </button>
//     // ボタン追加予定
//   );

//   return (
//     <div className="App">
//       <div className="container">
//         <div className="header-container">
//           <p className="header gradient-text">My NFT Collection</p>
//           <p className="sub-text">あなただけの特別な NFT を Mint しよう💫</p>
//           {currentAccount === ''
//             ? renderNotConnectedContainer()
//             : renderMintUI()}
//         </div>
//         <div className="footer-container">
//           <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
//           <a
//             className="footer-text"
//             href={TWITTER_LINK}
//             target="_blank"
//             rel="noreferrer"
//           >{`built on @${TWITTER_HANDLE}`}</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
// App.js
// useEffect と useState 関数を React.js からインポートしています。
// import myEpicNft from "package/client/src/utils/MyEpicNFT.json";
// import myEpicNft from "./utils/MyEpicNFT.json";
import Burnable from "./utils/Burnable.json";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import "./styles/App.css";
import twitterLogo from "./assets/twitter-logo.svg";
// Constantsを宣言する: constとは値書き換えを禁止した変数を宣言する方法です。
const TWITTER_HANDLE = "あなたのTwitterのハンドルネームを貼り付けてください";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;


const App = () => {
  /*
   * ユーザーのウォレットアドレスを格納するために使用する状態変数を定義します。
   */
  const [currentAccount, setCurrentAccount] = useState("");
  const [tokenIdToBurn, setTokenIdToBurn] = useState("");
  // /*この段階でcurrentAccountの中身は空*/
  console.log("currentAccount: ", currentAccount);
  /*
   * ユーザーが認証可能なウォレットアドレスを持っているか確認します。
   */
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have MetaMask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    /* ユーザーが認証可能なウォレットアドレスを持っている場合は、
     * ユーザーに対してウォレットへのアクセス許可を求める。
     * 許可されれば、ユーザーの最初のウォレットアドレスを
     * accounts に格納する。
     */
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  /*
   * connectWallet メソッドを実装します。
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      /*
       * ウォレットアドレスに対してアクセスをリクエストしています。
       */
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      /*
       * ウォレットアドレスを currentAccount に紐付けます。
       */
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const askContractToMintNft = async () => {
  // const CONTRACT_ADDRESS =
  //   "0xB8Df2D1224a3453c59fb0F47b93F9ff549b31F6C";
  const CONTRACT_ADDRESS =
  "0xf8b0F3F62C8909f0023f0E51972A37bF75f43aaC";

  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        Burnable.abi,
        signer
      );
      console.log("Going to pop wallet now to pay gas...");
      const nftTxn = await connectedContract.mintBurnable({value: ethers.utils.parseEther("0.01") });
      console.log("Minting...please wait.");
      await nftTxn.wait();

      console.log(
        // `Minetd, see transaction: https://sepolia.etherscan.io/tx/${nftTxn.hash}`
        `Minted, see transaction: https://polygonscan.com/tx/${nftTxn.hash}`
        
      );
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
};

const askContractToBurnNft = async () => {
  // const CONTRACT_ADDRESS = "0xB8Df2D1224a3453c59fb0F47b93F9ff549b31F6C";
  const CONTRACT_ADDRESS = "0xf8b0F3F62C8909f0023f0E51972A37bF75f43aaC";
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        Burnable.abi,
        signer
      );
      console.log("Going to pop wallet now to burn the token...");
      const nftTxn = await connectedContract.burn(tokenIdToBurn);
      console.log("Burning...please wait.");
      await nftTxn.wait();

      console.log(
        // `Burned, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`
        `Burned, see transaction: https://polygonscan.com/tx/${nftTxn.hash}`
      );
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
};

  // renderNotConnectedContainer メソッドを定義します。
  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet
    </button>
  );
  /*
   * ページがロードされたときに useEffect()内の関数が呼び出されます。
   */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">あなただけの特別な NFT を Mint しよう💫</p>
          条件付きレンダリングを追加しました
          // すでに接続されている場合は、
          // Connect to Walletを表示しないようにします。
          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
          <>
            <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
              Mint NFT
            </button>
            <input 
              type="text"
              placeholder="Token ID to Burn"
              onChange={(event) => setTokenIdToBurn(event.target.value)}
              value={tokenIdToBurn}
            />
            <button onClick={askContractToBurnNft} className="cta-button connect-wallet-button">
                Burn NFT
            </button>
          </>
          )}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};
export default App;