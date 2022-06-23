var emoji = new Array("o(>ω<)o", "o( ❛ᴗ❛ )o", "(๑˃ᴗ˂)ﻭ", "(´･ᴗ･ ` )", "(„• ֊ •„)", "(.❛ ᴗ ❛.)", "(≧◡≦)", "(o´∀`o)", "(*≧ω≦*)", "＼(≧▽≦)／", "ヽ(o＾▽＾o)ノ", "٩(◕‿◕｡)۶", "ヽ(・∀・)ﾉ", "(´｡• ω •｡`)", "ヽ(*・ω・)ﾉ", "(o´▽`o)", "(*´▽`*)", "(o˘◡˘o)");
function randomItem(e) {
    return e[Math.floor(Math.random() * e.length)];
}
document.querySelector("#emoji").innerText = randomItem(emoji);