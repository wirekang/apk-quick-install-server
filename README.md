English |  <a href="README.ko.md">한국어</a>

## APK Quick Install Server

This is desktop application, the server of <a href="https://github.com/wirekang/apk-quick-install">APK Quick Install</a>. The overall service is described in the <a href="https://github.com/wirekang/apk-quick-install">APKQI repository</a>.

### Usage

You can download binary excutables from <a href="https://github.com/wirekang/apk-quick-install-server/releases">Release</a>.

It must be config.json file exists in the same folder when you run the program. config.json file has the following format:

    { "file": "C:/android-studio/APKQI/app/build/outputs/apk/debug/app-debug.apk", "port": 12321 }

In "file", enter the location of the file to detect creation or change, and in "port", enter the port number to use when connecting with client.
