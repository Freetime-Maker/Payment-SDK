module.exports = {
  createExtension: function(runtimeScene) {
    const extension = {
      name: 'PaymentSDK',
      version: '1.0.0',
      
      // Extension metadata
      extensionProperties: {
        name: 'PaymentSDK',
        fullName: 'PaymentSDK - Crypto Payments & Donations',
        category: 'Network',
        description: 'Accept cryptocurrency payments and donations in your GDevelop games.',
        version: '1.0.0',
        authorIds: ['OAukac52NaXxAEaa7e3XaqhS0H32'],
        icon: 'https://asset-resources.gdevelop.io/public-resources/Icons/Glyphster Pack/Master/SVG/Shopping and Ecommerce/b19e495f428ad0a21a0079b2941368d4c264de3477e5b9099192a038c0da3f09_Shopping and Ecommerce_wallet_money_cash.svg'
      },

      // State management
      state: {
        initialized: false,
        wallets: {},
        acceptedCryptos: new Set(),
        transactions: {},
        lastTxHash: null,
        lastFeeEstimate: null,
        lastConvertedAmount: null,
        conversionRates: {
          'BTC': 43000,
          'ETH': 2300,
          'LTC': 100,
          'SOL': 145,
          'MATIC': 1.1,
          'AVAX': 80,
          'BNB': 610,
          'ADA': 0.65,
          'DOGE': 0.35,
          'XRP': 2.5
        }
      },

      // Actions
      onInitializePaymentSDK: function() {
        extension.state.initialized = true;
      },

      onSetUserWalletAddress: function(coinType, address, name) {
        extension.state.wallets[coinType] = {
          address: address,
          name: name || coinType
        };
      },

      onSetAcceptedCryptocurrencies: function(cryptocurrencies) {
        const cryptoList = cryptocurrencies.split(',').map(c => c.trim());
        extension.state.acceptedCryptos = new Set(cryptoList);
      },

      onSendCryptocurrency: function(fromAddr, toAddr, amount, coinType, includeFees) {
        const fee = includeFees ? amount * 0.001 : 0;
        const totalAmount = amount + fee;
        
        const txHash = 'tx_' + Math.random().toString(36).substr(2, 9);
        extension.state.transactions[txHash] = {
          from: fromAddr,
          to: toAddr,
          amount: totalAmount,
          coin: coinType,
          timestamp: Date.now(),
          confirmations: 0
        };
        
        extension.state.lastTxHash = txHash;
        extension.state.lastFeeEstimate = fee;
      },

      onProcessDonation: function(amount, coinType, donorWallet, noFees) {
        const fee = noFees ? 0 : amount * 0.001;
        const netAmount = noFees ? amount : amount - fee;
        
        const txHash = 'donation_' + Math.random().toString(36).substr(2, 9);
        extension.state.transactions[txHash] = {
          from: donorWallet,
          to: 'donation',
          amount: netAmount,
          coin: coinType,
          timestamp: Date.now(),
          confirmations: 0,
          isDonation: true
        };
        
        extension.state.lastTxHash = txHash;
      },

      onConvertUSDToCryptocurrency: function(usdAmount, coinType) {
        const rate = extension.state.conversionRates[coinType] || 1;
        const cryptoAmount = usdAmount / rate;
        extension.state.lastConvertedAmount = cryptoAmount;
      },

      // Conditions
      conditionIsSDKInitialized: function() {
        return extension.state.initialized;
      },

      conditionIsWalletConfigured: function(coinType) {
        return coinType in extension.state.wallets;
      },

      conditionIsCryptocurrencyAccepted: function(coinType) {
        return extension.state.acceptedCryptos.has(coinType);
      },

      conditionIsTransactionConfirmed: function(txHash) {
        const tx = extension.state.transactions[txHash];
        if (!tx) return false;
        const elapsed = Date.now() - tx.timestamp;
        tx.confirmations = Math.floor(elapsed / 1000);
        return tx.confirmations > 0;
      },

      // Expressions (return values)
      expressionGetTransactionHash: function() {
        return extension.state.lastTxHash || '';
      },

      expressionGetWalletAddress: function(coinType) {
        const wallet = extension.state.wallets[coinType];
        return wallet ? wallet.address : '';
      },

      expressionGetConvertedAmount: function() {
        return extension.state.lastConvertedAmount || 0;
      },

      expressionGetFeeEstimate: function() {
        return extension.state.lastFeeEstimate || 0;
      },

      expressionGetTransactionConfirmations: function(txHash) {
        const tx = extension.state.transactions[txHash];
        if (!tx) return 0;
        const elapsed = Date.now() - tx.timestamp;
        return Math.floor(elapsed / 1000);
      },

      expressionGetDeepLink: function() {
        return extension.state.lastTxHash ? `paymentSDK://tx/${extension.state.lastTxHash}` : '';
      },

      expressionGetSDKVersion: function() {
        return '1.0.0';
      }
    };

    return extension;
  }
};
