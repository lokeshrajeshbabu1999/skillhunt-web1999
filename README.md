# Skill Hunt

- Skill Hunt is built with  [React Native CLI](https://reactnative.dev/docs/environment-setup)
- Currently it supports Android. But will be enhanced for ios

## Development 

### Setting up the project locally

- Run `git clone https://github.com/CodrixWorkspace/SkillHunt.git' to close the repo locally
- Run 'npm install' into the project main folder to install the required packages

### Actions on save

- Make the below changes to the perform formatting and organize import 

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


