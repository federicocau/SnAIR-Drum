//########################################
//# This page contains score data, timing data and the media file path. Save it as a text file in
//# the same folder as abcweb.html. Abcweb preloads score and media when it is opened with the
//# file name as parameter in the url, for example: http://your.domain.org/abcweb.html?file_name
//# Also works locally with file:///path/to/abcweb.html?file_name
//# **** You have to correct the path to the media file below! (media_file="...";) ****
//########################################
//#
media_file = "tracks/test.ogg";
offset_js = 0.00;
opt = {"jump":0,"no_menu":0,"repufld":0,"noplyr":0,"nocsr":0,"media_height":"","btns":1,"ipadr":"","mstr":0,"autscl":true,"ctrmed":0,"ctrnot":0,"lncsr":0,"opacity":0.2,"synbox":0,"speed":1,"top_margin":0,"yubvid":"","nomed":0,"delay":0,"repskip":0,"spdctl":0,"metro":0};
lpRec = {"loopBtn":1,"loopStart":0,"loopEnd":179.19999999999987};
times_arr = [[0.00,3.20,6.40,9.60,12.80,16.00,19.20,22.40,25.60,28.80],
[28.80,32.00,35.20,38.40,41.60,44.80,48.00,51.20,54.40,57.60,60.80],
[60.80,64.00,67.20,70.40,73.60,76.80,80.00,83.20,86.40,89.60,92.80],
[92.80,96.00,99.20,102.40,105.60,108.80,112.00,115.20,118.40,121.60,124.80],
[124.80,128.00,131.20,134.40,137.60,140.80,144.00,147.20,150.40,153.60,156.80],
[156.80,160.00,163.20,166.40,169.60,172.80,176.00,179.20]];
abc_arr = ["X:1",
"T:Esercizi Batteria ",
"Z:Federico Cau M. �",
"%%scale 0.83",
"%%pagewidth 21.00cm",
"%%leftmargin 1.00cm",
"%%rightmargin 1.00cm",
"L:1/8",
"Q:1/4=75",
"M:4/4",
"I:linebreak $",
"K:C",
"V:1 perc nm=\"Percussioni\"",
"I:percmap F F 35 normal",
"I:percmap ^g g 46 x",
"I:percmap _g g 51 diamond",
"I:percmap c c 40 normal",
"I:percmap d d 47 normal",
"I:percmap e e 48 normal",
"I:percmap f f 50 normal",
"V:1",
"|: [F^g]^g[c^g]^g [F^g]^g[c^g]^g | ccff eedd | [F_g]_g[c_g]_g [F_g]_g[c_g]_g | cccc cccc ::$ %4",
"w: 1 * * * * * * *||||",
" [F^g]^g[c^g]^g [F^g][F^g][c^g]^g | ccff ccee | [F_g]_g[c_g]_g [F_g][F_g][c_g]_g | cccc _gccc ::$ %8",
"w: 2 * * * * * * *||||",
" [F^g]^g[c^g][F^g] [F^g]^g[c^g]^g | ccff eedd | [F_g]_g[c_g][F_g] [F_g]_g[c_g]_g | cccc ^gccc ::$ %12",
"w: 3 * * * * * * *||||",
" [F^g]^g[c^g][c^g] [F^g]^g[c^g]^g | ccff ccee | [F_g]_g[c_g][c_g] [F_g]_g[c_g]_g | cccc cccc ::$ %16",
"w: 4 * * * * * * *||||",
" [F^g]^g[c^g]^g [c^g][F^g][c^g]^g | ccdd eeff | [F_g]_g[c_g]_g [c_g][F_g][c_g]_g | ccee ffdd ::$ %20",
"w: 5 * * * * * * *||||",
" [F^g]^g[c^g][c^g] [c^g][F^g][c^g]^g | cccc ccee | [F_g]_g[c_g][c_g] [c_g][F_g][c_g]_g | %23",
"w: 6 * * * * * * *|||",
" ccFF cccc ::$ [F^g][F^g][c^g]^g [F^g][F^g][c^g]^g | cccc ccdd | %26",
"w: |7 * * * * * * *||",
" [F_g][F_g][c_g]_g [F_g][F_g][c_g]_g | cccc ^gccc :| %28",
"w: ||",
""];
abc_enc = [];
