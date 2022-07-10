const rawValue = id_social_account.value.split("#")
const profilePicUrl = rawValue[1]
const providerName = rawValue[0]

id_profile_pic.setAttribute("src", profilePicUrl)
id_profile_pic.setAttribute("alt", `${providerName} 계정 프로필 사진`)
id_provider_name.innerText = providerName