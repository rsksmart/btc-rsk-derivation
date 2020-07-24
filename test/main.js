  
const chai = require('chai');
const expect = chai.expect;

const validator = require('../src/main');
const { NETWORKS } = require('../src/crypto/constants');

function validBTC (btcPrivteKey) {
    var result = validator.isValidBtcPrivateKey(btcPrivteKey);
    expect(result).to.be.true;
}

function invalidBTC (btcPrivteKey) {
    var result = validator.isValidBtcPrivateKey(btcPrivteKey);
    expect(result).to.be.false;
}

function validRSK (rskPrivateKey) {
    var result = validator.isValidRskPrivateKey(rskPrivateKey);
    expect(result).to.be.true;
}

function invalidRSK (rskPrivateKey) {
    var result = validator.isValidRskPrivateKey(rskPrivateKey);
    expect(result).to.be.false;
}

function validGetDerivedRSKAddressInformation(btcPrivateKey, expectedAddress, expectedPrivateKey) {
    let result = validator.getDerivedRSKAddressInformation(btcPrivateKey);
    expect(result.address).to.be.equal(expectedAddress);
    expect(result.privateKey).to.be.equal(expectedPrivateKey);
}

function invalidGetDerivedRSKAddressInformation(btcPrivteKey) {
    let result = validator.getDerivedRSKAddressInformation(btcPrivteKey);
    expect(result).to.be.null;
}

function validGetDerivedBTCAddressInformation(rskPrivateKey, networkType = NETWORKS.MAINNET, expectedAddress, expectedPrivateKey) {
    let result = validator.getDerivedBTCAddressInformation(rskPrivateKey, networkType);
    expect(result.address).to.be.equal(expectedAddress);
    expect(result.privateKey).to.be.equal(expectedPrivateKey);
}

function invalidGetDerivedBTCAddressInformation(rskPrivateKey) {
    let result = validator.getDerivedBTCAddressInformation(rskPrivateKey);
    expect(result).to.be.null;
}


describe('isValidBtcPrivateKey tests', () => {
    it('valid BTC private key', () => {
        validBTC('Kxj9x4G2Uvw8CbngATxGZLY4K2EFkjty7mumLabJQEhHw9ZLyZTs');
        validBTC('L5eLLCcuBK8WGsSNcm8gBGp8cZUzsCviVF2DuPeiCaPpH1aiEmhE');
        validBTC('L5EZS1X7DYHjZNH8C44xZVUHRgHcJ3SjugmmArBuKDv1aTWfs878');
    });

    it('invalid cases', () => {
        invalidBTC('');
        invalidBTC(null);
        invalidBTC(1);
        invalidBTC('Ky4fD7LXsQ!!!!!!!QwTKq91g1LFFbRpFhuW4NeBJxn73Do2cSuze1NWcLY');
    });
});

describe('isValidRskPrivateKey tests', () => {    
    it('valid RSK private key', () => {
        validRSK('2cfc1062d5beff50764f3d1b7a8d2d67ac4736c14caceeeb956bcc815c8a0708');
        validRSK('fb5dc57846ff52e06dabbac6552ccc96d1abc9d9068b47ef63a7e51a551b6389');
        validRSK('ef22cf81749f9a3398c5b6fd88868e7e371857fbad6be1b4d7d1cc23c8598940');
    });

    it('invalid cases', () => {
        invalidRSK('');
        invalidRSK(null);
        invalidRSK(1);
        invalidRSK('ef22cf81749f9a3398c5b6fd88868e7e371857fbad6be1b4d7d1c');
    });
});

describe('getDerivedRSKAddressInformation tests', () => {
    it('should get info for BTC Private Key.', () => {
       validGetDerivedRSKAddressInformation('Kxj9x4G2Uvw8CbngATxGZLY4K2EFkjty7mumLabJQEhHw9ZLyZTs','36eb6a1d1720a6037d0680b8b357fc661a24bfdc', '2cfc1062d5beff50764f3d1b7a8d2d67ac4736c14caceeeb956bcc815c8a0708');
       validGetDerivedRSKAddressInformation('L5eLLCcuBK8WGsSNcm8gBGp8cZUzsCviVF2DuPeiCaPpH1aiEmhE','3f6ed7d236ccdb6b4cb07018793a206f9c1f93cc', 'fb5dc57846ff52e06dabbac6552ccc96d1abc9d9068b47ef63a7e51a551b6389');
       validGetDerivedRSKAddressInformation('L5EZS1X7DYHjZNH8C44xZVUHRgHcJ3SjugmmArBuKDv1aTWfs878','138811cdf0544996d39fc41fc2a5d428392ab123', 'ef22cf81749f9a3398c5b6fd88868e7e371857fbad6be1b4d7d1cc23c8598940');
    });

    it('invalid cases', () => {
        invalidGetDerivedRSKAddressInformation('');
        invalidGetDerivedRSKAddressInformation(null);
        invalidGetDerivedRSKAddressInformation(1);
        invalidRSK('L5EZS1X7DYHjZNH');
    });
});

