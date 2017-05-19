//########################################
//# This page contains score data, timing data and the media file path. Save it as a text file in
//# the same folder as abcweb.html. Abcweb preloads score and media when it is opened with the
//# file name as parameter in the url, for example: http://your.domain.org/abcweb.html?file_name
//# Also works locally with file:///path/to/abcweb.html?file_name
//# **** You have to correct the path to the media file below! (media_file="...";) ****
//########################################
//#
media_file = "tracks/01_sheetWithPause.ogg";
offset_js = 0.00;
opt = {"jump":0,"no_menu":0,"repufld":0,"noplyr":0,"nocsr":0,"media_height":"","btns":1,"ipadr":"","mstr":0,"autscl":true,"ctrmed":0,"ctrnot":0,"lncsr":0,"opacity":0.2,"synbox":0,"speed":1,"top_margin":0,"yubvid":"","nomed":0,"delay":0,"repskip":0,"spdctl":0,"metro":0};
lpRec = {"loopBtn":1,"loopStart":0,"loopEnd":24};
times_arr = [[0.00,3.00,6.00,9.00,12.00,15.00,18.00,21.00,24.00]];
abc_arr = ["X:1",
"T:test3sounds",
"%%scale 0.83",
"%%pagewidth 21.01cm",
"%%leftmargin 1.00cm",
"%%rightmargin 1.00cm",
"L:1/8",
"Q:1/4=80.00",
"M:4/4",
"I:linebreak $",
"K:C",
"V:1 perc nm=\"Batteria\" snm=\"Batt.\"",
"I:percmap F F 35 normal",
"I:percmap ^a a 49 x",
"I:percmap ^c c 37 x",
"I:percmap ^g g 42 x",
"I:percmap c c 38 normal",
"V:1",
" ^c2 ^c2 ^c2 ^c2 | [F^g] z z ^g z [F^g][c^g] z | ^g^g z ^g ^g[c^g]^g z | cc z c ccFF | %4",
" [F^g]2 z2 [c^g]2 z2 | [F^g]2 [F^g]2 [c^g]2 z2 |$ [Fc][Fc] z [Fc^g] ccc z | %7",
" [F^a]2 z2 [F^g]2 z [c^g] |] %8",
""];
abc_enc = [];
