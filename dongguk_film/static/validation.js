id_phone.addEventListener("keyup", (e) => {
    let foo = id_phone.value.replace(/[^0-9]/g, "").replace(/(^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-");
    id_phone.value = foo;
});

function onlyHangul(e) {
    var regKor = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
    var inputKeyChar = String.fromCharCode(e.keyCode);
    if (!regKor.test(inputKeyChar)) {
        e.returnValue = false;
    }
}

function onlyNumber(e) {
    var regInt = /[^0-9]/gi;
    var inputKeyChar = String.fromCharCode(e.keyCode);
    if (regInt.test(inputKeyChar)) {
        e.returnValue = false;
    }
}