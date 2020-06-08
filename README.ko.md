<a href="README.md">English</a> |  <a href="README.ko.md">한국어</a>

## APK Quick Install
이것은 PC에서 특정 경로의 apk파일의 생성 또는 변화를 감지하여 안드로이드 장치로 전송, 설치 요청을 해 주는 서비스입니다. 한 마디로 Android Studio에서 apk파일을 build함과 동시에 핸드폰 화면에 <strong>"설치하시겠습니까?"</strong>를 띄워줍니다.

### 왜 필요한가
이 서비스는 대부분의 상황에서 불필요하지만 다음과 같은 제약이 있는 환경에서는 유용합니다.

* <strong>PC와 장치 간 USB연결 불가능(에 따른 무선 adb사용 불가능)</strong>
*  <strong>AVD(에뮬레이터) 사용 불가능</strong>

USB와 에뮬레이터 사용이 불가능 하다면 남은 방법은 단 하나, 실행이 필요할 때 마다 apk파일을 빌드하고 구글 드라이브에 업로드 하거나 스스로에게 메일을 보낸 후 핸드폰에서 다운로드 받아 설치하는 것 입니다. 이 과정을 자동화한 것이 바로 이 서비스입니다.

### 사용법
1. PC에서 <a href="https://github.com/wirekang/apk-quick-install-server">서버</a>를 실행시킵니다.
2. 안드로이드 장치에서 <a href="https://google.com">어플리케이션</a>을 실행시킵니다.