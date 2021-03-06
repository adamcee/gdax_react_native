# Simple React Native App which interacts with the GDAX API

# INSTALL NOTES
 - Clone the project.
 - There is a good chance you may have to install [Watchman](https://facebook.github.io/watchman/docs/install.html), which [create-react-native-app](https://github.com/react-community/create-react-native-app) depends on. For details, [see here](https://github.com/react-community/create-react-native-app/issues/229#issuecomment-325183694). If running `watchman` in the terminal does not produce a message indicating its existence, you must install it.
   - On OS X, you can install watchman by `brew doctor && brew update &&  brew install watchman`. 
     - Then up the inotify watcher limit as described [here](https://github.com/react-community/create-react-native-app/issues/229#issuecomment-325183694):
       - `sudo sysctl -w fs.inotify.max_user_instances=1024 && sudo sysctl -w fs.inotify.max_user_watches=12288`
   - On Linux, you will have to use `install-watchman.sh` to install from source. You can do this in the root directory of the _project_ (not `app/` !), if you wish.
   - After installation, run `watchman` from the command line. You should see a message indicating its existence.
 - Run `cd app/` to navigate to the root directory of the mobile app.
 - Run `yarn` (preferable), or, `npm install` if you do not have yarn. Installation may take a bit.
 - Install the [Expo](https://expo.io/) app on your mobile device.
 - Make sure your computer and mobile device are on the same wireless network.
 - Run `yarn start` or `npm start`
 - You should see directions in the terminal. Basically, you open the Expo app on your mobile device, and use it to take a snapshot of the QR code which should be printed in the terminal. The app should then run on your phone. See [app/README.md](https://github.com/adamcee/gdax_react_native/tree/master/app) of this repo for more details.
 - If you encounter an error when running `npm start`, you  may need to install watchman or up the inotify watchers count for your system:
 https://github.com/react-community/create-react-native-app/issues/234
    - watchman: https://facebook.github.io/watchman/docs/install.html
