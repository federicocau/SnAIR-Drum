//########################################
//# This page contains score data, timing data and the media file path. Save it as a text file in
//# the same folder as abcweb.html. Abcweb preloads score and media when it is opened with the
//# file name as parameter in the url, for example: http://your.domain.org/abcweb.html?file_name
//# Also works locally with file:///path/to/abcweb.html?file_name
//# **** You have to correct the path to the media file below! (media_file="...";) ****
//########################################
//#
media_file = "tracks/drumtest.ogg";
offset_js = 0.00;
opt = {"jump":0,"no_menu":0,"repufld":0,"noplyr":false,"nocsr":0,"media_height":"","btns":1,"ipadr":"","mstr":0,"autscl":0,"ctrmed":true,"ctrnot":true,"lncsr":0,"opacity":0.2,"synbox":0,"speed":1,"top_margin":0,"yubvid":"","nomed":0,"delay":0,"repskip":0,"spdctl":false,"lopctl":false,"metro":0};
lpRec = {"loopBtn":1,"loopStart":0,"loopEnd":48};
times_arr = [[0.00,4.00,8.00,12.00,16.00,20.00,24.00,28.00,32.00,36.00],
[36.00,40.00,44.00,48.00]];
abc_arr = ["X:1",
"T:Test ritmo tamburo",
"%%scale 0.83",
"%%pagewidth 21.01cm",
"%%leftmargin 1.00cm",
"%%rightmargin 1.00cm",
"%%score ( 1 2 )",
"L:1/4",
"Q:1/4=60",
"M:4/4",
"I:linebreak $",
"K:C",
"V:1 perc nm=\"Batteria\" snm=\"Batt.\"",
"I:percmap c c 40 normal",
"V:2 perc ",
"I:percmap F F 36 normal",
"V:1",
" c c c c | c c c c | c c c c | c c c c | c c c c | c c c c | c c c c | c c c c |$ c c c c | %9",
" c c c c | c c c c | c c c c |] %12",
"V:2",
" F z z2 | F z z2 | F z z2 | F z z2 | F z z2 | F z z2 | F z z2 | F z z2 |$ F z z2 | F z z2 | %10",
" F z z2 | F z z2 |] %12",
""];
abc_enc = [];
