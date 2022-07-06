const onlyHanguls = document.querySelectorAll(".only-hangul");
const onlyNumbers = document.querySelectorAll(".only-number");
const eventTypes = ["focusin", "focusout", "compositionstart", "compositionupdate", "compositionend", "keydown", "keypress", "keyup", "mouseenter", "mouseover", "mousemove", "mousedown", "mouseup", "click", "contextmenu", "mouseleave", "mouseout", "select"];
const allowedKeys = ["Backspace", "Tab", "Shift"];
const regNotHangul = /[^ㄱ-ㅎㅏ-ㅣ가-힣]/g;
const regNotNumber = /[^0-9]/g;
const regNotPhone = /[^0-9\-]/g;

const inputs = [];
if ((window.location.pathname).includes("signup")) {
    inputs.push(id_email, id_student_id, id_last_name, id_first_name, id_phone, id_vcode)
};

onlyHanguls.forEach((input) => {
    eventTypes.forEach((type) => {
        input.addEventListener(type, () => {
            input.value = input.value.replace(regNotHangul, "")
        })
    })
});

onlyNumbers.forEach((input) => {
    eventTypes.forEach((type) => {
        input.addEventListener(type, () => {
            input.value = input.value.replace(regNotNumber, "")
        })
    })
});

eventTypes.forEach((type) => {
    id_phone.addEventListener(type, () => {
        id_phone.value = id_phone.value.replace(regNotNumber, "").replace(/(^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-")
    })
});

inputs.forEach((input) => {
    if (input == id_last_name || input == id_first_name) {
        var descrMsg = id_name_description
        var errorMsg = id_name_error
    } else {
        var descrMsg = eval(String(input.id) + "_description")
        var errorMsg = eval(String(input.id) + "_error")
    }
    input.addEventListener("keyup", (event) => {
        var inputKeyChar = event.key
        if (input == id_student_id || input == id_vcode) {
            if (regNotNumber.test(input.value) ||
                (regNotNumber.test(inputKeyChar) && allowedKeys.indexOf(inputKeyChar) == -1)) {
                descrMsg.innerText = "숫자만 입력해주세요."
                descrMsg.hidden = false
            } else {
                descrMsg.innerText = null
                descrMsg.hidden = true
            }
        }
        if (input == id_last_name || input == id_first_name) {
            if (regNotHangul.test(input.value) ||
                (!event.isComposing && allowedKeys.indexOf(inputKeyChar) == -1)) {
                descrMsg.innerText = "한글만 입력해주세요."
                descrMsg.hidden = false
                console.log(event.key)
            } else {
                descrMsg.innerText = null
                descrMsg.hidden = true
            }
        }
        if (input == id_phone) {
            if (regNotPhone.test(input.value) ||
                (regNotPhone.test(inputKeyChar) && allowedKeys.indexOf(inputKeyChar) == -1)) {
                descrMsg.innerText = "숫자만 입력해주세요."
                descrMsg.hidden = false
            } else {
                descrMsg.innerText = null
                descrMsg.hidden = true
            }
        }
    })
    input.addEventListener("focusout", () => {
        if (input == id_student_id) {
            if (input.value.length == 0) {
                showError(true, input, errorMsg)
                errorMsg.innerText = "학번을 입력해주세요."
            } else if (input.value.length !== 10) {
                showError(true, input, errorMsg)
                errorMsg.innerText = "학번이 덜 입력된 것 같아요."
            } else if (input.value.indexOf("113") !== 4) {
                showError(true, input, errorMsg)
                errorMsg.innerText = "학번이 잘못 입력된 것 같아요."
            }
        }
        if (input == id_last_name || input == id_first_name) {
            if (id_last_name.value.length == 0 && id_first_name.value.length == 0) {
                showError(true, id_last_name, errorMsg)
                showError(true, id_first_name, errorMsg)
                errorMsg.innerText = "성명을 입력해주세요."
            } else if ((id_last_name.value.length == 0 && id_first_name.value.length !== 0)) {
                showError(true, id_last_name, errorMsg)
                errorMsg.innerText = "성을 입력해주세요."
            } else if ((id_last_name.value.length !== 0 && id_first_name.value.length == 0)) {
                showError(true, id_first_name, errorMsg)
                errorMsg.innerText = "이름을 입력해주세요."
            }
        }
        if (input == id_phone) {
            if (input.value.length == 0) {
                showError(true, input, errorMsg)
                errorMsg.innerText = "휴대전화 번호를 입력해주세요."
            } else if (input.value.length !== 13) {
                showError(true, input, errorMsg)
                errorMsg.innerText = "휴대전화 번호가 덜 입력된 것 같아요."
            } else if (input.value.indexOf("-") !== 3 && input.value.lastIndexOf("-") !== 8) {
                showError(true, input, errorMsg)
                errorMsg.innerText = "휴대전화 번호가 잘못 입력된 것 같아요."
            }
        }
        if (input == id_vcode) {
            if (input.value.length == 0) {
                showError(true, input, errorMsg)
                errorMsg.innerText = "인증번호를 입력해주세요."
            } else if (input.value.length !== 6) {
                showError(true, input, errorMsg)
                errorMsg.innerText = "인증번호가 덜 입력된 것 같아요."
            }
        }
        descrMsg.innerText = null
        descrMsg.hidden = true
    })
    input.addEventListener("focusin", () => {
        if (input == id_email) {
            descrMsg.innerText = "이메일 주소는 수정할 수 없어요."
            descrMsg.hidden = false
        } else {
            showError(false, input, errorMsg)
            descrMsg.innerText = null
            descrMsg.hidden = true
        }
    })
});

function showError(boolean, input, errorMsg) {
    if (boolean == true) {
        input.classList.remove("border-gray-300")
        input.classList.add("bg-flamingo-50")
        input.classList.add("border-transparent")
        errorMsg.hidden = false
    } else if (boolean == false) {
        if (input == id_last_name || input == id_first_name) {
            id_last_name.classList.add("border-gray-300")
            id_last_name.classList.remove("bg-flamingo-50")
            id_first_name.classList.add("border-gray-300")
            id_first_name.classList.remove("bg-flamingo-50")
        } else {
            input.classList.add("border-gray-300")
            input.classList.remove("bg-flamingo-50")
        }
        errorMsg.innerText = null
        errorMsg.hidden = true
    }
};