var utils = require('./crypto/utils');
var { NETWORKS } = require('./crypto/constants');

module.exports = {
    /**
     * Returns bitcoin networks.
     * 
     * @method getNetworkTypes
     * 
     * @returns {NETWORKS} BTC Networks.
     */
    getNetworkTypes: () => {
        return NETWORKS;
    },
    /**
     * Given a `string` representing a BTC private key, this function will indicate with a `boolean` if the private key is valid or not.
     * 
     * @method isValidBtcPrivateKey
     * 
     * @param {String} btcPrivateKey
     * 
     * @returns {Boolean}
     */
    isValidBtcPrivateKey: (btcPrivateKey) => {        
        return utils.isValidBtcPrivateKey(btcPrivateKey);
    },
    /**
     * Given a `string` representing a RSK private key, this function will indicate with a `boolean` if the private key is valid or not.
     * 
     * @method isValidRskPrivateKey
     * 
     * @param {String} rskPrivateKey 
     * 
     * @returns {Boolean} 
     */
    isValidRskPrivateKey: (rskPrivateKey) => {
        return utils.isValidRskPrivateKey(rskPrivateKey);
    },
    /**
     * Given a `string` representing a BTC private key, this function will return derived information. It includes the RSK address and private key.     
     * 
     * @method getDerivedRSKAddressInformation
     * 
     * @param {String} btcPrivateKey
     * 
     * @returns {Information}
     */
    getDerivedRSKAddressInformation: (btcPrivateKey) => {
        return utils.getDerivedRSKAddressInformation(btcPrivateKey);
    },
    /**
     * Given a `string` representing a RSK private key and the network(`mainnet` or `testnet`) , this function will return derived information. It includes the BTC address (`p2pkh`) and private key.
     * 
     * @method getDerivedBTCAddressInformation
     * 
     * @param {String} rskPrivateKey
     * 
     * @param {NETWORKS} [networkType]
     * 
     * @returns {Information}
     */
    getDerivedBTCAddressInformation: (rskPrivateKey, networkType) => {
        return utils.getDerivedBTCAddressInformation(rskPrivateKey, networkType);
    }
}