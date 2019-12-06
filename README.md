- Install [Detox](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md#step-1-install-dependencies)

- Clone [react-native-jose](git@github.com:egendata/react-native-jose.git)

- Go to `react-native-jose` folder and use [feat/encryption](https://github.com/egendata/react-native-jose/tree/feat/encryption-with-jwk) branch and then run:
  ```bash
  npm i && cd ios && pod install && cd .. && npm pack
  ```
- Come back to `JoseApp` and run `npm i` (if it breaks there's something wrong with the paths, check `package.json` to see how `@egendata/react-native-jose` is linked currently - will be updated to use the dependency from npm when the new feature is released)

- Install iOS Pods
  ```bash
  cd ios && pod install && cd ..
  ```

- Build the app
  ```bash
  detox build
  ```

- Run the tests
  ```bash
  detox test
  ```
