module.exports = {
  pageLimit: 20,
  deploy: true,
  name: "Finger NFT",
  url: "http://fingernft.fingerchar.com",
  signMessage: "Welcome. Login Finger NFT Market. This is completely secure and doesn't cost anything!",
  decimal: 8,
  networks: [
    { channelId: 4, name: "ethereum rinkeby", coinSymbol:"ETH",symbol: "rinkeby", default: true, rpc: "https://testnet.movemarket.org/node/rinkeby",
      opensea: "https://testnets.opensea.io/assets/",
    },
  ],
  share: {
    twitter: "https://mobile.twitter.com",
    telegram: "https://t.me",
    email: "fingernft@example.com",
    youtube: "https://youtube.com/channel",
  },
}
