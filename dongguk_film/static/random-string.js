var welcome = new Array("어서오세요!", "오! 오셨군요?", "반가워요!", "오늘도 아자아자!", "어서와요!", "환영해요!", "기다렸어요~", "왜 이제야 왔어요~", "잘 오셨어요!", "보고 싶었어요!");
var emoji = new Array("o(>ω<)o", "o( ❛ᴗ❛ )o", "(๑˃ᴗ˂)ﻭ", "(´･ᴗ･ ` )", "(„• ֊ •„)", "(.❛ ᴗ ❛.)", "(≧◡≦)", "(o´∀`o)", "(*≧ω≦*)", "＼(≧▽≦)／", "ヽ(o＾▽＾o)ノ", "٩(◕‿◕｡)۶", "ヽ(・∀・)ﾉ", "(´｡• ω •｡`)", "ヽ(*・ω・)ﾉ", "(o´▽`o)", "(*´▽`*)", "(o˘◡˘o)");
function randomItem(e) {
    return e[Math.floor(Math.random() * e.length)];
}
if (document.querySelector("#welcome")) {
    document.querySelector("#welcome").innerText = randomItem(welcome);
}
if (document.querySelector("#emoji")) {
    document.querySelector("#emoji").innerText = randomItem(emoji);
}