interface Text {
    key: string
    en: string
    ko: string
}
const texts = new Array<Text>()
const localeCode = Intl.DateTimeFormat().resolvedOptions().locale
console.log(localeCode)
var locale = "en"
if (localeCode === "ko-KR")
    locale = "ko"
var size = 0
function a(key: string, en: string, ko: string) { texts[size++] = { key: key, en: en, ko: ko } }
a("fw_wait_create", "Waiting for file to be created...", "파일 생성 대기중...")
a("fw_wait_change", "Waiting for file to be changed...", "파일 변경 대기중...")
a("fw_file_create", "File creation detected", "파일 생성 감지됨")
a("fw_file_change", "File change detected", "파일 변화 감지됨")
a("main_modify_config", "Please modify config.json and restart.", "config.json 파일을 수정한 후 재실행 해주시기 바랍니다.")
a("main_read_config", "Reading config.json...", "config.json 파일 읽는 중....")
a("main_config_not_found", "Config file not found. Create a new one.", "설정 파일을 찾을 수 없습니다. 새로 생성합니다.")
a("server_listen", "Waiting for client to connect...", "클라이언트 연결 대기중...")
a("server_connect", "Connect", "연결")
a("server_connect_exists", "Disconnect the existing connection.", "기존 연결과 연결해제합니다.")
a("server_disconnect", "Disconnect", "연결해제")
a("server_not_connect", "Not connected", "연결되어있지 않습니다.")
a("server_send", "Send file", "파일 보냄")
a("server_send_end", "File transfer is complete.", "파일 전송이 완료되었습니다.")

export function get(key: string): string {
    var r = "null"
    texts.forEach((value: Text, index: number) => {
        if (value.key === key) {
            r = value[locale]
            return
        }
    })
    return r
}