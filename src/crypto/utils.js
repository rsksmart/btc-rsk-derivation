var wallet = require('ethereumjs-wallet').default;
var bs58 = require('bs58');
var sha256 = require('js-sha256');
var convertHex = require('convert-hex');
var bitcoin = require('bitcoinjs-lib');
const { NETWORKS } = require('./constants');

const getDerivedRSKAddressInformation = function(btcPrivateKey){    
    //First check if the private key is valid!
    if (!isValidBtcPrivateKey(btcPrivateKey)) return null;
    
    let information = {};
    let privKeyBytes = _keyBtcToRskInBytes(btcPrivateKey);

    //Get RSK Address
    const myWallet = wallet.fromPrivateKey(Buffer.from(privKeyBytes));
    const addressInRskFormat = myWallet.getAddress();
    information.address = addressInRskFormat.toString('hex');

    //Get RSK Private Key    
    information.privateKey = Buffer.from(privKeyBytes).toString('hex');

    return information;
}

const getDerivedBTCAddressInformation = function(rskPrivateKey, networkType = NETWORKS.MAINNET){
    //First check if the private key is valid!
    if (!isValidRskPrivateKey(rskPrivateKey)) return null;
    let information = {};

    //Get BTC PrivateKey
    information.privateKey = _getBtcPrivateKey(rskPrivateKey, networkType);
    
    //Get bitcoin network
    const network = networkType == NETWORKS.MAINNET ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;    

    //Get BTC Address
    var keyPair = bitcoin.ECPair.fromWIF(information.privateKey, network);
    information.address = bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey,
        network: network            
    }).address;

    return information;
}

const isValidBtcPrivateKey = function(btcPrivateKey) {    
    try {
        bitcoin.ECPair.fromWIF(btcPrivateKey);
    } catch (error) {
        return false;
    }

    return true;
};

const isValidRskPrivateKey = function(rskPrivateKey) {
    try {
        const privateKeyBuffer = Buffer.from(rskPrivateKey, 'hex');
        wallet.fromPrivateKey(privateKeyBuffer);
    } catch (error) {        
        return false;
    }

    return true;
};

const _keyBtcToRskInBytes = function(privKeyAsExportedByBitcoinDumpprivkey) {
    var decodedKey = bs58.decode(privKeyAsExportedByBitcoinDumpprivkey);
    var privKeyBytes = decodedKey.slice(1, decodedKey.length - 5);
    return privKeyBytes;
};

const _getBtcPrivateKey = function(rskPrivateKey, network = NETWORKS.MAINNET) {
    if (!isValidRskPrivateKey(rskPrivateKey)) return null;

    var addressArray = convertHex.hexToBytes(rskPrivateKey);
    var partialResults = [];
    var result = [];

    if (network == NETWORKS.MAINNET) {
        partialResults.push(0x80);
    } else {
        partialResults.push(0xef);
    }

    for (var address of addressArray) {
        partialResults.push(address);
    }

    partialResults.push(0x01);
    var check = convertHex.hexToBytes(sha256(convertHex.hexToBytes(sha256(partialResults))));

    for (var partialResult of partialResults) {
        result.push(partialResult);
    }

    for (var i = 0; i < 4; i++) {
        result.push(check[i]);
    }

    return bs58.encode(result);
};

module.exports = {
    getDerivedRSKAddressInformation,
    getDerivedBTCAddressInformation,
    isValidBtcPrivateKey,
    isValidRskPrivateKey
};
