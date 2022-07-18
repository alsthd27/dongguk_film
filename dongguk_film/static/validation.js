const onlyHanguls = document.querySelectorAll(".only-hangul");
const onlyNumbers = document.querySelectorAll(".only-number");
const onlyEmails = document.querySelectorAll(".only-email");
const onlyPhones = document.querySelectorAll(".only-phone");
const eventTypes = ["focusin", "focusout", "compositionstart", "compositionupdate", "compositionend", "keydown", "keypress", "keyup", "mouseenter", "mouseover", "mousemove", "mousedown", "mouseup", "click", "contextmenu", "mouseleave", "mouseout", "select"];
const allowedKeys = ["Enter", "Backspace", "Tab", "Shift", "Control", "Alt", "HangulMode", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
const regHangul = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
const regNotHangul = /[^ㄱ-ㅎㅏ-ㅣ가-힣]/g;
const regEmail = /^[0-9a-zA-Z]([\-.\w]*[0-9a-zA-Z\-_+])*@([0-9a-zA-Z][\-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}$/g;
const regNotNumber = /[^0-9]/g;
const regNotPhone = /[^0-9\-]/g;
const labels = document.querySelectorAll("label");
const inputs = [];
const enableAfterVerifs = document.querySelectorAll(".enable-after-verif");

if ((window.location.pathname).includes("signup")) {
    var checkBoxes = document.querySelectorAll("input[type='checkbox']")
    var stepOnes = document.querySelectorAll(".step-one");
    var stepTwos = document.querySelectorAll(".step-two");
    var filteredInputs = [];
    function isValid(input) {
        var condition = input.type != "checkbox" ? input.value.length > 0 : input.checked
        return condition && codeDescr(input).hidden && codeError(input).hidden
    }
    inputs.push(...checkBoxes)
    inputs.push(...stepOnes)
    inputs.push(...stepTwos)
    id_get_vcode.addEventListener("click", () => {
        filteredInputs = inputs.filter(isValid)
        if (filteredInputs.length == inputs.length - stepTwos.length) {
            createVcode();
            id_get_vcode_description.innerText = "인증번호가 전송되었어요!";
            id_get_vcode_description.hidden = false;
            checkBoxes.forEach((input) => {
                input.disabled = true;
            })
            stepOnes.forEach((input) => {
                input.readOnly = true;
            })
            id_get_vcode.disabled = true;
            stepTwos.forEach((input) => {
                input.disabled = false;
            })
            id_confirm_vcode.disabled = false;
        } else {
            checkBoxes.forEach((input) => {
                manageError(input);
            })
            stepOnes.forEach((input) => {
                manageError(input);
            })
        }
    })
    id_confirm_vcode.addEventListener("click", () => {
        filteredInputs = inputs.filter(isValid)
        if (filteredInputs.length == inputs.length) {
            confirmVcode();
        } else {
            stepTwos.forEach((input) => {
                manageError(input);
            })
        }
    })
};

function validation() {
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
        onlyEmails.forEach((input) => {
            input.addEventListener(type, () => {
                input.value = input.value.replace(regHangul, "")
            })
        })
        onlyPhones.forEach((input) => {
            input.addEventListener(type, () => {
                input.value = input.value.replace(regNotNumber, "").replace(/(^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-")
            })
        })
    });

    inputs.forEach((input) => {
        input.addEventListener("keydown", (event) => {
            manageDescr(input, event);
        });
        input.addEventListener("focusout", () => {
            displayDescr(false, input);
            manageError(input);
        });
        input.addEventListener("focusin", () => {
            displayError(false, input);
        });
    });
};

function manageDescr(input, event) {
    var inputKeyChar = event.key;
    if (input == id_student_id || input == id_email_vcode || input == id_phone_vcode) {
        if (regNotNumber.test(input.value) ||
            (regNotNumber.test(inputKeyChar) && allowedKeys.indexOf(inputKeyChar) == -1)) {
            displayDescr(true, input, "only numbers");
        } else {
            displayDescr(false, input);
        }
    }
    if (input == id_name) {
        if (regNotHangul.test(input.value) ||
            (!event.isComposing && allowedKeys.indexOf(inputKeyChar) == -1)) {
            displayDescr(true, input, "only hanguls");
        } else {
            displayDescr(false, input);
        }
    }
    if (input == id_email) {
        if (event.isComposing && allowedKeys.indexOf(inputKeyChar) == -1) {
            displayDescr(true, input, "no hanguls");
        } else {
            displayDescr(false, input);
        }
    }
    if (input == id_phone) {
        if (regNotPhone.test(input.value) ||
            (regNotPhone.test(inputKeyChar) && allowedKeys.indexOf(inputKeyChar) == -1)) {
            displayDescr(true, input, "only numbers");
        } else {
            displayDescr(false, input);
        }
    }
    if (inputKeyChar == " ") {
        displayDescr(true, input, "no spaces");
    }
};

function displayDescr(boolean, input, descrType) {
    var descrMsg = codeDescr(input);
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

function codeDescr(input) {
    return eval(String(input.id) + "_description")
};

function manageError(input) {
    if (input == id_agree) {
        if (input.checked == false) {
            displayError(true, input, "unchecked");
        }
    }
    if (input == id_student_id) {
        if (input.value.length == 0) {
            displayError(true, input, "empty");
        } else if (input.value.length !== 10) {
            displayError(true, input, "insufficient");
        } else if (input.value.indexOf("113") !== 4) {
            displayError(true, input, "invalid");
        }
    }
    if (input == id_name) {
        if (input.value.length == 0) {
            displayError(true, input, "empty");
        } else if (input.value.length == 1) {
            displayError(true, input, "insufficient");
        }
    }
    if (input == id_email) {
        if (input.value.length == 0) {
            displayError(true, input, "empty");
        } else if (input.value.indexOf("@") == -1 ||
            input.value.split("@")[0].length <= 1 ||
            input.value.split("@")[1].indexOf(".") == -1 ||
            input.value.split("@")[1].split(".")[0].length <= 1 ||
            input.value.split("@")[1].split(".")[1].length <= 1 ||
            (input.value.split("@")[1].split(".").length - 1 == 2 && input.value.split("@")[1].split(".")[2].length <= 1 && input.value.substr(-1) != ".")) {
            displayError(true, input, "insufficient");
        } else if (!input.value.match(regEmail)) {
            displayError(true, input, "invalid");
        }
    }
    if (input == id_phone) {
        if (input.value.length == 0) {
            displayError(true, input, "empty");
        } else if (input.value.length !== 13) {
            displayError(true, input, "insufficient");
        } else if (input.value.indexOf("-") !== 3 && input.value.lastIndexOf("-") !== 8) {
            displayError(true, input, "invalid");
        }
    }
    if (input == id_email_vcode || input == id_phone_vcode) {
        if (input.value.length == 0) {
            displayError(true, input, "empty");
        } else if (input.value.length !== 6) {
            displayError(true, input, "insufficient");
        }
    }
};

function displayError(boolean, input, errorType) {
    var errorMsg = codeError(input);
    if (boolean == true) {
        var subject
        var narrativeClause
        if (input.type != "checkbox") {
            input.classList.remove("border-gray-300")
            input.classList.add("bg-flamingo-50")
            input.classList.add("border-transparent")
        }
        if (errorType == "unchecked") {
            subject = matchJosa(`'${findLabel(input)}'`, "을를")
            narrativeClause = "체크해주세요."
        } else if (errorType == "empty") {
            subject = matchJosa(findLabel(input), "을를")
            narrativeClause = "입력해주세요."
        } else if (errorType == "insufficient") {
            subject = matchJosa(findLabel(input), "이가")
            narrativeClause = "덜 입력된 것 같아요."
        } else if (errorType == "invalid") {
            subject = matchJosa(findLabel(input), "이가")
            narrativeClause = "잘못 입력된 것 같아요."
        }
        errorMsg.innerText = `${subject} ${narrativeClause}`
        errorMsg.hidden = false
    } else if (boolean == false) {
        if (input.type != "checkbox") {
            input.classList.add("border-gray-300")
            input.classList.remove("bg-flamingo-50")
        }
        errorMsg.innerText = null
        errorMsg.hidden = true
    }
};

function codeError(input) {
    return eval(String(input.id) + "_error")
};

function matchJosa(word, type) {
    var hasBatchim = (word.substr(-1).charCodeAt(0) - parseInt("ac00", 16)) % 28 > 0
    var josaAdded
    if (type == "을를") {
        josaAdded = hasBatchim ? word + "을" : word + "를"
    } else if (type == "이가") {
        josaAdded = hasBatchim ? word + "이" : word + "가"
    } else if (type == "은는") {
        josaAdded = hasBatchim ? word + "은" : word + "는"
    } else if (type == "와과") {
        josaAdded = hasBatchim ? word + "과" : word + "와"
    }
    return josaAdded
};

function findLabel(input) {
    var labelStr
    labels.forEach((label) => {
        if (label.getAttribute("for") == String(input.id)) {
            labelStr = label.innerText
        }
    })
    return labelStr
};

function createVcode() {
    data = {
        "agree": `${id_agree.checked}`,
        "student_id": `${id_student_id.value}`,
        "name": `${id_name.value}`,
        "email": `${id_email.value}`,
        "phone": `${id_phone.value}`
    }
    $.ajax({
        url: `${location.protocol}//${location.host}/users/create-vcode`,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success: function (object) {
            console.log(object.status);
        },
        error: function () {
            console.log("failed to create vcode");
        },
    })
};

function confirmVcode() {
    data = {
        "agree": `${id_agree.checked}`,
        "student_id": `${id_student_id.value}`,
        "name": `${id_name.value}`,
        "email": `${id_email.value}`,
        "phone": `${id_phone.value}`,
        "email_vcode": `${id_email_vcode.value}`,
        "phone_vcode": `${id_phone_vcode.value}`
    }
    $.ajax({
        url: `${location.protocol}//${location.host}/users/confirm-vcode`,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success: function (object) {
            console.log(object.status);
        },
        error: function () {
            console.log("failed to confirm vcode");
        },
    })
};

validation();