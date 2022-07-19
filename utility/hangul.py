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
