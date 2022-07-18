const extraData = id_extra_data.value.split("#")
const pictureUrl = extraData[0]
const providerName = extraData[1]
const providerNames = document.querySelectorAll(".provider-name")

id_picture.setAttribute("src", pictureUrl)
id_picture.setAttribute("alt", `${providerName} 계정 프로필 사진`)
providerNames.forEach((blank) => {
    blank.innerText = providerName
});