# Payment SDK - GDevelop Extension

Eine vollständig funktionsfähige GDevelop-Extension für Kryptowährungszahlungen und Spenden.

## Features

- 🔐 Wallet-Verwaltung für mehrere Kryptowährungen
- 💰 Kryptowährungszahlungen und Spenden
- 🔄 USD zu Kryptowährung Konvertierung
- 📊 Transaktionsverfolgung und Bestätigungen
- 🎯 Deep Links für Zahlungen
- ✅ Conditions, Actions und Expressions

## Unterstützte Kryptowährungen

- BTC (Bitcoin) - $43,000
- ETH (Ethereum) - $2,300
- LTC (Litecoin) - $100
- SOL (Solana) - $145
- MATIC (Polygon) - $1.10
- AVAX (Avalanche) - $80
- BNB (Binance Coin) - $610
- ADA (Cardano) - $0.65
- DOGE (Dogecoin) - $0.35
- XRP (Ripple) - $2.50

## GDevelop Integration

### Installation in GDevelop 5

1. Öffne GDevelop 5
2. Gehe zu **Create** → **Extensions**
3. Wähle **Load a Project Extension** oder **Create a New Extension**
4. Lade die Datei `PaymentSDK.json` hoch

### Verfügbare Aktionen (Actions)

| Action | Beschreibung |
|--------|-------------|
| **Initialize Payment SDK** | Initialisiere das Payment SDK |
| **Set User Wallet Address** | Konfiguriere eine Wallet für Kryptowährung |
| **Set Accepted Cryptocurrencies** | Definiere akzeptierte Kryptowährungen |
| **Send Cryptocurrency** | Sende Kryptowährung |
| **Process Donation** | Verarbeite eine Spende |
| **Convert USD to Cryptocurrency** | Konvertiere USD zu Kryptowährung |

### Verfügbare Bedingungen (Conditions)

| Condition | Beschreibung |
|-----------|-------------|
| **Is SDK Initialized** | Prüfe ob SDK initialisiert ist |
| **Is Wallet Configured** | Prüfe ob Wallet für Kryptowährung konfiguriert ist |
| **Is Cryptocurrency Accepted** | Prüfe ob Kryptowährung akzeptiert wird |
| **Is Transaction Confirmed** | Prüfe ob Transaktion bestätigt ist |

### Verfügbare Ausdrücke (Expressions)

| Expression | Rückgabewert |
|-----------|------------|
| **Get Transaction Hash** | Hash der letzten Transaktion |
| **Get Wallet Address** | Wallet-Adresse für Kryptowährung |
| **Get Converted Amount** | Zuletzt konvertierter Betrag |
| **Get Fee Estimate** | Geschätzte Gebühren |
| **Get Transaction Confirmations** | Anzahl der Bestätigungen |
| **Get Deep Link** | Payment Deep Link |
| **Get SDK Version** | SDK Version |

## Beispiel: Sanfter Zahlungsflow

```
Event 1: Auf Button klicken
  → Aktion: Initialize Payment SDK

Event 2: 
  → Bedingung: Is SDK Initialized
    → Aktion: Set wallet for "ETH" (User wallet address)

Event 3:
  → Aktion: Set accepted cryptocurrencies to "BTC,ETH,LTC"

Event 4: Auf "Zahle 100 USD" klicken
  → Aktion: Convert "100" USD to "ETH"
  → Aktion: Send Cryptocurrency from (User wallet) to (Payment wallet) for (Get Converted Amount) ETH
  → Aktion: Show toast: "Payment sent! Hash: " + Get Transaction Hash
```

## Struktur

```
Payment-SDK/
├── PaymentSDK.json          # Extension Manifest
├── paymentSDK.js            # JavaScript Implementation
├── index.js                 # GDevelop Entry Point
├── package.json             # NPM Package Info
└── README.md               # Diese Datei
```

## Lizenz

MIT - Frei verwendbar in deinen Projekten!

## Support

Fragen oder Bugs? Öffne ein Issue auf GitHub oder kontaktiere FreetimeMaker.
