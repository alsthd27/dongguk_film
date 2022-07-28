let onlyHanguls = document.querySelectorAll(".only-hangul");
let onlyNumbers = document.querySelectorAll(".only-number");
let onlyEmails = document.querySelectorAll(".only-email");
let onlyPhones = document.querySelectorAll(".only-phone");
let eventTypes = ["focusin", "focusout", "compositionstart", "compositionupdate", "compositionend", "keydown", "keypress", "keyup", "mouseenter", "mouseover", "mousemove", "mousedown", "mouseup", "click", "contextmenu", "mouseleave", "mouseout", "select"];
let allowedKeys = ["Enter", "Backspace", "Tab", "Shift", "Control", "Alt", "HangulMode", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
let regHangul = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
let regNotHangul = /[^ㄱ-ㅎㅏ-ㅣ가-힣]/g;
let regEmail = /^[0-9a-zA-Z]([\-.\w]*[0-9a-zA-Z\-_+])*@([0-9a-zA-Z][\-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}$/g;
let regNotNumber = /[^0-9]/g;
let regNotPhone = /[^0-9\-]/g;
let labels = document.querySelectorAll("label");
let inputs = [];
let buttons = document.querySelectorAll("button");
let now = new Date();

if ((window.location.pathname).includes("signup")) {
    var stepOnes = document.querySelectorAll(".step-one");
    var stepTwos = document.querySelectorAll(".step-two");
    var filteredInputs = [];
    initValidation(stepOnes, id_create_vcode);
    id_create_vcode.addEventListener("click", () => {
        filteredInputs = inputs.filter(isValid)
        if (filteredInputs.length == inputs.length) {
            makeAjaxCall("create vcode");
            displayButtonMsg(false, id_create_vcode, "descr");
            displayButtonMsg(false, id_create_vcode, "error");
        } else {
            inputs.forEach((input) => {
                manageError(input);
            })
        }
        ["keydown", "focusin"].forEach((type) => {
            inputs.forEach((input) => {
                input.addEventListener(type, () => {
                    displayButtonMsg(false, id_create_vcode, "error");
                })
            })
        })
    })
    id_confirm_vcode.addEventListener("click", () => {
        filteredInputs = inputs.filter(isValid)
        if (filteredInputs.length == inputs.length) {
            makeAjaxCall("confirm vcode");
            displayButtonMsg(false, id_confirm_vcode, "error");
        } else {
            inputs.forEach((input) => {
                manageError(input);
            })
        }
        ["keydown", "focusin"].forEach((type) => {
            inputs.forEach((input) => {
                input.addEventListener(type, () => {
                    displayButtonMsg(false, id_confirm_vcode, "error");
                })
            })
        })
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
    })
    inputs.forEach((input) => {
        input.addEventListener("keydown", (event) => {
            displayError(false, input);
            manageDescr(input, event);
        });
        input.addEventListener("focusout", () => {
            displayDescr(false, input);
            manageError(input);
        });
        input.addEventListener("focusin", () => {
            displayError(false, input);
        });
    })
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

function codeDescr(id) {
    return eval(String(id.id) + "_description")
};

function manageError(input) {
    if (input == id_agree) {
        if (input.checked == false) {
            displayError(true, input, "unchecked");
        } else {
            return false;
        }
    }
    if (input == id_student_id) {
        if (input.value.length == 0) {
            displayError(true, input, "empty");
        } else if (input.value.length !== 10) {
            displayError(true, input, "insufficient");
        } else if (Number(input.value.substr(0, 4)) > now.getFullYear()) {
            displayError(true, input, "invalid");
        } else if (input.value.indexOf("113") !== 4) {
            displayError(true, input, "invalid");
        } else {
            return false;
        }
    }
    if (input == id_name) {
        if (input.value.length == 0) {
            displayError(true, input, "empty");
        } else if (input.value.length == 1) {
            displayError(true, input, "insufficient");
        } else {
            return false;
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
        } else {
            return false;
        }
    }
    if (input == id_phone) {
        if (input.value.length == 0) {
            displayError(true, input, "empty");
        } else if (input.value.length !== 13) {
            displayError(true, input, "insufficient");
        } else if (input.value.indexOf("-") !== 3 && input.value.lastIndexOf("-") !== 8) {
            displayError(true, input, "invalid");
        } else {
            return false;
        }
    }
    if (input == id_email_vcode || input == id_phone_vcode) {
        if (input.value.length == 0) {
            displayError(true, input, "empty");
        } else if (input.value.length !== 6) {
            displayError(true, input, "insufficient");
        } else {
            return false;
        }
    }
    return true;
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
            subject = matchJosa(`'${findLabel(input)}'`, "을를", true)
            narrativeClause = "체크해주세요."
        } else if (errorType == "empty") {
            subject = matchJosa(findLabel(input), "을를", true)
            narrativeClause = "입력해주세요."
        } else if (errorType == "insufficient") {
            subject = matchJosa(findLabel(input), "이가", true)
            narrativeClause = "덜 입력된 것 같아요."
        } else if (errorType == "invalid") {
            subject = matchJosa(findLabel(input), "이가", true)
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

function codeError(id) {
    return eval(String(id.id) + "_error")
};

function displayButtonMsg(boolean, button, type, sentence) {
    var msg
    if (type == "descr") {
        msg = codeDescr(button);
    } else if (type == "error") {
        msg = codeError(button);
    }
    if (boolean == true) {
        msg.innerText = sentence;
        msg.hidden = false;
    } else if (boolean == false) {
        msg.innerText = null;
        msg.hidden = true;
    }
};

function pronounceLastDigit(number) {
    var lastDigit = Number(number.substr(-1));
    var pron;
    if (lastDigit == 0) {
        pron = "공";
    } else if (lastDigit == 1) {
        pron = "일";
    } else if (lastDigit == 2) {
        pron = "이";
    } else if (lastDigit == 3) {
        pron = "삼";
    } else if (lastDigit == 4) {
        pron = "사";
    } else if (lastDigit == 5) {
        pron = "오";
    } else if (lastDigit == 6) {
        pron = "육";
    } else if (lastDigit == 7) {
        pron = "칠";
    } else if (lastDigit == 8) {
        pron = "팔";
    } else if (lastDigit == 9) {
        pron = "구";
    }
    return pron;
};

function matchJosa(word, josaType, boolean) {
    var hasBatchim = (word.substr(-1).charCodeAt(0) - parseInt("ac00", 16)) % 28 > 0;
    var josa, result;
    if (josaType == "을를") {
        josa = hasBatchim ? "을" : "를";
    } else if (josaType == "이가") {
        josa = hasBatchim ? "이" : "가";
    } else if (josaType == "은는") {
        josa = hasBatchim ? "은" : "는";
    } else if (josaType == "와과") {
        josa = hasBatchim ? "과" : "와";
    } else if (josaType == "로으로") {
        josa = hasBatchim ? "으로" : "로";
    } else if (josaType == "라는이라는") {
        josa = hasBatchim ? "이라는" : "라는";
    }
    if (boolean) {
        result = word + josa;
    } else {
        result = josa;
    }
    return result;
};

function findLabel(input) {
    var labelStr
    labels.forEach((label) => {
        if (label.getAttribute("for") == String(input.id)) {
            labelStr = label.innerText
        }
    })
    return labelStr;
};

function makeAjaxCall(callType) {
    var defaultUrl = `${location.protocol}//${location.host}`
    if (callType == "create vcode") {
        data = {
            "agree": `${id_agree.checked}`,
            "student_id": `${id_student_id.value}`,
            "name": `${id_name.value}`,
            "email": `${id_email.value}`,
            "phone": `${id_phone.value}`
        }
        url = `${defaultUrl}/utility/create-vcode`
    } else if (callType == "confirm vcode") {
        data = {
            "agree": `${id_agree.checked}`,
            "student_id": `${id_student_id.value}`,
            "name": `${id_name.value}`,
            "email": `${id_email.value}`,
            "phone": `${id_phone.value}`,
            "email_vcode": `${id_email_vcode.value}`,
            "phone_vcode": `${id_phone_vcode.value}`
        }
        url = `${defaultUrl}/utility/confirm-vcode`
    }
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
            freezeForm(true, inputs);
        },
        success: function (object) {
            var status = object.status
            console.log(status);
            handleAjaxCallback(status);
        },
        error: function () {
            callType == "create vcode"
                ? console.log("failed to create vcode")
                : callType == "confirm vcode"
                    ? console.log("failed to confirm vcode")
                    : console.log("an unknown error occurred")
        },
    })
};

function handleAjaxCallback(status) {
    if (status == "vcode created and sent via mail, sms") {
        displayButtonMsg(true, id_create_vcode, "descr", "인증번호가 전송되었어요!");
        displayButtonMsg(false, id_create_vcode, "error");
        stepOnes.forEach((input) => {
            input.type == "checkbox" ? input.disabled = true : input.readOnly = true;
        })
        stepTwos.forEach((input) => {
            input.disabled = false;
        })
        id_confirm_vcode.disabled = false;
        initValidation(stepTwos, id_confirm_vcode);
    } else if (status == "vcode created and sent via mail" ||
        status == "vcode created and sent via sms" ||
        status == "vcode created but not sent") {
        freezeForm(false, inputs);
        displayButtonMsg(true, id_create_vcode, "error", "인증번호 전송에 실패했어요.");
        displayButtonMsg(false, id_create_vcode, "descr");
        id_create_vcode.disabled = false;
    } else if (status == "duplicate signup attempted") {
        freezeForm(false, inputs);
        displayButtonMsg(true, id_create_vcode, "error", `이미 ${id_student_id.value}${matchJosa(pronounceLastDigit(id_student_id.value), "라는이라는", false)} 학번으로 가입된 계정이 있어요!`);
        displayButtonMsg(false, id_create_vcode, "descr");
        id_create_vcode.disabled = false;
    } else if (status == "invalid vcode") {
        freezeForm(false, inputs);
        displayButtonMsg(true, id_confirm_vcode, "error", "인증번호가 잘못 입력된 것 같아요.");
        id_confirm_vcode.disabled = false;
    } else if (status == "vcode confirmed") {
        displayButtonMsg(false, id_confirm_vcode, "error");
        inputs = document.querySelectorAll("input");
        inputs.forEach((input) => {
            input.disabled = false;
            input.readOnly = true;
        })
        id_confirm_vcode.disabled = true;
        document.querySelector("form").submit();
    }
};

function isValid(input) {
    return input.type == "checkbox" ? input.checked : manageError(input) == false && codeDescr(input).hidden && codeError(input).hidden
};

function freezeForm(boolean, inputs) {
    inputs.forEach((input) => {
        if (input.type == "checkbox") {
            boolean ? input.disabled = true : input.disabled = false;
        } else if (input.disabled == false) {
            boolean ? input.readOnly = true : input.readOnly = false;
        }
    })
    buttons.forEach((button) => {
        button.disabled = true;
    })
};

function submitForm(button) {
    inputs.forEach((input) => {
        input.addEventListener("keypress", (event) => {
            if (event.key == "Enter") {
                button.click();
            }
        })
    })
};

function initValidation(array, button) {
    inputs.length = 0;
    inputs.push(...array);
    validation();
    submitForm(button);
};

validation();