var utils = require('./crypto/utils');
var { NETWORKS } = require('./crypto/constants');

module.exports = {
    getNetworkTypes: () => {
        return NETWORKS;
    },
    isValidBtcPrivateKey: (btcPrivateKey) => {        
        return utils.isValidBtcPrivateKey(btcPrivateKey);
    },
    isValidRskPrivateKey: (rskPrivateKey) => {
        return utils.isValidRskPrivateKey(rskPrivateKey);
    },
    getDerivedRSKAddressInformation: (btcPrivateKey) => {
        return utils.getDerivedRSKAddressInformation(btcPrivateKey);
    },
    getDerivedBTCAddressInformation: (rskPrivateKey, networkType) => {
        return utils.getDerivedBTCAddressInformation(rskPrivateKey, networkType);
    }
}