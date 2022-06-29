id_student_id.addEventListener("keyup", () => {
    let foo = id_student_id.value.replace(/[^0-9]/g, "");
    id_student_id.value = foo;
});

id_last_name.addEventListener("keyup", () => {
    let foo = id_last_name.value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    id_last_name.value = foo;
});

id_first_name.addEventListener("keyup", () => {
    let foo = id_first_name.value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    id_first_name.value = foo;
});

id_phone.addEventListener("keyup", () => {
    let foo = id_phone.value.replace(/[^0-9]/g, "").replace(/(^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-");
    id_phone.value = foo;
});


// the following do not support mobile

function onlyHangul(e) {
    var regKor = /[^ㄱ-ㅎㅏ-ㅣ가-힣]/g;
    var inputKeyChar = String.fromCharCode(e.keyCode);
    if (regKor.test(inputKeyChar)) {
        e.returnValue = false;
    }
}

function onlyNumber(e) {
    var regInt = /[^0-9]/g;
    var inputKeyChar = String.fromCharCode(e.keyCode);
    if (regInt.test(inputKeyChar)) {
        e.returnValue = false;
    }
}