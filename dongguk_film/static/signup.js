const rawValue = id_extra_data.value.split("#")
const pictureUrl = rawValue[0]
const providerName = rawValue[1]

id_picture.setAttribute("src", pictureUrl)
id_picture.setAttribute("alt", `${providerName} 계정 프로필 사진`)
id_provider_name.innerText = providerName