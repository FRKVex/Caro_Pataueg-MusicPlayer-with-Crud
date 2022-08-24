// .\chrome.exe --disable-web-security --user-data-dir="[C:\Users\vhenp\Desktop\MainProj]"
// cd "\Program Files (x86)" Google\Chrome\Application  

var htmlString = ""
var songHtmlString = ""
let audios = ["music1", "music2", "music3"];
let covers = ["img1","img2","img3"];
let dir1 = "audio/";
let ext1 = ".mp3";
let dir2 = "img/";
let ext2 = ".jpg";
let range = document.querySelector("#range");
let play_img = document.querySelector("#play_img")
let total_time = 0;
let currentTime = 0;
let isPlaying = false;
let currentSong = 0