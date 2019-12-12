App for running Jose things without the other dependencies and uses Detox for running tests on the simulator

## Instructions

- Install [Detox](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md#step-1-install-dependencies)

- Clone [react-native-jose](https://github.com/egendata/react-native-jose/tree/feat/encryption-with-jwk)

- Go to `react-native-jose` folder and use [feat/encryption](https://github.com/egendata/react-native-jose/tree/feat/encryption-with-jwk) branch and then run:
  ```bash
  npm i && cd ios && pod install && cd .. && npm pack
  ```
- Come back to `JoseApp` and run `npm i` (if it breaks there's something wrong with the paths, check `package.json` to see how `@egendata/react-native-jose` is linked currently - will be updated to use the dependency from npm when the new feature is released)

- Install iOS Pods
  ```bash
  cd ios && pod install && cd ..
  ```

- Build the app for iOS
  ```bash
  detox build -c ios
  ```

- Build the app for Android
  ```bash
  detox build -c android
  ```

- Create a simulator for Android in AVD Manager and name it `Detox_Test` (what type of device it is shouldn't matter I think) and use at least Android version 28

- Run the tests for iOS
  ```bash
  detox test -c ios
  ```

- Run the tests for Android
  ```bash
  detox test -c android
  ```

### Troubleshooting

Error:

```bash
/Users/<WHOEVER YOU ARE>/Library/Detox/ios/fa6c43c4cc884a5c2fbfb38206892ed97480bf32/Detox.framework could not be found, this means either you changed a version of Xcode or Detox postinstall script was unsuccessful.
```

Fix:
```bash
detox rebuild-framework-cache
```