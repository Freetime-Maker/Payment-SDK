const PaymentSDKExtension = {
  declared: false,
  
  declareExtension() {
    if (this.declared) return;
    this.declared = true;

    // Initialize state
    this.state = {
      initialized: false,
      wallets: {}, // { coinType: { address, name } }
      acceptedCryptos: new Set(),
      transactions: {}, // { txHash: { from, to, amount, coin, timestamp } }
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
    };

    // Register actions
    registerAction('paymentSDK::initializeSDK', {
      handler: this.onInitializePaymentSDK.bind(this),
      fullName: 'Initialize Payment SDK',
      description: 'Set up the Payment SDK',
      sentence: 'Initialize Payment SDK'
    });

    registerAction('paymentSDK::setWallet', {
      handler: this.onSetUserWalletAddress.bind(this),
      fullName: 'Set User Wallet Address',
      description: 'Configure wallet for a cryptocurrency',
      sentence: 'Set wallet _PARAM0_ to _PARAM1_',
      parameters: [
        { name: 'coinType', type: 'string' },
        { name: 'address', type: 'string' },
        { name: 'name', type: 'string', optional: true }
      ]
    });

    registerAction('paymentSDK::setAcceptedCryptos', {
      handler: this.onSetAcceptedCryptocurrencies.bind(this),
      fullName: 'Set Accepted Cryptocurrencies',
      description: 'Define which cryptocurrencies to accept',
      sentence: 'Set accepted cryptocurrencies to _PARAM0_',
      parameters: [
        { name: 'cryptocurrencies', type: 'string' }
      ]
    });

    registerAction('paymentSDK::sendCrypto', {
      handler: this.onSendCryptocurrency.bind(this),
      fullName: 'Send Cryptocurrency',
      description: 'Send cryptocurrency payment',
      sentence: 'Send _PARAM3_ from _PARAM0_ to _PARAM1_ for _PARAM2_',
      parameters: [
        { name: 'fromAddress', type: 'string' },
        { name: 'toAddress', type: 'string' },
        { name: 'amount', type: 'number' },
        { name: 'coinType', type: 'string' },
        { name: 'includeFees', type: 'boolean', optional: true }
      ]
    });

    registerAction('paymentSDK::processDonation', {
      handler: this.onProcessDonation.bind(this),
      fullName: 'Process Donation',
      description: 'Process a cryptocurrency donation',
      sentence: 'Process _PARAM1_ donation of _PARAM0_',
      parameters: [
        { name: 'amount', type: 'number' },
        { name: 'coinType', type: 'string' },
        { name: 'donorWallet', type: 'string' },
        { name: 'noFees', type: 'boolean', optional: true }
      ]
    });

    registerAction('paymentSDK::convertUSDToCrypto', {
      handler: this.onConvertUSDToCryptocurrency.bind(this),
      fullName: 'Convert USD to Cryptocurrency',
      description: 'Convert from USD to cryptocurrency',
      sentence: 'Convert _PARAM0_ USD to _PARAM1_',
      parameters: [
        { name: 'usdAmount', type: 'number' },
        { name: 'coinType', type: 'string' }
      ]
    });

    // Register conditions
    registerCondition('paymentSDK::isInitialized', {
      handler: this.conditionIsSDKInitialized.bind(this),
      fullName: 'Is SDK Initialized',
      description: 'Check if Payment SDK is initialized',
      sentence: 'Payment SDK is initialized'
    });

    registerCondition('paymentSDK::isWalletConfigured', {
      handler: this.conditionIsWalletConfigured.bind(this),
      fullName: 'Is Wallet Configured',
      description: 'Check if wallet is configured for cryptocurrency',
      sentence: 'Wallet is configured for _PARAM0_',
      parameters: [
        { name: 'coinType', type: 'string' }
      ]
    });

    registerCondition('paymentSDK::isCryptoAccepted', {
      handler: this.conditionIsCryptocurrencyAccepted.bind(this),
      fullName: 'Is Cryptocurrency Accepted',
      description: 'Check if cryptocurrency is in accepted list',
      sentence: '_PARAM0_ is accepted',
      parameters: [
        { name: 'coinType', type: 'string' }
      ]
    });

    registerCondition('paymentSDK::isTransactionConfirmed', {
      handler: this.conditionIsTransactionConfirmed.bind(this),
      fullName: 'Is Transaction Confirmed',
      description: 'Check if transaction is confirmed',
      sentence: 'Transaction _PARAM0_ is confirmed',
      parameters: [
        { name: 'txHash', type: 'string' }
      ]
    });

    // Register expressions (return values)
    registerExpression('paymentSDK::txHash', {
      handler: this.expressionGetTransactionHash.bind(this),
      fullName: 'Get Transaction Hash',
      description: 'Get the last transaction hash',
      sentence: 'Last transaction hash'
    });

    registerExpression('paymentSDK::walletAddress', {
      handler: this.expressionGetWalletAddress.bind(this),
      fullName: 'Get Wallet Address',
      description: 'Get wallet address for cryptocurrency',
      sentence: 'Wallet address for _PARAM0_',
      parameters: [
        { name: 'coinType', type: 'string' }
      ]
    });

    registerExpression('paymentSDK::convertedAmount', {
      handler: this.expressionGetConvertedAmount.bind(this),
      fullName: 'Get Converted Amount',
      description: 'Get the last converted amount',
      sentence: 'Converted amount'
    });

    registerExpression('paymentSDK::feeEstimate', {
      handler: this.expressionGetFeeEstimate.bind(this),
      fullName: 'Get Fee Estimate',
      description: 'Get fee estimate for transaction',
      sentence: 'Fee estimate'
    });

    registerExpression('paymentSDK::txConfirmations', {
      handler: this.expressionGetTransactionConfirmations.bind(this),
      fullName: 'Get Transaction Confirmations',
      description: 'Get number of confirmations',
      sentence: 'Confirmations for _PARAM0_',
      parameters: [
        { name: 'txHash', type: 'string' }
      ]
    });

    registerExpression('paymentSDK::deepLink', {
      handler: this.expressionGetDeepLink.bind(this),
      fullName: 'Get Deep Link',
      description: 'Get payment deep link',
      sentence: 'Payment deep link'
    });

    registerExpression('paymentSDK::sdkVersion', {
      handler: this.expressionGetSDKVersion.bind(this),
      fullName: 'Get SDK Version',
      description: 'Get SDK version',
      sentence: 'SDK version'
    });
  },

  // Action handlers
  onInitializePaymentSDK() {
    this.state.initialized = true;
    console.log('Payment SDK initialized');
  },

  onSetUserWalletAddress(coinType, address, name) {
    this.state.wallets[coinType] = {
      address: address,
      name: name || coinType
    };
    console.log(`Wallet set for ${coinType}: ${address}`);
  },

  onSetAcceptedCryptocurrencies(cryptocurrencies) {
    const cryptoList = cryptocurrencies.split(',').map(c => c.trim());
    this.state.acceptedCryptos = new Set(cryptoList);
    console.log(`Accepted cryptos: ${cryptoList.join(', ')}`);
  },

  onSendCryptocurrency(fromAddr, toAddr, amount, coinType, includeFees) {
    const fee = includeFees ? amount * 0.001 : 0;
    const totalAmount = amount + fee;
    
    const txHash = 'tx_' + Math.random().toString(36).substr(2, 9);
    this.state.transactions[txHash] = {
      from: fromAddr,
      to: toAddr,
      amount: totalAmount,
      coin: coinType,
      timestamp: Date.now(),
      confirmations: 0
    };
    
    this.state.lastTxHash = txHash;
    this.state.lastFeeEstimate = fee;
    console.log(`Sent ${totalAmount} ${coinType} from ${fromAddr} to ${toAddr}`);
  },

  onProcessDonation(amount, coinType, donorWallet, noFees) {
    const fee = noFees ? 0 : amount * 0.001;
    const netAmount = noFees ? amount : amount - fee;
    
    const txHash = 'donation_' + Math.random().toString(36).substr(2, 9);
    this.state.transactions[txHash] = {
      from: donorWallet,
      to: 'donation',
      amount: netAmount,
      coin: coinType,
      timestamp: Date.now(),
      confirmations: 0,
      isDonation: true
    };
    
    this.state.lastTxHash = txHash;
    console.log(`Donation processed: ${netAmount} ${coinType} from ${donorWallet}`);
  },

  onConvertUSDToCryptocurrency(usdAmount, coinType) {
    const rate = this.state.conversionRates[coinType] || 1;
    const cryptoAmount = usdAmount / rate;
    this.state.lastConvertedAmount = cryptoAmount;
    console.log(`Converted ${usdAmount} USD to ${cryptoAmount} ${coinType}`);
  },

  // Condition handlers
  conditionIsSDKInitialized() {
    return this.state.initialized;
  },

  conditionIsWalletConfigured(coinType) {
    return coinType in this.state.wallets;
  },

  conditionIsCryptocurrencyAccepted(coinType) {
    return this.state.acceptedCryptos.has(coinType);
  },

  conditionIsTransactionConfirmed(txHash) {
    const tx = this.state.transactions[txHash];
    if (!tx) return false;
    // Simulate confirmations after 10 seconds
    const elapsed = Date.now() - tx.timestamp;
    tx.confirmations = Math.floor(elapsed / 1000);
    return tx.confirmations > 0;
  },

  // Expression handlers (return values)
  expressionGetTransactionHash() {
    return this.state.lastTxHash || '';
  },

  expressionGetWalletAddress(coinType) {
    const wallet = this.state.wallets[coinType];
    return wallet ? wallet.address : '';
  },

  expressionGetConvertedAmount() {
    return this.state.lastConvertedAmount || 0;
  },

  expressionGetFeeEstimate() {
    return this.state.lastFeeEstimate || 0;
  },

  expressionGetTransactionConfirmations(txHash) {
    const tx = this.state.transactions[txHash];
    if (!tx) return 0;
    const elapsed = Date.now() - tx.timestamp;
    return Math.floor(elapsed / 1000);
  },

  expressionGetDeepLink() {
    return this.state.lastTxHash ? `paymentSDK://tx/${this.state.lastTxHash}` : '';
  },

  expressionGetSDKVersion() {
    return '1.0.0';
  }
};

// Mock registration functions (for testing outside GDevelop)
function registerAction(id, config) {
  console.log(`Action registered: ${id}`);
}

function registerCondition(id, config) {
  console.log(`Condition registered: ${id}`);
}

function registerExpression(id, config) {
  console.log(`Expression registered: ${id}`);
}

// For use in GDevelop environment, export the extension
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PaymentSDKExtension;
}
