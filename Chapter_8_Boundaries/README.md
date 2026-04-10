# 🌍 Geo Locator — Chapter 8: Boundaries

A **TypeScript console application** that accepts a location name from the user and retrieves its **latitude and longitude** using the **Google Geocoding API**.

---

## 📁 Project Structure

```
Chapter_8_Boundaries/
├── src/
│   ├── config/
│   │   └── appConfig.ts          # Loads & validates the API key from .env
│   ├── display/
│   │   └── outputFormatter.ts    # All console output / ANSI formatting
│   ├── services/
│   │   └── geocodingService.ts   # Google Geocoding API communication
│   ├── types/
│   │   └── geocoding.ts          # Shared TypeScript interfaces & custom errors
│   ├── validators/
│   │   └── inputValidator.ts     # Pure input validation (no side-effects)
│   └── index.ts                  # Entry point — interactive CLI loop
├── .env                          # API key (NOT committed to git)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Separation of Concerns

| Layer | File | Responsibility |
|-------|------|----------------|
| **Config** | `appConfig.ts` | Read & validate env variables |
| **Types** | `geocoding.ts` | Shared data contracts |
| **Validator** | `inputValidator.ts` | Validate & sanitise user input |
| **Service** | `geocodingService.ts` | Call the Geocoding API |
| **Display** | `outputFormatter.ts` | Format & print all output |
| **Entry** | `index.ts` | Orchestrate the CLI loop |

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A **Google Geocoding API key**  
  → Enable it at: https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the API Key

Open the `.env` file in the project root and replace the placeholder:

```env
GOOGLE_GEOCODING_API_KEY=YOUR_ACTUAL_API_KEY
```

### 4. Run the Application

```bash
# Development mode (ts-node, no build step)
npm run dev

# OR build then run
npm run build
npm start
```

---

## 🖥️ Usage

```
  Enter location › Eiffel Tower

  📍 Geocoding results for: "Eiffel Tower"

  ──────────────────────────────────────────────────────────
    Result 1 of 1
  ──────────────────────────────────────────────────────────
    Address  :  Eiffel Tower, 5 Av. Anatole France, Paris, France
    Latitude :  48.858370
    Longitude:  2.294481
    Type     :  APPROXIMATE
    Place ID :  ChIJLU7jZClu5kcR4PcOOO6p3I0
```

Type `exit`, `quit`, or `q` to close the app.

---

## ✅ Requirements Covered

| Requirement | Implementation |
|-------------|----------------|
| Read API key from config | `appConfig.ts` — loads from `.env` using `dotenv`, throws if missing/placeholder |
| Validate user input | `inputValidator.ts` — checks length, alphabet content, control characters |
| Handle multiple results | `geocodingService.ts` maps all results; `outputFormatter.ts` prints each with an index |
| Handle errors | Custom `GeocodingError` with typed `GeocodingErrorCode`; network errors wrapped separately |
| Structured output | ANSI-coloured, labelled output boxes with address, lat, lng, type, place ID |
| Clean code & separation | Six distinct layers; no module crosses its responsibility boundary |
