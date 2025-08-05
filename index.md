# Build & Distribution Guide for React Native ReState

This document walks you through building Android and iOS binaries from Scratch using Expo EAS and sharing installable links without publishing to app stores.

---

## 1. Prerequisites

- Node.js (>=16.x)
- Expo CLI (optional)
- [EAS CLI](https://docs.expo.dev/build/introduction/) (`npm install -g eas-cli`)
- Java Development Kit (JDK) with `keytool` (for Android keystore)
- An Expo account (`eas login`)

---

## 2. Install Dependencies

```bash
# Install EAS CLI globally
npm install -g eas-cli

# (Optional) Install Expo CLI if you use classic builds
npm install -g expo-cli
```

## 3. Java (keytool) Setup for Android

Android requires a signing keystore. You need Java’s `keytool` utility:

### 3.1 Windows via winget

Open PowerShell **as Admin**:

```powershell
winget install --id Microsoft.OpenJDK.17
```

### 3.2 Verify installation

```powershell
java -version
keytool -help
```

---

## 4. Create Android Keystore

Run from your project root:

```powershell
keytool -genkeypair `
  -v `
  -storetype PKCS12 `
  -alias app_alias `
  -keyalg RSA `
  -keysize 2048 `
  -validity 10000 `
  -keystore .\my-release-key.jks `
  -storepass YOUR_STORE_PASSWORD `
  -keypass YOUR_KEY_PASSWORD `
  -dname "CN=Sahil Hasnain, OU=Dev Team, O=Sahil Web Solutions, L=Delhi, S=Delhi, C=IN"
```

> Replace `YOUR_STORE_PASSWORD` and `YOUR_KEY_PASSWORD` with secure values you choose. Store them safely!

---

## 5. Upload Keystore to EAS

```bash
eas credentials -p android \
  --upload-keystore \
  --keystore-path my-release-key.jks \
  --keystore-password YOUR_STORE_PASSWORD \
  --key-alias app_alias \
  --key-password YOUR_KEY_PASSWORD
```

This links your keystore to your Expo project.

---

## 6. eas.json Configuration

In your `eas.json` (project root) add a profile for internal distribution. Example:

```json
{
  "cli": { "version": ">= 16.17.4" },
  "build": {
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" },
      "ios": { "simulator": false }
    }
  }
}
```

- **preview**: Internal build you can share with users.
- **production**: (Optional) for Play/App Store builds.

---

## 7. Build Commands

### Android APK

```bash
eas build -p android --profile preview
```

### iOS (TestFlight / Ad Hoc)

```bash
eas build -p ios --profile preview
```

After each build finishes, Expo will print a URL. Share the Android APK link directly with Android users. For iOS:

- **TestFlight**: Expo can upload to App Store Connect for internal testing. Invite testers via TestFlight.
- **Ad Hoc**: Configure an Ad Hoc provisioning profile in `eas.json` and install the `.ipa` link on registered devices.

---

## 8. Environment Variables for Keystore Passwords

You can store passwords in environment variables in a `.env.local` file (not committed):

```bash
ANDROID_KEYSTORE_PASSWORD=YOUR_STORE_PASSWORD
ANDROID_KEY_PASSWORD=YOUR_KEY_PASSWORD
```

Then reference them in scripts or in CI workflows.

---

# Enjoy your builds!

Keep this file handy so you never have to hunt instructions again.
