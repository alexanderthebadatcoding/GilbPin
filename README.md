# GeoPin

A GeoGuessr-style game built with React + Vite. GPS coordinates are obfuscated in the URL using XOR encoding.

## Setup

```bash
pnpm install
```

Add your Google Maps API key:

```bash
cp .env.example .env.local
# Edit .env.local and set VITE_GOOGLE_MAPS_API_KEY
```

Your `.env.local` already has the key set.

## Dev

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Deploy to Vercel

```bash
pnpm install -g vercel
vercel
```

Or push to GitHub and import the repo in [vercel.com/new](https://vercel.com/new).

**Important:** Set the `VITE_GOOGLE_MAPS_API_KEY` environment variable in the Vercel dashboard under Project Settings → Environment Variables. Do **not** commit `.env.local`.

## Google Maps APIs required

Enable these in [Google Cloud Console](https://console.cloud.google.com/):
- Maps JavaScript API
- Street View Static API

## How coordinates are obfuscated

Lat/lng are XOR-encoded with a fixed seed and represented as a hex string:

```
geopin.app/play?loc=a3f91c2e7b4d0180&r=1
```

The raw coordinates never appear in the URL.
