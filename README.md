# 💓 HeartAI Live - Live Dating Platform

Eine moderne, sichere und regulierte Live-Dating Plattform mit Video-Calls, Coin-System, Creator-Economy und KI-Moderation.

## ✨ Features

### 👥 User-Seite
- **Öffentliche Live-Räume** - Live-Streams von Creators ansehen
- **Private Video-Calls** - 1:1 Video-Calls mit Creators (kostenpflichtig)
- **Coin-Wallet** - Coins kaufen und zum Tipping nutzen
- **Live-Chat** - Mit Creators und anderen Zuschauern chatten (KI-moderiert)
- **Premium-Abos** - Free, Plus, VIP Pläne
- **Favoriten & Match** - KI-basierte Empfehlungen
- **Sicherheit** - Report, Block, 18+ Verifikation

### 👸 Creator-Seite
- **Creator Dashboard** - Umsatz, Zuschauer, Conversion-Stats
- **Live gehen** - Öffentlich oder Privat verfügbar
- **Auszahlungen** - Monatliche Auszahlungen (Streuung: 70/30)
- **Profil** - Verifizierung, Bio, Tags, Fotos

### 🛡️ Admin-Seite
- **Nutzer-Management** - Accounts, Rollen, Sperren
- **Live-Raum-Steuerung** - Push, Pause, Qualitätscheck
- **Moderation** - Reports bearbeiten, Nutzer sperren
- **Zahlungen** - Stripe, Coins, Refunds
- **Creator-Verifizierung** - Ausweis, Bankdaten, Tax-ID
- **App-Settings** - Gebühren, Länder, Moderationsregeln

## 🚀 Quick Start

### Voraussetzungen
- Node.js 18+
- npm oder yarn
- PostgreSQL (optional für Backend)

### Installation

```bash
# Repository klonen
git clone https://github.com/Fantasio-111/AF.git
cd AF

# Dependencies installieren
npm install

# Environment-Variablen setzen
cp .env.local.example .env.local
# Bearbeite .env.local mit deinen Schlüsseln

# Entwicklungsserver starten
npm run dev
```

Die App läuft dann auf **http://localhost:3000**

## 🏗️ Architektur

### Frontend (Next.js + React)
```
src/
├── pages/
│   ├── index.tsx           # Main App UI
│   └── api/                # API Routes (optional Backend)
├── components/
│   ├── UI.tsx              # Button, Card, Pill, Toast
│   ├── LoginPage.tsx       # Auth
│   └── ...
└── styles/
    └── globals.css         # Tailwind
```

### Backend-Integration (Optional)
```
API Routes (Next.js)
├── /api/auth               # Login, Register, Logout
├── /api/rooms              # Live-Räume, Creator-Profil
├── /api/chat               # Messages, Moderation
├── /api/payments           # Coins, Stripe Webhook
├── /api/reports            # Moderation Reports
└── /api/admin              # Admin Dashboard
```

### Datenbank Schema
```sql
users(id, email, role, age_verified, created_at)
profiles(id, user_id, display_name, age, city, bio, photos)
rooms(id, creator_id, type, status, price_per_minute)
wallets(user_id, coin_balance)
transactions(id, user_id, amount, type, stripe_session_id)
tips(id, from_user, to_creator, coins, created_at)
private_calls(id, viewer_id, creator_id, started_at, ended_at, coins_spent)
messages(id, room_id, sender_id, body, moderation_status)
reports(id, reporter_id, target_id, reason, status)
subscriptions(id, user_id, stripe_customer_id, plan, status)
```

## 💳 Zahlungssystem

### Stripe Integration
- **Coin-Pakete** - 100€4,99 | 500€19,99 | 1500€49,99
- **Premium-Abos** - Free | Plus €14,99 | VIP €39,99
- **Webhook** - Automatische Coin-Gutschrift nach Kauf

### Creator-Auszahlungen
```
Mögliche Modelle:
1. 70/30 Split (Creator 70%, Plattform 30%)
2. Monatliche Auszahlungen via Stripe Connect
3. Mindest-Auszahlungsbetrag: €50
```

## 🎥 Video-Infrastruktur

### Optionen
1. **Agora.io** - Beste für 1:1 Calls & Livestreaming
2. **Twilio** - Flexibel, aber teurer
3. **Firebase** - Einfach, aber limitiert
4. **WebRTC** (Self-hosted) - Maximum Privacy

## 🛡️ Sicherheit & Compliance

### 18+ Verifikation
- [ ] SMS/Email Verification
- [ ] ID-Upload & OCR-Prüfung
- [ ] Liveness-Check (Selfie)
- [ ] GDPR-konform speichern

### Moderation
- [ ] KI-basiert (OpenAI, Google Cloud)
- [ ] Profanity-Filter
- [ ] Inappropriate-Content Detection
- [ ] Manual Moderation Queue

### Datenschutz
- [ ] GDPR (EU-Nutzer)
- [ ] CCPA (USA)
- [ ] Keine Aufzeichnung ohne Zustimmung
- [ ] 30-Tage Datenlöschung

### Regulierung
- [ ] AGB & Datenschutz
- [ ] Impressum
- [ ] Abuse-Reporting (NCMEC für USA)
- [ ] Creator-Verträge
- [ ] Tax-Reporting (1099/etc)

## 📊 Analytics

- DAU, MAU
- Durchschnittliche Session-Länge
- Top Creators
- Revenue (ARPU)
- Churn-Rate

## 🚢 Deployment

### Vercel (Empfohlen)
```bash
vercel deploy
```

### Docker
```bash
docker build -t heartai-live .
docker run -p 3000:3000 heartai-live
```

### Self-Hosted
```bash
npm run build
npm start
```

## 📝 Lizenz

MIT License - siehe LICENSE Datei

## 🤝 Kontakt

- GitHub: [@Fantasio-111](https://github.com/Fantasio-111)
- Email: support@heartai-live.de

---

**⚠️ HINWEIS**: Dies ist ein Prototyp. Für Production brauchst du:
- Backend-API
- Zahlungsverarbeitung
- Video-Streaming-Infrastruktur
- KI-Moderation
- Legal & Compliance
- 24/7 Support-Team
