const rawValue = id_extra_data.value.split("#")
const pictureUrl = rawValue[0]
const providerName = rawValue[1]
const providerNames = document.querySelectorAll(".provider-name")

id_picture.setAttribute("src", pictureUrl)
id_picture.setAttribute("alt", `${providerName} 계정 프로필 사진`)
providerNames.forEach((blank) => {
    blank.innerText = providerName
});

id_cancel.addEventListener("click", () => {
    id_cancel_modal.setAttribute("x-data", "{ open: true }")
});
id_cancel.addEventListener("keydown", () => {
    id_cancel_modal.setAttribute("x-data", "{ open: true }")
});