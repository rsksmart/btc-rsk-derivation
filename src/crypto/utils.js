var wallet = require('ethereumjs-wallet').default;
var bs58 = require('bs58');
var sha256 = require('js-sha256');
var convertHex = require('convert-hex');
var bitcoin = require('bitcoinjs-lib');
const { NETWORKS } = require('./constants');

const getDerivedRSKAddressInformation = function(btcPrivateKey, networkType){    
    //First check if the private key is valid!
    if (!isValidBtcPrivateKey(btcPrivateKey, networkType)) return null; 
    
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

    //Get BTC Address
    var keyPair = bitcoin.ECPair.fromWIF(information.privateKey, _getBitcoinNetwork(networkType));
    information.address = bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey,
        network: _getBitcoinNetwork(networkType)            
    }).address;

    return information;
}

const isValidBtcPrivateKey = function(btcPrivateKey, networkType = NETWORKS.MAINNET) {    
    try {        
        bitcoin.ECPair.fromWIF(
            btcPrivateKey, 
            _getBitcoinNetwork(networkType)
        );
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

const _getBitcoinNetwork = function(networkType) {
    //Get bitcoin network    
    return networkType == NETWORKS.MAINNET ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
}

const _keyBtcToRskInBytes = function(privKeyAsExportedByBitcoinDumpprivkey) {
    var decodedKey = bs58.decode(privKeyAsExportedByBitcoinDumpprivkey);
    var privKeyBytes = decodedKey.slice(1, decodedKey.length - 5);
    return privKeyBytes;
};

const _getBtcPrivateKey = function(rskPrivateKey, networkType = NETWORKS.MAINNET) {
    if (!isValidRskPrivateKey(rskPrivateKey)) return null;
    if (networkType != NETWORKS.MAINNET && networkType != NETWORKS.TESTNET) return null;

    var addressArray = convertHex.hexToBytes(rskPrivateKey);
    var partialResults = [];
    var result = [];

    if (networkType == NETWORKS.MAINNET) {
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
