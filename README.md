# btc-rsk-derivation
This tool can be used to derive a BTC private key from an RSK private key and address, and vice versa.

**You can derive RSK addresses from any valid BTC private key using this tool, but you may only derive RSK private keys from P2PKH BTC private keys.
This is an RSK limitation.**

## Requirements

run `npm install`.

## Methods

### isValidBtcPrivateKey
Given a `string` representing a BTC private key (in WIF format) and the network(`mainnet` or `testnet`), this function will indicate with a `boolean` if the private key is valid or not.

### isValidRskPrivateKey
Given a `string` representing a RSK private key, this function will indicate with a `boolean` if the private key is valid or not.

### getDerivedRSKAddressInformation
Given a `string` representing a BTC private key (in WIF format) and the network(`mainnet` or `testnet`), this function will return derived information. It includes the RSK address and private key. e.g.:

```
{
 address: '36eb6a1d1720a6037d0680b8b357fc661a24bfdc',
 privateKey: '2cfc1062d5beff50764f3d1b7a8d2d67ac4736c14caceeeb956bcc815c8a0708'
}
```

### getDerivedBTCAddressInformation
Given a `string` representing a RSK private key and the network(`mainnet` or `testnet`) , this function will return derived information. It includes the BTC address (`p2pkh`) and private key. e.g.:

```
{
 address: '17G5dLTzxnZAWgbBpAVQfi8nGLXo6P4WFV',
 privateKey: 'Kxj9x4G2Uvw8CbngATxGZLY4K2EFkjty7mumLabJQEhHw9ZLyZTs'
}
```

### getNetworkTypes
Returns bitcoin networks. e.g.:
```
{
    MAINNET: 'mainnet',
    TESTNET: 'testnet'
}
```

## How to use it

### NodeJs

Require the package and use the available methods.

Sample usage:

**BTC --> RSK**

```javascript
const btcRskDerivation = require('@rsksmart/btc-rsk-derivation');
let btcPrivateKey = 'Kxj9x4G2Uvw8CbngATxGZLY4K2EFkjty7mumLabJQEhHw9ZLyZTs';
let addressInformation = btcRskDerivation.getDerivedRSKAddressInformation(btcPrivateKey);
console.log(`RSK Address ${addressInformation.address}`);
console.log(`RSK PrivateKey ${addressInformation.privateKey}`);
```

**RSK --> BTC**

```javascript
const btcRskDerivation = require('@rsksmart/btc-rsk-derivation');
let rskPrivateKey = '2cfc1062d5beff50764f3d1b7a8d2d67ac4736c14caceeeb956bcc815c8a0708';
let addressInformation = btcRskDerivation.getDerivedBTCAddressInformation(rskPrivateKey);
console.log(`BTC Address ${addressInformation.address}`);
console.log(`BTC PrivateKey ${addressInformation.privateKey}`);
```