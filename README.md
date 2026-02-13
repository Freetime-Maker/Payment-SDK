# PaymentSDK - Crypto Payments & Donations for GDevelop

A powerful GDevelop extension that enables you to accept cryptocurrency payments and donations directly in your games. This is the official GDevelop port of [FreetimeSDK](https://github.com/FreetimeMaker/FreetimeSDK) from FreetimeMaker.

## Features

- 🪙 **Multiple Cryptocurrency Support** - Accept various cryptocurrencies in your games
- 💳 **Flexible Payment System** - Integrated payment processing for game monetization
- 🎁 **Donation Support** - Enable players to donate to your projects
- ⚡ **Easy Integration** - Simple setup and implementation in GDevelop
- 🔒 **Secure Transactions** - Built on proven cryptocurrency infrastructure

## Supported Cryptocurrencies

The PaymentSDK supports the following cryptocurrencies:

| Symbol | Name | Network |
|--------|------|---------|
| BTC | Bitcoin | Bitcoin |
| ETH | Ethereum | Ethereum |
| LTC | Litecoin | Litecoin |
| BCH | Bitcoin Cash | Bitcoin Cash |
| ADA | Cardano | Cardano |
| DOT | Polkadot | Polkadot |
| LINK | Chainlink | Ethereum |
| XLM | Stellar | Stellar |
| DOGE | Dogecoin | Dogecoin |
| XRP | Ripple | Ripple |
| SOL | Solana | Solana |
| AVAX | Avalanche | Avalanche |
| MATIC | Polygon | Polygon |
| BNB | Binance Coin | Binance Smart Chain |
| TRX | Tron | Tron |

## Installation

1. Open your GDevelop project
2. Go to **Create a new extension** or **Manage extensions**
3. Search for **PaymentSDK**
4. Install the extension

## Usage

Once installed, you can use PaymentSDK events in your game to:

- Process crypto payments from players
- Accept donations for your game
- Track transaction status
- Manage payment confirmations

For detailed usage examples and documentation, refer to the [official documentation](https://github.com/FreetimeMaker/Payment-SDK).

## API Reference

### Payment Functions

#### Create Payment Address
```
createPaymentAddress(amount, customerReference?, description?, providedWallet?, forwardToAddress?)
```
Creates a temporary payment address for receiving crypto payments.
- **Returns:** `PaymentRequest` with payment details and address

#### Check Payment Status
```
checkPaymentStatus(paymentId)
```
Checks the current status of a payment transaction.
- **Returns:** `PaymentStatus` (PENDING, CONFIRMED, EXPIRED, FAILED)

#### Send Crypto
```
send(fromAddress, toAddress, amount, coinType)
```
Sends cryptocurrency from one address to another with automatic fee calculation.
- **Returns:** `TransactionWithFees` containing transaction details and fee breakdown

#### Get Fee Estimate
```
getFeeEstimate(fromAddress, toAddress, amount, coinType)
```
Estimates transaction fees before sending.
- **Returns:** `BigDecimal` fee amount

#### Validate Address
```
validateAddress(address, coinType)
```
Validates if an address format is correct for the given cryptocurrency.
- **Returns:** `Boolean` true if valid

### Wallet Management Functions

#### Set Wallet Address
```
setUserWalletAddress(coinType, address, name?, isAccepted?)
```
Configures a wallet address for receiving payments.

#### Get User Wallet
```
getUserWalletAddress(coinType)
```
Retrieves the configured wallet address for a cryptocurrency.
- **Returns:** `String?` wallet address or null

#### Check Wallet Configuration
```
hasUserWallet(coinType)
```
Checks if a wallet is configured for a cryptocurrency.
- **Returns:** `Boolean`

#### Get All Wallets
```
getAllUserWallets()
```
Retrieves all configured user wallets.
- **Returns:** `Map<CoinType, UserWalletConfig>`

#### Validate Required Wallets
```
validateAllRequiredWallets()
```
Validates that all required wallets are properly configured.
- **Returns:** `Boolean`

#### Get Missing Wallets
```
getMissingWalletConfigurations()
```
Lists which wallets still need to be configured.
- **Returns:** `List<CoinType>` of unconfigured cryptocurrencies

### Cryptocurrency Selection Functions

#### Set Accepted Cryptocurrencies
```
setAcceptedCryptocurrencies(cryptocurrencies)
```
Defines which cryptocurrencies your game will accept.

#### Add Cryptocurrency
```
addAcceptedCryptocurrency(coinType)
```
Adds a cryptocurrency to the list of accepted currencies.

#### Remove Cryptocurrency
```
removeAcceptedCryptocurrency(coinType)
```
Removes a cryptocurrency from the accepted list.

#### Get Accepted Cryptocurrencies
```
getAcceptedCryptocurrencies()
```
Returns all cryptocurrencies currently being accepted.
- **Returns:** `Set<CoinType>`

#### Check if Cryptocurrency Accepted
```
isCryptocurrencyAccepted(coinType)
```
Checks if a specific cryptocurrency is accepted.
- **Returns:** `Boolean`

#### Get Payment Options
```
getSupportedPaymentOptions()
```
Gets a list of available payment options for the player.
- **Returns:** `List<CoinType>` of available cryptocurrencies

### Donation Functions

#### Create Donation
```
donate(toAddress, amount, coinType, donorName?, donationMessage?)
```
Creates a donation transaction with optional donor information.
- **Returns:** `DonationWithFees` with donation details

#### Create Donation Without Fees
```
donateWithoutFees(toAddress, amount, coinType, donorName?, donationMessage?)
```
Creates a donation transaction without processing fees.
- **Returns:** `Donation`

#### Broadcast Donation
```
broadcastDonation(donation)
```
Sends a signed donation to the blockchain.
- **Returns:** `String` transaction ID

#### Get Donation Fee Estimate
```
getDonationFeeEstimate(toAddress, amount, coinType)
```
Estimates fees for a donation.
- **Returns:** `BigDecimal` fee amount

#### Validate Donation Amount
```
validateDonationAmount(amount, coinType)
```
Validates if a donation amount is acceptable.
- **Returns:** `Boolean`

### Currency Conversion Functions

#### Convert USD to Crypto
```
convertUsdToCrypto(usdAmount, coinType)
```
Converts US Dollars to cryptocurrency at current exchange rate.
- **Returns:** `ConversionResult` with crypto amount and exchange rate

#### Convert Crypto to USD
```
convertCryptoToUsd(cryptoAmount, coinType)
```
Converts cryptocurrency to US Dollars.
- **Returns:** `ConversionResult` with USD amount and rate

#### Get Exchange Rates
```
getAllExchangeRates()
```
Retrieves current exchange rates for all supported cryptocurrencies.
- **Returns:** `Map<CoinType, BigDecimal>`

### Payment Gateway Functions

#### Create USD Payment Request
```
createUsdPaymentRequest(usdAmount, customerReference?, description?, providedWallet?, forwardToAddress?)
```
Creates a USD payment request (automatically converted to crypto).
- **Returns:** `UsdPaymentRequest`

#### Create Payment Gateway
```
createUsdPaymentGateway(merchantWalletAddress, merchantCoinType)
```
Creates a payment gateway for accepting payments.
- **Returns:** `UsdPaymentGateway`

#### Create Payment With Wallet Selection
```
createUsdPaymentWithWalletSelection(usdAmount)
```
Creates a payment request where the customer can select their preferred wallet.
- **Returns:** `UsdPaymentRequestWithWalletSelection`

### External Wallet Functions

#### Get Available Wallet Apps
```
getAvailableWalletApps(coinType)
```
Gets a list of supported cryptocurrency wallet applications.
- **Returns:** `List<ExternalWalletApp>`

#### Generate Payment Deep Link
```
generatePaymentDeepLink(walletApp, address, amount, coinType)
```
Generates a deep link to open payment in a specific wallet app.
- **Returns:** `String` deep link URL

#### Supported Wallet Apps
- Trust Wallet
- MetaMask
- Coinbase Wallet
- Binance Wallet
- Exodus
- Atomic Wallet
- Ledger Live
- Trezor Suite
- Mycelium
- Electrum
- Brave Wallet
- Rainbow Wallet
- WalletConnect
- Phantom Wallet
- Solflare Wallet
- And many more...

### Fee Management Functions

#### Get Developer Fee
```
getDeveloperFeePercentage(amount)
```
Calculates the developer fee percentage for a transaction.
- **Returns:** `BigDecimal` percentage

#### Get Fee Tier
```
getFeeTier(amount)
```
Determines which fee tier applies to a transaction amount.
- **Returns:** `String` (Small, Medium, Large, Very Large, Whale)

#### Calculate Total Fees
```
calculateTotalFees(amount, networkFee, coinType)
```
Calculates complete fee breakdown for a transaction.
- **Returns:** `FeeBreakdown` with detailed fee information

#### Update Developer Wallet
```
updateDeveloperWallet(coinType, address)
```
Updates the wallet address where developer fees are sent.

#### Fee Structure

| Amount Range | Developer Fee |
|--------------|---------------|
| < $10 | 0.5% |
| $10 - $100 | 0.3% |
| $100 - $1,000 | 0.2% |
| $1,000 - $10,000 | 0.1% |
| > $10,000 | 0.05% |

### Game Integration Functions

#### Register Game
```
registerGame(gameId, game)
```
Registers a custom game with the SDK.

#### Get Available Games
```
getAvailableGames()
```
Retrieves all registered games.
- **Returns:** `Map<String, GameInterface>`

#### Play Game With Payment
```
playGameWithPayment(playerId, username, gameId, amount, coinType, gameData?)
```
Executes a game with payment processing.
- **Returns:** `GameSessionResult`

#### Get Game History
```
getGameHistory()
```
Retrieves the player's game history.
- **Returns:** `List<GameResult>`

### Player Functions

#### Get or Create Player Profile
```
getOrCreatePlayerProfile(playerId, username)
```
Gets existing player profile or creates a new one.
- **Returns:** `PlayerProfile`

#### Get Player Statistics
```
getPlayerStatistics(playerId)
```
Retrieves detailed player statistics.
- **Returns:** `PlayerStatistics`

#### Get Player Achievements
```
getPlayerAchievements(playerId)
```
Gets all achievements unlocked by a player.
- **Returns:** `Set<Achievement>`

#### Get Leaderboard
```
getLeaderboard(limit?)
```
Retrieves the global leaderboard.
- **Returns:** `List<PlayerStatistics>`

## Data Models

### PaymentStatus Enum
- `PENDING` - Payment awaiting confirmation
- `CONFIRMED` - Payment successfully confirmed
- `EXPIRED` - Payment request expired
- `FAILED` - Payment failed
- `FORWARDING_FAILED` - Could not forward payment
- `NOT_FOUND` - Payment not found

### CoinType Enum
All supported cryptocurrencies listed above (BTC, ETH, LTC, etc.)

### GameType Enum
- `CUSTOM_GAME` - Your custom game implementation
- `DICE` - Dice game
- `SLOTS` - Slot machine game
- `ROULETTE` - Roulette game
- `BLACKJACK` - Blackjack game
- `POKER` - Poker game

## About FreetimeSDK

This extension is based on [FreetimeSDK](https://github.com/FreetimeMaker/FreetimeSDK), an Android port for GDevelop developed by FreetimeMaker. The original SDK provides robust cryptocurrency payment handling for mobile games.

## Links

- 🔗 [Payment-SDK Repository](https://github.com/FreetimeMaker/Payment-SDK)
- 🔗 [FreetimeSDK Repository](https://github.com/FreetimeMaker/FreetimeSDK)
- 📖 [GDevelop Documentation](https://wiki.gdevelop.io/)

## License

This project is licensed under the Apache-2.0 License. See [LICENSE](./LICENSE) for details.

## Support

For issues, feature requests, or questions, please open an issue on the [GitHub Repository](https://github.com/FreetimeMaker/Payment-SDK).

---

**Created by:** FreetimeMaker  
**Version:** 1.0.0