describe('validGetDerivedBTCAddressInformation tests', () => {
    it('should get info for RSK Private Key', () => {                
        validGetDerivedBTCAddressInformation('2cfc1062d5beff50764f3d1b7a8d2d67ac4736c14caceeeb956bcc815c8a0708', NETWORKS.MAINNET, '17G5dLTzxnZAWgbBpAVQfi8nGLXo6P4WFV', 'Kxj9x4G2Uvw8CbngATxGZLY4K2EFkjty7mumLabJQEhHw9ZLyZTs');
        validGetDerivedBTCAddressInformation('fb5dc57846ff52e06dabbac6552ccc96d1abc9d9068b47ef63a7e51a551b6389', NETWORKS.MAINNET, '1MUXDPicEaoxS1rgKwyBaQprK9faKyNUwP', 'L5eLLCcuBK8WGsSNcm8gBGp8cZUzsCviVF2DuPeiCaPpH1aiEmhE');
        validGetDerivedBTCAddressInformation('ef22cf81749f9a3398c5b6fd88868e7e371857fbad6be1b4d7d1cc23c8598940', NETWORKS.MAINNET, '1Dt6oU5gdNqXZoPij5gJnqRNYE7oJSf8wA', 'L5EZS1X7DYHjZNH8C44xZVUHRgHcJ3SjugmmArBuKDv1aTWfs878');
        validGetDerivedBTCAddressInformation('dea308e091a6c44ec0d7cf1bc0e7b9a6351bb748bee0d0438ea4fe08789e9fc9', NETWORKS.MAINNET, '16oLJ4ynJBYEjLYHRwPHZ5CY5dkSTCkYTW', 'L4gVFKiWbWn3TAcGyiyq46CwBnAkLP7J6qXGHcvM3H6m6141iWYD');
        validGetDerivedBTCAddressInformation('2cfc1062d5beff50764f3d1b7a8d2d67ac4736c14caceeeb956bcc815c8a0708', NETWORKS.TESTNET, 'mmn2vPYymozRHo4oXjTnVdM78L8W3uX99b', 'cP69QyFsuzdPN3FwYsmPvf37wFXfRBzfBp4ET13ouMMJBtfW43sp');
        validGetDerivedBTCAddressInformation('fb5dc57846ff52e06dabbac6552ccc96d1abc9d9068b47ef63a7e51a551b6389', NETWORKS.TESTNET, 'n1zUWSob3cFDD8LJ3WwZQL3BB9GHEsD4B6', 'cW1Ko7ckcNpmSJue1AwoYbKCEnnQXf2QZHAh1p7Dhh3pXkgj7M85');
        validGetDerivedBTCAddressInformation('ef22cf81749f9a3398c5b6fd88868e7e371857fbad6be1b4d7d1cc23c8598940', NETWORKS.TESTNET, 'mtQ46XAfSQGnLusLSeegckdhQDiWDvsfZo', 'cVbYtvWxebyziokPaTt5voyM3ub1xVYRyivEHGeQpLa1qCYKiYQw');
        validGetDerivedBTCAddressInformation('dea308e091a6c44ec0d7cf1bc0e7b9a6351bb748bee0d0438ea4fe08789e9fc9', NETWORKS.TESTNET, 'mmKHb84m7CyVWT1u9WMfNzQrwdM9QZMkYv', 'cV3UiEiN2aUJcc5YN8nxRQhzp1U9zqCzAsfjQ3NrYPkmLk6g8y1c');
    });

    it('invalid cases', () => {
        invalidGetDerivedRSKAddressInformation('');
        invalidGetDerivedRSKAddressInformation(null);
        invalidGetDerivedRSKAddressInformation(1);
        invalidRSK('dea308e091a6c44ec0d7cf1bc0e7b9a6351bb748bee0d0438ea4fe0');
    });
});