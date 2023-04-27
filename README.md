# Skill Hunt

- Skill Hunt is built with [React Native CLI](https://reactnative.dev/docs/environment-setup)
- Currently it supports Android. But will be enhanced for ios

## Development

### Setting up the project locally

- Run `git clone https://github.com/CodrixWorkspace/SkillHunt.git' to close the repo locally
- Run 'npm install' into the project main folder to install the required packages

### Actions on save

- Make the below changes to settings.json that performs formatting and organize import during save

```
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
  "source.organizeImports": true
}
```

### Start Metro

- To start Metro run 'npx react-native start' inside your project folder

### Start you application

Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:

```
npx react-native run-android
```

To run the app on a specific device or emulator run the below command. Use `adb devices` to find your device id.

```
npx react-native run-android --deviceId 'deviceid'
```

### Lint Checking

- Run 'npm run lint:fix' to check and fix lint errors

<!-- FIXME : Fill up with instruction for running the app on ios  -->

### Pair a device

- Go to Wireless `debugging > Pair device with pairing code`
- Run `adb pair 10.0.0.243:42095` to pair your device (Use your device ip and port)
- Run `adb connect 10.0.0.243:42095` to connect your device

## Release setup and packging

### Release setup

- An upload key was genrated using [keytool](https://reactnative.dev/docs/signed-apk-android)
- The below properties were set in the `~/.gradle/gradle.properties` file

```text
  MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
  MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
  MYAPP_UPLOAD_STORE_PASSWORD=*****
  MYAPP_UPLOAD_KEY_PASSWORD=*****
```

- Signing config was added to the `android/app/build.gradle` config file

### Generating the release AAB

- Update the versionCode and versionName in build.gradle file.

- Run the following in a terminal:

```bash
cd android
./gradlew bundleRelease
```

- Locate the app bundle at /android/app/build/outputs/bundle

- Ensure the App access provided for review is working

### Internal distribution validation

Become a part of our internal testing [team](https://play.google.com/apps/internaltest/4701438721505499078)

Install the app from [Play Store](https://play.google.com/store/apps/details?id=com.codrix.skill&hl=en-US&ah=0S_CC-tVBeRQh2KARpnLmSLljpg&pli=1)

## Managing Git Branches

Run `git fetch -p` to get your local branches in sync with repo

Run `git branch --merged| egrep -v "(^\*|master|main|dev)"` to view already merged local branches

Switch to main branch and Run `git branch --merged | egrep -v "(^\*|master|main|dev)" | xargs git branch -d` to delete all local branches that are already merged into the currently checked out branch
