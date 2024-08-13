# Job_portal
# Job_portal



# GameStreaming Content Test App

---

This is the GameStreaming app, for Android, iOS, and Windows, all built with React Native. "Test App" has become a misnomer, as this is the app we ship to 100k+ customers. We have several build flavors, one of which still bears the old name (CTA), and has all features enabled (including dev ones). Other flavors are targeted to end users within and outside of Microsoft.

[[TOC]]

## Setup

---

We develop both on Mac and PC - you can develop Android on either, but iOS is Mac only and Windows is Windows only.

There are 2 ways to setup your dev environment so you can start developing for the CTA:

1. You can run the setup script from the CTA folder to potentially expedite the setup process:

 shell
pwsh scripts/setup.ps1 -InstallConfig installer.json


1. Follow the instruction below:

*[Visual Studio Code](https://code.visualstudio.com/)*: Most of our development is done in Visual Studio Code, and you can find a workspace with all our code at /.vscode/GS.code-workspace. The workspace contains some recommended extensions and settings to help with development.

## Windows

---

*Git*: Follow the steps for installing [GVFS and Git.](https://osgwiki.com/wiki/Install_Tools)

*Git LFS*: To manage large files in git, install git-lfs.  
Download latest git-lfs from [here](https://github.com/git-lfs/git-lfs/releases/latest)
[Example(Likely outdated)](https://github.com/git-lfs/git-lfs/releases/download/v3.2.0/git-lfs-windows-v3.2.0.exe)

After installation, run anywhere:

shell
git lfs install


*Enlist: Now clone the repo, **using the --recursive flag*. It is recommended to use a shallow root directory to avoid running into Windows' issue with long path names.

shell
git clone --recursive https://microsoft@dev.azure.com/microsoft/Xbox.Streaming/_git/GameStreaming


*[Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)*: To consume the new WebRTC-based streaming stack we need to download an azure universal package using the azure CLI. Once installed, run az login to authenticate.

*[Visual Studio 2022](https://visualstudio.microsoft.com/vs/older-downloads/)*: To build the Windows version you'll need v17.x. Download the Enterprise version and sign in with your Microsoft credentials.

### Visual Studio Components

There are 2 ways to install all the visual studio components required to build the CTA:

1. Import the configuration

    You can [import the Visual Studio configuration](https://learn.microsoft.com/en-us/visualstudio/install/import-export-installation-configurations?view=vs-2022) in config/vs2022/.

1. Manually install the dependencies

    To find this menu, open or search for the seperate visual studio installer app. Then click Modify > `Workloads'. The required workload dependencies are:

    - [ ] Universal Windows Development
    - [ ] Desktop Development with C++

    Then, navigate to the Independent Components tab. The required Component dependencies are:

    > *NOTE:*  If you are developing for ARM, you will need the ARM version of the build tools.

    *.NET*
    - [ ] Framework 4.6.1 SDK
    - [ ] Framework 4.6.1 targeting pack

    *Compilers, build tools, and runtimes*
    - [ ] MSVC v143 - VS 2022 C++ x64/x86 build tools
    - [ ] MSBuild
    - [ ] C++ CMake tools for Windows

    *SDKs, libraries, and frameworks*
    - [ ] C++ ATL for latest v143 build tools (x86 & x64)
    - [ ] Windows 10 SDK

   *Misc*
   - [ ] C++/Winrt
   Note: C++/Winrt may be unavailable, if so, continue without it.

If planning on doing any Visual Studio Windows debugging. Please make sure you have [C++/WinRT templates and visualizer for VS2019](https://marketplace.visualstudio.com/items?itemName=CppWinRTTeam.cppwinrt101804264) installed:

### Android Components

*Java*: To build the Android version, you'll need the JDK. We use the [OpenJDK](https://download.java.net/java/GA/jdk11/13/GPL/openjdk-11.0.1_windows-x64_bin.zip)

After extracting (to say, C:\android\jdk-11.0.1), set the following environment variables:

shell
JAVA_HOME=C:\android\jdk-11.0.1
PATH=%PATH%;%JAVA_HOME%\bin


*[Android Studio](https://developer.android.com/studio/)*: Love it or hate it, it's useful for Android debugging and Java development. Install it [here.](https://developer.android.com/studio/)
When installing, select the "Custom" install approach, and set Android Studio's JDK to the path where you installed the JDK in the previous step. You can continue with the defaults for the rest of the installation setup.  
It will install the Android SDK for you. Ensure that you have the ANDROID_HOME environment variable set up to point to that installed SDK (most likely %USERPROFILE%\AppData\Local\Android\Sdk).  
It is also recommended to install "Android SDK Platform Tools" from the SDK Manager (it might be auto-installed by default).
Then you can add %ANDROID_HOME%\platform-tools to your PATH to enable use of the [Android Debug Bridge](https://developer.android.com/studio/command-line/adb).

*[Android NDK](https://developer.android.com/ndk/downloads/older_releases.html)*: The project
has been updated to support version 25 of the NDK which is downloaded by default with Android Studio. However, you have to install it. In the SDK Manager, make sure you install:

- [ ] Android 11
- [ ] Android SDK 30
- [ ] Android SDK Build-tools 30.0.2
- [ ] NDK (Side by side) version 25.2.9519653
- [ ] CMake 3.18.1
- [ ] Android SDK Command-line Tools (latest) installed.

It is recommended you install and manage any android dependencies through Android Studio SDK Manager.

> Note: If you get weird build errors like common include files can't be found, your SDK and NDK are probably in a file path that's too long. You will need to move them to a shorter path to resolve the issue.

*[Node/NPM](https://nodejs.org)*: You'll want to install the latest 20.x release from [here.](https://nodejs.org/en/download/releases/)

You can also install [Node Version Manager (NVM)](https://github.com/coreybutler/nvm-windows) to make switching node versions easier between projects.

*[Chocolately](https://chocolatey.org/)*: We use choco for some installations, which you install by running the following in an elevated powershell:

bash
Set-ExecutionPolicy Bypass -Scope Process -Force;
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))


### Credential Manager

shell
choco install nuget-credentialprovider-vss


*[Yarn](https://yarnpkg.com)*: We use yarn instead of npm because it's better in every way.

shell
npm install -g yarn


*Powershell*: We use powershell 6, pwsh, for cross-platform scripting, so you'll need to use that, not the built-in version.

shell
choco install pwsh


Also consider that you need to be able to execute powershell scripts, which if you've never enabled before, can be done with Set-ExecutionPolicy Unrestricted in an elevated powershell window.

*NPM permissions*: To connect to the @gaming npm registry, you'll needed credentials. On Windows this is easy:

shell
yarn global add  vsts-npm-auth --registry https://registry.npmjs.com --always-auth false
# The following needs to be run from /src/native/apps/ContentTestApp
yarn auth


If you still receive 401 unauthorized, you might have stale credentials, try deleting your equivalent of C:\Users\<username>\.npmrc

For the SDK you will also need to run the following command. This step is the same on Windows and MacOS.

shell
# From /src/native
yarn auth


*React Native*: Be sure to read through the official [setup instructions](https://reactnative.dev/docs/environment-setup). Some of that is already covered here, some is is not accurate anymore (like installing JDK8, don't do that). Also recommend install the react-native-cli globally:

shell
yarn global add react-native-cli


*Clang format*: Clang format is used to format all of our native code: C++, Java, and Objective-C. The workspace contains a recommended extension to support format-on-save in VSCode, but in order to get it to work you need to add <repo root>\build\LLVM\bin\x64 to your PATH.

## Mac

---

*Developer account*: First things first, you will need to have a Mac developer account set up as part of the Microsoft team. Use your Microsoft email to create an Apple ID. Fill out [this](https://microsoft.sharepoint.com/teams/appledev/Lists/Apple%20Developer%20Registration/AllItems.aspx?ct=1630003018676&or=Teams%2DHL&originalPath=aHR0cHM6Ly9taWNyb3NvZnQuc2hhcmVwb2ludC5jb20vOmw6L3QvYXBwbGVkZXYvRkZoaHZTYXFoT3BObllxOGhGUHZsaTBCc2JEeHY0VVdDdGxlN3E2ckIxdE1XZz9ydGltZT01c05aZnNCbzJVZw) form using your @microsoft.com email. Enter the App name as "Project xCloud". This might take some time to be processed, so do this early.
Once the request is approved, you will receive an invitation email with instructions to submit a Certificate Signing Request (CSR) for developer certificate for iOS development. To generate a CSR,

- Open Keychain Access on Mac
- Select Keychain Access -> Certificate Assistant -> Request a certificate from a Certificate Authority.
- Enter your email address, select the option "save to disk".

*Xcode*: Install Xcode from the app store, just installing it will install/unlock a lot of developer tools on the Mac.
Currently for iOS 16.4 development, you will need Xcode 14.3.

*[Homebrew](https://brew.sh/)*: Homebrew is the the package manager for Macs. If you don't already have it, you can install it:

bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"


Then you can use it to install most everything else:

*Git LFS*:

bash
brew install git-lfs
git lfs install


*Enlist: Now clone the repo, **using the --recursive flag*. Mac is not as sensitive to long path names as Windows

bash
git clone --recursive https://microsoft@dev.azure.com/microsoft/Xbox.Streaming/_git/GameStreaming


And within the repo:

bash
git lfs fetch
git lfs checkout


Note:
If you are using Mac and encounter git-lfs filter-process: git-lfs command not found you can fix this by running the command below:

bash
ln -s $(which git-lfs) $(git --exec-path)/git-lfs


*Ruby*: There is a version that comes with Xcode, but it's recommended to install your own so you can modify it later.

bash
brew install rbenv
rbenv install 2.7.3
rbenv global 2.7.3


Then add eval "$(rbenv init -)" to your .bash_profile or .zshrc. To figure out which shell you are running, type this into your command line.
If it returns -zsh then you will need to update your .zshrc, else if the result is bash then you will update your .bash_profile.

bash
echo $0


There are some ruby gems that need to be installed, for building the SDK and for CocoaPods

bash
# In repo /build/bau, may require sudo
gem install bautools-0.5.5.dev.30005.gem

# To use cocoa pods, may require sudo
gem install cocoapods


*JDK*:
Note: as of June 2024, the latest version of Java supported by our gradle version is 17. Once gradle is updated, the Java version can be as well.
Until then, if you get a gradle error saying exception in phase 'semantic analysis' in source unit '_BuildScript_' Unsupported class file major version then your Java version is likely incompatible.

bash
brew install --cask temurin@17


*Set JAVA_HOME*:
Once you have installed the jdk set up the JAVA_HOME environment variable by adding the following to your .bash_profile (or other shell config):

bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home/


*[Node/NPM](https://nodejs.org)*:

bash
brew install node


You can also install [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) to make switching node versions easier between projects.

*NB:* In some cases the build scripts will throw errors claiming that they cannot find NODE, in this case you can create a symlink to the nvm folder:

bash
ln -s $(which node) /usr/local/bin/node


*[Yarn](https://yarnpkg.com)*:

bash
brew install yarn


*Powershell*: We use powershell for cross-platform scripting

bash
brew install --cask powershell


### Android

*[Android Studio](https://developer.android.com/studio/)*: Love it or hate it, it's useful for Android debugging and Java development. Install it from [here.](https://developer.android.com/studio/)
See [getting-started](https://facebook.github.io/react-native/docs/getting-started) for more info on setting it up, but the short version is:

- During setup, choose custom and make sure you have "Android SDK" and "Android SDK Platform" checked.
- Afterward, launch it, go to the SDK manager, and then check the box next to "Show Package Details" in the bottom right corner. Make sure you install:
  - [ ] Android SDK 30
  - [ ] Android SDK Build-tools 30.0.2
  - [ ] NDK (Side by side) version 25.2.9519653
  - [ ] CMake 3.10.2
- Set up ANDROID_HOME environment variable by adding the following to your .bash_profile (or other shell config):

bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools


If the SDK manager has "NDK" - separate from the NDK (Side by side) - install that as well. Otherwise, install "Android SDK Command-line Tools (latest)".
It is recommended you install and manage any android dependencies through Android Studio SDK Manager.

If you are having the issue where your app loads but immediately crashes, try the following:

- Remove everything related to Android from your computer by following [these instructions](https://stackoverflow.com/questions/17625622/how-to-completely-uninstall-android-studio-on-mac)
- Try to redownload Android Studio with the instructions above

This has been verified on Android Studio 4.0.1 with the sdkmanager approach.

*NPM permission*: To connect to the @gaming npm registry, you'll needed credentials. This is slightly more complicated on Macs. Go [here](https://microsoft.visualstudio.com/Xbox.Streaming/_packaging?_a=feed&feed=gaming), click "Connect to feed", select "npm" on the left, and follow the "Alternative" directions. Only do the "Setup credentials" part. This involves copy-pasting text into the .npmrc file. To be clear, that is ~/.npmrc. Create it if it doesn't exist.

*ios-deploy*: This is a yarn-installed tool that we can't add to devDependencies because it only works on Mac, but you'll need it to deploy iOS apps via command line.

bash
yarn global add ios-deploy@beta


Note that we use beta, because @latest hasn't been updated for catalina (yet).

*React Native*: Be sure to read through the official [setup instructions](https://facebook.github.io/react-native/docs/getting-started). Some of that is already covered here, some is is not accurate anymore (like installing JDK8, don't do that). Also recommend install the react-native-cli globally:

bash
yarn global add react-native-cli


*Clang format*: Clang format is used to format all of our native code: C++, Java, and Objective-C. The workspace contains a recommended extension to support format-on-save in VSCode, but in order to get it to work you need to first install Clang format:

bash
brew install clang-format


You'll then need to add the install location to your PATH.

### Mac ARM

Apple's new computers are based on ARM architecture which requires a few steps to be carried out differently.

Firstly, we recommend switching your terminal to the x64 version enabled by Rosetta because we have several precompiled libraries may not work on ARM.

*Enabling Rosetta*: Rosetta is an emulation technology that allows programs designed for Intel processors to run on a Mac with an M1 or M2 chip. Some programs, such as CMake, may not be natively compatible with the M1 or M2 chip, so you need to install Rosetta to ensure that these programs work correctly.
You can enable Rosetta by running the following:

bash
softwareupdate --install-rosetta 


*Cocoapods*: Mac ARM architecture is not directly compatible with Cocoapods. If you encounter issues when installing pods, you can solve it by running:

bash
sudo arch -x86_64 gem install ffi
arch -x86_64 pod install


Alternatively, you can install cocoapods from Homebrew using the command below, this will give you the ARM version of cocoapods:

bash
brew install cocoapods


## Authentication

---

In order to be able to yarn install and interact with the repo through git commands, you'll need to be authenticated. Run yarn auth from src/native and follow the prompts to set up authentication.
Afterward, when you try to run a git command, you may be asked for a username and password. You'll need to:

- Go to the [repo](https://microsoft.visualstudio.com/Xbox.Streaming/_git/GameStreaming) online
- Click "clone"
- Click "generate git credentials"
- Copy the given username and password and enter them

You may also be prompted to login to you microsoft account or to azure. To manage these requests you need to install:

bash
brew install --cask git-credential-manager
brew install azure-cli


## Building

---

All of the following instructions can be run from the native workspace located at src/native. The workspace includes @gaming/react-native-gamestreaming, @gaming/react-native-gamestreaming-ui and ContentTestApp. These packages are linked via the yarn workspace, so any local changes you make to one of the packages will show up in the CTA automatically (barring some potential re-building).

*Patches and jetify*: While you don't have to do anything here, you may run into issues at some point. We use two tools to modify the code within node_modules: patch-package and jetify.  
*Patch-package* allows us to define patches in the /patches directory, it is possible you will need to run yarn patch-package after running yarn or yarn install.  
*Jetify* is tool for patching any java code that still uses the android.support libraries instead of the androidx libraries. This also runs automatically after yarn or yarn install.

It is possible that if you are running yarn add or yarn remove tasks for these to get out of sync. If you get any errors that look like they may be caused by this, simply run yarn again and they will re-apply their changes.

> *Note:* We currently use patch-package to patch packages in the CTA. Packages are not patched in the SDK or GSUI. Patch-package is not the way Yarn v3 wants us to manage packages, but it works for now. Work will need to be done to reconcile packages across the workspace before we move to the Yarn v3 concept of patches.

### Install NPM dependencies

Simply run

bash
yarn


That is shorthand for yarn install, if you're curious.

### Build the native portion of the SDK

Each platform builds separately, and commands take the form of command:platform. To build the SDK, do one one of the following:

bash
yarn sdk:android
yarn sdk:ios
yarn sdk:windows


Since this just shells off to the SDK's build-sdk.ps1 script, any arguments you want to pass to that can be added on.
For example, yarn sdk:android -SkipMicroBuild.

As with the commands to build the SDK, you can pass along parameters to these commands. The debug build option has been depracated hence you can only use the RelWithDebInfo option:

bash
yarn sdk:android -BuildType RelWithDebInfo


*CMake issues on Mac*: When building the Android sdk on a mac, you might get a system popup saying "Cmake is damaged and can't be opened. You should move it to the Trash". To deal with this you can

1. Click "cancel"
1. Open the MacOS settings and navigate to "Privacy and Security"
1. There should be something telling you CMake was not opened because it was from an external developer. Click allow

After this, rerunning the Android sdk build should work.

#### Build Workspace Typescript

Simply run yarn build from src/native. This will build the typescript portions for the SDK, GSUI, and the CTA.

### Building the App

For development, you don't actually need to build the app. Jump to [running the app](#running), and just do that. However if want to there are some explicit build steps you can do.

To compile the typescript and check that you have no errors:

bash
yarn compile


You can also run the linter on your code:

bash
yarn lint
# If there are errors, you can try to autofix them with:
yarn lint-fix


You can also generate an actual APK if you need to:

bash
yarn build-android


> Note: If you are adding a new react-native package. Run the following command to autolink on windows from the ContentTestApp folder. The build gates should also automatically check if this needed to be run.

shell
npx react-native autolink-windows --proj ./windows/ContentTestApp/ContentTestApp.vcxproj --sln ./windows/ContentTestApp.sln


#### Building the Windows App

Run the following commands to build the windows application:

shell
src/sdk> build-sdk.ps1
src/native/packages/react-native-gamestreaming>  yarn install


The following will configure for windows and install. The ordering doesn't matter.
After running yarn install once, you can switch to non windows with yarn configure:default. You don't need to re-run yarn install when switching.

shell
src\native\apps\ContentTestApp>  yarn configure:windows
src\native\apps\ContentTestApp>  yarn install


Start the packager:

shell
src\native\apps\ContentTestApp> yarn start --reset-cache


wait for "Loading dependency graph, done."

*Note*: This packager from yarn start needs to keep running. Do not close it out or else you will get a red screen.
If you see a red screen that it can't find the server, thie packager likely isn't running.

Load the project in Visual Studio:

- Open src\native\apps\ContentTestApp\windows\ContentTestApp.sln
- Select Debug x64 (it might default to ARM)
- Make sure ContentTestApp project is startup project.

You should be able to start debugging and launching the app.

*Note*: If you run into unknown signin issues, make sure you have installed the Xbox app and signed in. It will prompt you to install the Xbox Identity Provider.
It is also recommended to download the Purchase App, Xbox Game Bar, and Feedback Hub for some in-app functionality to work, but is not required.

You can also distribute a local build by doing the following

- If you're planning to run this on a computer without the npm packager then switch to the Release build and ensure your have built the SDK with RelWithDebInfo build type
- Right click the ContentTestApp project in the solution explorer
- In the content menu, select Publish->Create App Packages... to open the Create App Packages window
- Select "Sideloading" and hit "Next"
- Select "No, skip package signing" and hit "Next"
- Ensure only "x64" architecture is selected and hit "Create"
- After the building completes, open the output location and navigate to the one you just built
- In your favorite compression tool, unzip the "ContentTestApp_SomeVersion_x64.msixbundle" (or appxbundle) file
- Navigate to the uncompressed files and unzip the "ContentTestApp_SomeVersion_x64.msix" (or appx) file into a folder
- Copy the unzipped folder to the new computer
- On the new computer, navigate to the folder and run the command "Add-AppxPackage -Register AppxManifest.xml"
- Now you can launch the CTA from the Windows start menu
- Note: do not delete the folder until you're finished using it otherwise the app will crash on launch

If you want to download and install an unsigned build from the Gate.CTA.Main build pipeline

- Find the build you want and click "# Published" under related.
- Click the download button on far right of cta.windows.x64.Release. Note: The download button only appears if you hover the mouse over it.
- Extract the zip, and you should find an appxbundle/msixbundle
- In your favorite compression tool, unzip the "ContentTestApp_SomeVersion_x64.msixbundle" (or appxbundle) file. The \*xbundle files are just a zip file.
- Navigate to the uncompressed files and unzip the "ContentTestApp_SomeVersion_x64.msix" (or appx) file into a folder. It will likely be the largest file.
- In Powershell, run the command "Add-AppxPackage -Register AppxManifest.xml"
- Now you can launch the CTA from the Windows start menu
- Note: do not delete the folder until you're finished using it otherwise the app will crash on launch

## Running

---

### Dev builds

For iOS, make sure first that your device is registered via [iOS Device Provision](https://microsoft.sharepoint.com/teams/appledev/Lists/iOS%20Device%20Provision%20Request%20Queue/AllItems.aspx?viewid=cb0b6fb6%2D581a%2D40a8%2D9cab%2D7de4a79ec4dev).
After registering a new device, be sure to grab the updated iOS_Team_Provisioning_Profile the next day from the [Provisioning Profiles](https://microsoft.sharepoint.com/teams/appledev/Documents/Forms/AllItems.aspx?id=%2Fteams%2Fappledev%2FDocuments%2FProvisioning%20Profiles&p=true&ct=1643319716317&or=Teams%2DHL).

Open src/native/apps/ContentTestApp/ios/ContentTestApp.xcworkspace in Xcode.  
Add your Apple ID under Preferences > Accounts.  
Under ContentTestApp project > Signing and Capabilities, make sure the debug signing certificate is "Apple Development: Your Name". You might have to restart Xcode if it's not showing up.

As a dev, this will create a debug build with no bundle, install it on your device, and start the dev-server. The app works by calling back to the server to get the latest javascript.

bash
yarn android
yarn ios            // This will also run "pod install". You can do this manually if you need with "yarn pod" (or going into the iOS/ directory and running "pod install")


### Installing an existing build

(This needs to be updated with iOS instructions)

If you have an APK, just use ADB directly:

bash
adb install <apk>


Then you start the app from your device.

## Deploying custom build to Console

---

*Important:* You must be connected to the vpn from your PC and you must be on the same network as the console for these steps to work.

To deploy and test changes on console, it is required that you have a development console (devkit) set up. If you have not done so yet, follow the [Devkit setup guide](https://microsoft.visualstudio.com/Xbox.Streaming/_wiki/wikis/Xbox.Streaming.wiki/62540/Devkit-Setup?anchor=step-4---mac-address-recovery-(new-devkits-only)).

Once your devkit it setup, you will need to configure your Visual Studio.

1. Open the CTA .sln file in Visual Studio which can be found using this path: GameStreaming/src/native/apps/ContentTestApp/windows/ContentTestApp.sln
2. Right click on the CTA project and select Set as startup project
3. Right click on the CTA project and select properties > configuration properties > debugging. Under Debugger to launch change your deploy target from Local Machine to Remote Machine. When prompted, enter the system IP of the Xbox console to which you will deploy.
    > To find your console system IP, run xbconnect in a GDK or razzle terminal. If you do not have a GDK or razzle terminal setup, you can find the setup guides here. It is recommended you try to get the GDK first as it is more generally compatible.
    [Get the GDK](https://microsoft.visualstudio.com/Xbox.Streaming/_wiki/wikis/Xbox.Streaming.wiki/62540/Devkit-Setup?anchor=step-2---get-the-gdk)
    [Razzle: Option 1](https://microsoft.sharepoint.com/teams/GamingEndpoints/_layouts/15/Doc.aspx?sourcedoc={e1f5b543-1ad6-46c9-88ab-1cae458ecc25}&action=edit&wd=target%28Non-HW%20Dev%20Onboarding.one%7Cd78166b5-4abd-4047-91f2-918d0e360700%2FGVFS%20and%20Razzle%7C623cb27f-edd5-4b7e-9e89-69c46ba8ae89%2F%29&wdorigin=NavigationUrl)
4. Edit [App.cpp](https://dev.azure.com/microsoft/Xbox.Streaming/_git/GameStreaming?path=/src/native/apps/ContentTestApp/windows/ContentTestApp/App.cpp&version=GBmain&_a=contents) to have your work PC's IP address. To find this, you have a few choices.

  *Option 1: System Settings* Click on Select Start > Settings > Network & internet > Ethernet / Wi-Fi and then select the Wi-Fi network you're connected to. Under Properties, look for your IP address listed next to IPv4 address.

  *Option 2: Command Line* Open terminal and run:

shell
ipconfig


  You want the IPv4 Address of the first option listed. As a sanity check you can run

shell
nslookup <IPv4 Address>


  This command will print out the PC name associated with this IP address. If you have the right one, a somewhat familiar name should be printed out (whatever you named your PC on setup plus some network stuff appended to the end).

5. Launch the metro bundler. It will connect to whatever IP you specified in the App.cpp file.

shell
yarn start


6. Build and deploy the solution from Visual Studio by clicking the green play button with the words Remote Machine. You may be prompted for a PIN; if so you have a few  options

  *Option 1: Use the Xbox DevHome:* Launch the Developer Home app. On the home page, click on the button â€œShow Visual Studio pinâ€. This generates a time-sensitive pin to connect you to the VS debugging session. The DevHome can be launched by using any one of the following methods:

- From the Home tab in XBOM portal app list, finding the dev Home app and clicking Actions > Launch.

- Navigating to the Windows Device Portal (WDP) which can be found at https://<Console System IP>:11443/. If you get blocked, click on Advanced details > Continue anyway. There you should be able to navigate to the Home tab, find Dev Home from the app list and click Actions > Launch.

- Open a razzle terminal and run:

shell
xbapp launch Microsoft.Xbox.DevHome_8wekyb3d8bbwe!App


  *Option 2: Razzle script:* Open a razzle terminal and runthe script that can be found at src/native/apps/ContentTestApp/scripts/setpin.cmd.

Once you have gotten a pin through either of the above methods, type it into the popup given by VS and click enter. If a second pop-up comes up that says something like â€œdeploy new build...â€ click yes.
  > It is possible the CTA is already downloaded to your console. If so, you might be asked if you want to uninstall it. Choose to uninstall the existing application.

*Note:* You only need to do the above setup steps once. After this the daily workflow will only be to launch the metro bundler and then click play from Visual Studio.

## Testing

---

CTA uses the jest framework, which can be run with

shell
yarn test


If you'd like to run the tests continuously, run

shell
yarn test:watch


See [jest](https://jestjs.io/) for help, docs, etc.

## Debugging

---

### C++, Java, and Objective C

#### Android Debugging

If you want to debug anything from the SDK, you will need to setup symbols. Open Android Studio. Let it sync. Open
"Edit Configurations". Select the Debugger tab. Select the debug type (probably Native or Dual). For the architecture
you are debugging, add a symbol directory. This should be something like
<repo_root>/src/sdk/lang/java/gamestreaming-sdk/build/intermediates/cmake/<build_type>/obj/<architecture>, where
<repo_root> is where you cloned the repo, <build_type> is debug or release, and <architecture> is the processor
architecture.

#### iOS Debugging

If you are debugging the react native modules, open the app's workspace in Xcode and set breakpoints, etc. If you are
debugging the main SDK, open the SDK project for the architecture you are working with in Xcode and attach the debugger
to the running process.

#### Windows Debugging

Open the ContentTestApp solution in Visual Studio and use as normal.

## Secondary packages and repositories

There are a number of pieces of the CTA that we share with other apps, so they are live in separate repos and are consumed as npm packages. Many of these were originally part of the CTA, but were split out. They continue to be owned and maintained by our team.

### List of packages

We have many packages that live in [Gaming.React](https://microsoft.visualstudio.com/Gaming.React/)
Otherwise just check the individual package's url source.

### Updating package versions

Whenever you make changes to the CTA's package.json to update the versions of these packages or any other packages that include native code, make sure you also run yarn pod on a Mac to update the contents of CTA/ios/Podfile.lock.  
If you do not have a Mac, we have a pipeline to do so! Run your branch on the [CTA.CocoaPods](https://microsoft.visualstudio.com/Xbox.Streaming/_build?definitionId=79494&_a=summary), which will commit an updated CocoaPods lock file to the branch on which you run it.

### Developing with the CTA

Since these projects are npm packages, they will normally be installed by yarn and just work. However, often developers may need to work on those projects and the CTA together. Unfortunately metro (the react-native bundler) does not work with symlinks, so we cannot use npm/yarn link functionality. What does work, is using [Watchman](https://facebook.github.io/watchman/) and [wml](https://github.com/wix/wml) to automatically copy the latest changes into the CTA's node_modules directory as you make changes. Here's how to do that:

Install wml

shell
yarn global add wml


Create a link from the secondary project to the CTA, and start watching

shell
wml add ~/my-repos/secondary-repo ~/my-repos/GameStreaming/src/native/apps/ContentTestApp/node_modules/secondary-package-name
wml start


Now when you change files in your secondary project, they will be instantly copied into the CTA. Note that most projects need to be built, since the CTA consumes their built bits (usually the dist/ directory), not the source directly.

#### Troubleshooting wml

- Strange bundler errors: our secondary projects all have a .watchmanconfig that is supposed to prevent their own node_modules folder from being copied, as that can cause some issues for Metro. If you run into strange issues, double check that there isn't a nested node_modules folder copied over, and delete it if there is.
- wml start does nothing on Windows: wml has some issues on Windows, and the only workaround we've found makes no sense, but it works - have Watchman watch wml itself. That means running: watchman watch %LOCALAPPDATA%\Yarn\Data\global\node_modules\wml\src, after which wml start should work. Note that if you used npm rather than yarn to install wml, you'll need to find the equivalent npm directory.

## Troubleshooting

---

[https://microsoft.visualstudio.com/Xbox.Streaming/_wiki/wikis/Xbox.Streaming.wiki/64062/Troubleshooting](https://microsoft.visualstudio.com/Xbox.Streaming/_wiki/wikis/Xbox.Streaming.wiki/64062/Troubleshooting)

## Architecture

See [./architecture.md](./architecture.md).

## Getting Project xCloud Internal Preview

---

As a Microsoft Employee you have access to the Project xCloud Internal Preview.

These steps will turn your Android or iOS Device into a xCloud client.

### Microsoft Internal Xbox Insider Program

- To sign up for the Microsoft Internal Xbox Insider Program (for Microsoft Employees) you will need to associate your personal Xbox Live account with your corporate account.
- Click on this link and follow the steps to associate your personal Xbox Live account with your corporate account [http://aka.ms/joinxip](http://aka.ms/joinxip).
  - You need to be on the corporate network (aka corpnet) to access the link.
  - If you are new to Microsoft the link may give you an error, send an email to xbihelp@microsoft.com tell them you are new to Microsoft and that the link is giving you an issue. They can sync your access permissions manually.
  - If you do not have a personal Xbox Live account, you will definitely need to create one first.

### Use Xbox Insider App to Sign Up for the Project xCloud Internal Preview

- Follow this link to find and download the Xbox Insider Hub App https://aka.ms/xip available on Windows and Xbox.
- Sign in using your personal Xbox Live account that is now associated with your corporate account.
- Under Insider Content within the Xbox Insider Hub App you will find the Xbox Game Streaming (Preview), please click and join it.
  - If you cannot find the Xbox Game Streaming (Preview) under Insider Content then you may have failed to sign up for the Microsoft Internal Xbox Insider Program (see previous step).

### Download the Xbox Game Streaming Preview application

- Use this link to access and download the [Xbox Game Streaming (Preview) application](https://install.appcenter.ms/orgs/Game-Streaming)
  - This is available for Android, iOS and Windows.
- The Xbox Game Streaming (Test) applications are for more advanced users.
- Sign in with your personal Xbox Live account that is now signed up for the Xbox Game Streaming (Preview) from within the Xbox Insider App.
- Once signed in you may pick between streaming from xCloud or from your personal Xbox console.
- Picking xCloud should then give you a list of games that you can choose from and enjoy!
- You should connect an Xbox Wireless Controller through BlueTooth to your iOS or Android Device for the best in game experience.

## Deep Linking

---

Deep Linking allows one to launch the CTA and move directly into a specific section in the application.

This means you can launch a stream directly from a link without browsing the catalogue first.

Currently the application supports App Links which employs the use of a unique schema/protocol (com.microsoft.gamestreaming://) that is registered by the respective Platform OS as a unique identifier for the application.

### How to get Title IDs

You can get title IDs from [Content Portal](https://gssv-dev-prod.xboxlive.com/ContentPortal/MICROSOFT). The Source ID column provides the title ID used with deep linking. For example, HALO5 is the title ID for "Halo 5: Guardians."

### Deep Linking on iOS

Type the deep linking url into Safari or the Notes app and click on it. For example, in safari provide the link below to stream a game:

bash
com.microsoft.gamestreaming://stream?titleId=<Game Title ID>


### Deep Linking on Android

Type the following on your console with a device or emulator connected that has the application installed:

shell
yarn deeplink:android "com.microsoft.gamestreaming://<path>?<parameters>"


### Deep Linking on Windows

Type the following into a terminal:

shell
yarn deeplink:windows "com.microsoft.gamestreaming://<path>?<parameters>"


### Deep Linking paths

|                       | Path                 | Params                                                    |
| --------------------- | -------------------- | --------------------------------------------------------- |
| Stream                | /stream              | titleId                                                   |
| PDP                   | /details             | titleId                                                   |
| Direct Connect        | /directConnect       | titleId                                                   |
| Offering              | /offering            | offeringId                                                |
| Stream Region         | /streamingRegion     | streamingRegion, systemUpdateGroup (String[])             |
| Offering + Region     | /offeringRegion      | offeringId, streamingRegion, systemUpdateGroup (String[]) |
| System Update Group   | /systemUpdateGroup   | systemUpdateGroup                                         |
| Feedback Screen       | /FeedbackScreen      |                                                           |
| Direct Connect Screen | /DirectConnectScreen |                                                           |
| Settings Screen       | /SettingsScreen      |                                                           |

## Upgrading packages for CVEs

- Find the version of the package you need to upgrade to. For example, lodash@4.17.19.
- Run yarn upgrade package@version. You may want to take the latest version with yarn package@^version. For example, yarn upgrade lodash@^4.17.19.
- You may need to use yarn resolutions when the package you are upgrading is a dependency of other packages. For example, lodash is used by many packages. In package.json, find the resolutions section and add the package name and version, then run yarn install. Continuing the lodash example, "lodash": "^4.17.19", would be added to the resolutions section.
- You may want to run yarn audit, which may find additional vulnerabilities.

## iOS BuildGate Certs

Occasionally the certs used to sign the iOS build from the BuildGate will expire. Here is how to renew the certs.
If the cert that is expired is a dev cert, you can regenerate it through the Apple Developer Portal and using Keychain on your Mac. Tutorial here <http://docs.eggplantsoftware.com/ePF/using/epf-ios-gateway-signing-certificate.htm>

If you need a prod cert or a profile, you can request one through <https://aka.ms/maptool>. Ideally we submit a request before the current one expires. We can also contact Jason Coates (v-jacote) for help. He can help with any questions we may have.

## Working with GSUI and other Gaming.React packages

As of right now, all Gaming.React packages use npm as their package manager, not yarn.  
Make sure you have npm 6 installed when working with these packages. We hope to move to npm 7 eventually, but not yet.  
You can install the latest version of npm 6 with npm install -g npm@6.14.13.