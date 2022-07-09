const onlyHanguls = document.querySelectorAll(".only-hangul");
const onlyNumbers = document.querySelectorAll(".only-number");
const eventTypes = ["focusin", "focusout", "compositionstart", "compositionupdate", "compositionend", "keydown", "keypress", "keyup", "mouseenter", "mouseover", "mousemove", "mousedown", "mouseup", "click", "contextmenu", "mouseleave", "mouseout", "select"];
const allowedKeys = ["Backspace", "Tab", "Shift", "Control", "Alt", "HangulMode", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
const regHangul = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
const regNotHangul = /[^ㄱ-ㅎㅏ-ㅣ가-힣]/g;
const regNotNumber = /[^0-9]/g;
const regNotPhone = /[^0-9\-]/g;
const inputs = [];
const labels = document.querySelectorAll("label");

if ((window.location.pathname).includes("signup")) {
    inputs.push(id_email, id_student_id, id_name, id_phone, id_vcode)
};

eventTypes.forEach((type) => {
    onlyHanguls.forEach((input) => {
        input.addEventListener(type, () => {
            input.value = input.value.replace(regNotHangul, "")
        })
    })
    onlyNumbers.forEach((input) => {
        input.addEventListener(type, () => {
            input.value = input.value.replace(regNotNumber, "")
        })
    })
    id_email.addEventListener(type, () => {
        id_email.value = id_email.value.replace(regHangul, "")
    })
    id_phone.addEventListener(type, () => {
        id_phone.value = id_phone.value.replace(regNotNumber, "").replace(/(^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-")
    })
});

inputs.forEach((input) => {
    input.addEventListener("keydown", (event) => {
        var inputKeyChar = event.key
        if (input == id_email) {
            if (inputKeyChar.indexOf("Process") != -1 && allowedKeys.indexOf(inputKeyChar) == -1) {
                displayDescr(true, input, "no hanguls")
            } else {
                displayDescr(false, input)
            }
        }
        if (input == id_student_id || input == id_vcode) {
            if (regNotNumber.test(input.value) ||
                (regNotNumber.test(inputKeyChar) && allowedKeys.indexOf(inputKeyChar) == -1)) {
                displayDescr(true, input, "only numbers")
            } else {
                displayDescr(false, input)
            }
        }
        if (input == id_name) {
            if (regNotHangul.test(input.value) ||
                (!event.isComposing && allowedKeys.indexOf(inputKeyChar) == -1)) {
                displayDescr(true, input, "only hanguls")
            } else {
                displayDescr(false, input)
            }
        }
        if (input == id_phone) {
            if (regNotPhone.test(input.value) ||
                (regNotPhone.test(inputKeyChar) && allowedKeys.indexOf(inputKeyChar) == -1)) {
                displayDescr(true, input, "only numbers")
            } else {
                displayDescr(false, input)
            }
        }
        if (inputKeyChar == " ") {
            displayDescr(true, input, "no spaces")
        }
    })
    input.addEventListener("focusout", () => {
        displayDescr(false, input)
        if (input == id_email) {
            if (input.value.length == 0) {
                displayError(true, input, "empty")
            }
            if (input.value.indexOf("@") == -1 ||
                input.value.split("@")[0].length <= 1 ||
                input.value.split("@")[1].indexOf(".") == -1 ||
                input.value.split("@")[1].split(".")[0].length <= 1 ||
                input.value.split("@")[1].split(".")[1].length <= 1 ||
                (input.value.split("@")[1].split(".").length - 1 == 2 && input.value.split("@")[1].split(".")[2].length <= 1)) {
                displayError(true, input, "insufficient")
            }
            if (input.value.substr(-1) == "." ||
                input.value.split("@")[1].split(".").length - 1 == 3) {
                displayError(true, input, "invalid")
            }
        }
        if (input == id_student_id) {
            if (input.value.length == 0) {
                displayError(true, input, "empty")
            }
            if (input.value.length !== 10) {
                displayError(true, input, "insufficient")
            }
            if (input.value.indexOf("113") !== 4) {
                displayError(true, input, "invalid")
            }
        }
        if (input == id_name) {
            if (input.value.length == 0) {
                displayError(true, input, "empty")
            }
            if (input.value.length == 1) {
                displayError(true, input, "insufficient")
            }
        }
        if (input == id_phone) {
            if (input.value.length == 0) {
                displayError(true, input, "empty")
            }
            if (input.value.length !== 13) {
                displayError(true, input, "insufficient")
            }
            if (input.value.indexOf("-") !== 3 && input.value.lastIndexOf("-") !== 8) {
                displayError(true, input, "invalid")
            }
        }
        if (input == id_vcode) {
            if (input.value.length == 0) {
                displayError(true, input, "empty")
            }
            if (input.value.length !== 6) {
                displayError(true, input, "insufficient")
            }
        }
    })
    input.addEventListener("focusin", () => {
        displayError(false, input)
    })
});

function displayDescr(boolean, input, descrType) {
    var descrMsg = eval(String(input.id) + "_description")
    if (boolean == true) {
        var sentence
        if (descrType == "no hanguls") {
            sentence = "로마자, 숫자, 특수문자만 입력해주세요."
        } else if (descrType == "only numbers") {
            sentence = "숫자만 입력해주세요."
        } else if (descrType == "only hanguls") {
            sentence = "한글만 입력해주세요."
        } else if (descrType == "no spaces") {
            sentence = "공백은 입력될 수 없어요."
        }
        descrMsg.innerText = `${sentence}`
        descrMsg.hidden = false
    } else if (boolean == false) {
        descrMsg.innerText = null
        descrMsg.hidden = true
    }
};

function displayError(boolean, input, errorType) {
    var errorMsg = eval(String(input.id) + "_error")
    if (boolean == true) {
        var subject
        var narrativeClause
        input.classList.remove("border-gray-300")
        input.classList.add("bg-flamingo-50")
        input.classList.add("border-transparent")
        if (errorType == "empty") {
            subject = josa(labelStr(input), "을를")
            narrativeClause = "입력해주세요."
        } else if (errorType == "insufficient") {
            subject = josa(labelStr(input), "이가")
            narrativeClause = "덜 입력된 것 같아요."
        } else if (errorType == "invalid") {
            subject = josa(labelStr(input), "이가")
            narrativeClause = "잘못 입력된 것 같아요."
        }
        errorMsg.innerText = `${subject} ${narrativeClause}`
        errorMsg.hidden = false
    } else if (boolean == false) {
        input.classList.add("border-gray-300")
        input.classList.remove("bg-flamingo-50")
        errorMsg.innerText = null
        errorMsg.hidden = true
    }
};

function josa(letter, format) {
    var hasBatchim = (letter.substr(-1).charCodeAt(0) - parseInt("ac00", 16)) % 28 > 0
    var josaAdded
    if (hasBatchim == true) {
        if (format == "을를") {
            josaAdded = letter + "을"
        } else if (format == "이가") {
            josaAdded = letter + "이"
        } else if (format == "은는") {
            josaAdded = letter + "은"
        } else if (format == "와과") {
            josaAdded = letter + "과"
        }
    } else if (hasBatchim == false) {
        if (format == "을를") {
            josaAdded = letter + "를"
        } else if (format == "이가") {
            josaAdded = letter + "가"
        } else if (format == "은는") {
            josaAdded = letter + "는"
        } else if (format == "와과") {
            josaAdded = letter + "와"
        }
    }
    return josaAdded
};

function labelStr(input) {
    var labelStr
    labels.forEach((label) => {
        if (label.getAttribute("for") == String(input.id)) {
            labelStr = label.innerText
        }
    })
    return labelStr
};