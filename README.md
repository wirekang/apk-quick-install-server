English |  <a href="README.ko.md">한국어</a>

## APK Quick Install Server

이것은 <a href="https://github.com/wirekang/apk-quick-install">APK Quick Install</a>의 서버인 데스크톱 프로그램입니다. 전반적인 서비스에 대한 설명은 해당 저장소를 참고하시기 바랍니다.

### 다운로드 및 사용법

실행 파일은 <a href="https://github.com/wirekang/apk-quick-install-server/releases">Release</a>에서 다운로드 받을 수 있습니다. 

프로그램을 실행할 때에는 같은 폴더 안에 config.json 파일이 존재해야 합니다. config.json 파일은 다음과 같은 형식입니다.

    { "file": "C:/android-studio/APKQI/app/build/outputs/apk/debug/app-debug.apk", "port": 12321 }

"file"에는 생성 또는 변화를 감지할 파일의 위치를, "port"에는 클라이언트와 통신할 때 사용할 포트의 번호를 넣으면 됩니다.
