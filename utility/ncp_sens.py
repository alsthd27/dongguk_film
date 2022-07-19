import os, sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from dongguk_film import settings
import time, hmac, hashlib, base64, requests, json


ncp_access_key_id = getattr(settings, "NCP_ACCESS_KEY_ID", "NCP_ACCESS_KEY_ID")
ncp_secret_key = getattr(settings, "NCP_SECRET_KEY", "NCP_SECRET_KEY")
ncp_sens_sms_service_id = getattr(
    settings, "NCP_SENS_SMS_SERVICE_ID", "NCP_SENS_SMS_SERVICE_ID"
)
mgt_phone = getattr(settings, "MGT_PHONE", "MGT_PHONE")


def send_sms(dict_data, str_sms_type):
    data = dict_data
    type = str_sms_type
    if type == "sign up":
        raw_content = f'[디닷에프] 휴대전화 번호 인증번호는 {data["content"]}{handle_hangul(pronounce_last_number(data["content"]), "이에요예요", False)}!'
    service = init_service()
    from_no = mgt_phone
    to_no = "".join(filter(str.isalnum, data["phone"]))
    content = raw_content
    msg_data = {
        "type": "SMS",
        "countryCode": "82",
        "from": from_no,
        "contentType": "COMM",
        "content": content,
        "messages": [{"to": to_no}],
    }
    response = requests.post(
        service["sms_url"],
        data=json.dumps(msg_data),
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "x-ncp-apigw-timestamp": service["stime"],
            "x-ncp-iam-access-key": service["acc_key_id"],
            "x-ncp-apigw-signature-v2": service["d_hash"],
        },
    )
    return response.text


def init_service():
    sid = ncp_sens_sms_service_id
    sms_uri = f"/sms/v2/services/{sid}/messages"
    sms_url = f"https://sens.apigw.ntruss.com{sms_uri}"
    acc_key_id = ncp_access_key_id
    acc_sec_key = bytes(ncp_secret_key, "utf-8")
    stime = int(float(time.time()) * 1000)
    hash_str = f"POST {sms_uri}\n{stime}\n{acc_key_id}"
    digest = hmac.new(
        acc_sec_key, msg=hash_str.encode("utf-8"), digestmod=hashlib.sha256
    ).digest()
    d_hash = base64.b64encode(digest).decode()
    service = {
        "sms_url": sms_url,
        "stime": str(stime),
        "acc_key_id": acc_key_id,
        "d_hash": d_hash,
    }
    return service


def pronounce_last_number(str_number):
    num = str_number
    n = num[-1]
    pron = (
        "공"
        if n == "0"
        else "일"
        if n == "1"
        else "이"
        if n == "2"
        else "삼"
        if n == "3"
        else "사"
        if n == "4"
        else "오"
        if n == "5"
        else "육"
        if n == "6"
        else "칠"
        if n == "7"
        else "팔"
        if n == "8"
        else "구"
        if n == "9"
        else None
    )
    str_pron = pron
    return str_pron


def handle_hangul(str_word, str_handling_type, boolean_merge):
    word = str_word
    type = str_handling_type
    merge = boolean_merge
    has_batchim = (ord(word[-1]) - ord("가")) % 28 > 0
    if type == "을를":
        element = "을" if has_batchim else "를"
    elif type == "이가":
        element = "이" if has_batchim else "가"
    elif type == "은는":
        element = "은" if has_batchim else "는"
    elif type == "와과":
        element = "과" if has_batchim else "와"
    elif type == "이에요예요":
        element = "이에요" if has_batchim else "예요"
    result = word + element if merge else element
    str_result = result
    return str_result
