const getEtherscanURL = (address, networkId) => {
    if (networkId == 1) {
        return "https://etherscan.io/address/" + address;
    } else if (networkId == 4) {
        return "https://rinkeby.etherscan.io/address/" + address;
    }
}


export default getEtherscanURL
