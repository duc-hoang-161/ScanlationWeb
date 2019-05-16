const functions = require("firebase-functions");
const fs = require("fs");
const express = require("express");
const session = require("express-session");
const app = express();
var firebase = require("firebase-admin");
const FirebaseStore = require("connect-session-firebase")(session);
const database = require("./database-connect");
const connect = database.getConnector();
var story = require("./modul/story.js");
const path = require("path");
const token = "a8b4d3053dca265a73779f11f81e547b";
const multer = require("multer");
const upload = multer({});
var cloudinary = require("cloudinary").v2;
var bodyParser = require("body-parser");
// var multiparty = require('multiparty');
// var util = require('util');
var Busboy = require("busboy");
inspect = require("util").inspect;

app.use(
  session({
    name: "__session",
    secret: "avengerinfinitywar",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use((request, response, next) => {
  response.setHeader("Cache-Control", "private");
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  next();
});
// app.use(bodyParser.json());
// app.use(multer());

exports.test = functions.region('asia-east2').https.onRequest(app);
app.get("/test", (request, response) => {
  // response.render('error', {error: 'This is error'});
  // response.end();
  database.getListChapter(
    res => {
      console.log(res);
      // for (i = 0; i < res.length; i++) {
      //     response.write(res[i].title)
      // }
      res.forEach(element => {
        response.write(element.title);
      });
      response.end();
    },
    err => {
      console.log(err);
    },
    1
  );
});

exports.home = functions.https.onRequest(app);
app.get("/", (request, response) => {
  ResponseHtml(response, "/index.html");
});
app.post("/", (request, response) => {
  response.write("hello post");
  response.end();
});

exports.download = functions.https.onRequest(app);
app.get("/download", (request, response) => {
  ResponseHtml(response, "/download.html");
});

exports.downloadViewStory = functions.https.onRequest(app);
app.get("/download/:idStory", (request, response) => {
  ResponseHtml(response, "/index.html");
});

exports.ViewChap = functions.https.onRequest(app);
exports.downloadViewChap = functions.https.onRequest(app);
var renderChap = (request, response) => {
  var resUrl = request.url.split("/");
  if (resUrl[3].includes("?")) {
    resUrl[3] = resUrl[3].split("?")[0];
  }
  var idStory = resUrl[2];
  var idChapter = resUrl[3];
  if (isNumeric(idStory) && isNumeric(idChapter)) {
    idStory = parseInt(resUrl[2]);
    idChapter = parseInt(resUrl[3]);
    var links = [];
    if (idStory === 1) {
      switch (idChapter) {
        case 42:
          links = [
            "https://cdn.discordapp.com/attachments/482900942812086272/482901000651538432/tate042_001.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901013674590228/tate042_002.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901027545284623/tate042_003.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901039637463060/tate042_004.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901054779031552/tate042_005.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901072680189993/tate042_006.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901088777797642/tate042_007.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901107023282176/tate042_008.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901131719213056/tate042_009.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901137876582402/tate042_010.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901151101091840/tate042_011.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901199918465034/tate042_012.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901208965578753/tate042_013.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901217429946378/tate042_014.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901238279831552/tate042_015.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901249084358706/tate042_016.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901260425756683/tate042_017.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901269485322250/tate042_018.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901278838751276/tate042_019.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901284102602752/tate042_020.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901295716368384/tate042_021.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901303081828362/tate042_022.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901341224566785/tate042_023.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901356319997952/tate042_024.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901369473335299/tate042_025.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901378067333121/tate042_026.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901391443099672/tate042_027.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901405380771861/tate042_028.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901420782387201/tate042_029.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901432060739594/tate042_030.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901447629996053/tate042_031.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901463450779649/tate042_032.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901478873497630/tate042_033.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901515053563904/tate042_034.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901529586565129/tate042_035.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901576844050432/tate042_036.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901591389765632/tate042_037.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901600718028820/tate042_038.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901613842006018/tate042_039.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901625287999488/tate042_040.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901632997130260/tate042_041.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901642652549141/tate042_042.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/482901654824550411/tate042_043.png"
          ];
          response.render("viewChap", {
            title: "Sự trỗi dậy của Khiên Hiệp Sĩ - Chương 42: Thùng nổ Rucol",
            linksChap: links
          });
          response.end();
          break;
        case 43:
          links = [
            "https://cdn.discordapp.com/attachments/482900942812086272/483483581445046283/SMTate043_001.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483598763196436/SMTate043_002.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483615393480714/SMTate043_003.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483626160259082/SMTate043_004.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483641050169345/SMTate043_005.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483657156165632/SMTate043_006.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483673807683594/SMTate043_007.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483684242980885/SMTate043_008.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483699153862656/SMTate043_009.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483727834644480/SMTate043_010.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483772952641557/SMTate043_011.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483891219431427/SMTate043_012.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483908806148096/SMTate043_013.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483928619909140/SMTate043_014.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483943853621259/SMTate043_015.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483483958722428928/SMTate043_016.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484084191100939/SMTate043_017.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484103224721426/SMTate043_018.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484117917499392/SMTate043_019.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484132958011402/SMTate043_020.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484148611416064/SMTate043_021.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484161701576704/SMTate043_022.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484176968974364/SMTate043_023.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484192412401665/SMTate043_024.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484209307189268/SMTate043_025.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484224058556427/SMTate043_026.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484239338143744/SMTate043_027.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484255951912960/SMTate043_028.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484272196583425/SMTate043_029.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484294912933899/SMTate043_030.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484310930718721/SMTate043_031.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/483484327645151253/SMTate043_032.png"
          ];
          response.render("viewChap", {
            title:
              "Sự trỗi dậy của Khiên Hiệp Sĩ - Chương 43: Cô nàng không triển vọng",
            linksChap: links
          });
          response.end();
          break;
        case 44:
          links = [
            "https://cdn.discordapp.com/attachments/482900942812086272/500958475862409217/SMTate044_001.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958482753781760/SMTate044_002.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958489078792195/SMTate044_003.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958494728650773/SMTate044_004.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958500969644043/SMTate044_005.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958507953160203/SMTate044_006.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958514639011840/SMTate044_007.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958519835623424/SMTate044_008.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958527343558675/SMTate044_009.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958531978002433/SMTate044_010.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958539158781962/SMTate044_011.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958545085202447/SMTate044_012.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958552697864192/SMTate044_013.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958557903257612/SMTate044_014.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958562890022912/SMTate044_015.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958569806561291/SMTate044_016.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958577708498944/SMTate044_017.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958583958274059/SMTate044_018.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958589490298880/SMTate044_019.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958594959933450/SMTate044_020.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958603038031873/SMTate044_021.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958610084331549/SMTate044_022.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958616187305985/SMTate044_023.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958623866945536/SMTate044_024.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958631005650954/SMTate044_025.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958637657948170/SMTate044_026.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958644184154112/SMTate044_027.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958650018431007/SMTate044_028.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958658260238346/SMTate044_029.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958664136458261/SMTate044_030.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958670293696512/SMTate044_031.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958676593410051/SMTate044_032.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958683593834506/SMTate044_033.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958689763524618/SMTate044_034.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958696294187009/SMTate044_035.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958700115066897/SMTate044_036.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958706331025422/SMTate044_037.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958712379473939/SMTate044_038.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958718259757057/SMTate044_039.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958725171838977/SMTate044_040.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/500958730008002569/SMTate044_041.png"
          ];
          response.render("viewChap", {
            title:
              "Sự trỗi dậy của Khiên Hiệp Sĩ - Chương 44: Oan sai tái diễn",
            linksChap: links
          });
          response.end();
          break;
        case 45:
          links = [
            "https://cdn.discordapp.com/attachments/482900942812086272/506760809985081344/SMTate045_001.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760817161797632/SMTate045_002.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760828045754378/SMTate045_003.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760837374148608/SMTate045_004.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760849084383242/SMTate045_005.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760856919474176/SMTate045_006.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760863781224458/SMTate045_007.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760874804117505/SMTate045_008.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760879958654997/SMTate045_009.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760888460771329/SMTate045_010.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760897835040768/SMTate045_011.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760904411709441/SMTate045_012.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760911923445780/SMTate045_013.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760917707522048/SMTate045_014.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760924259024899/SMTate045_015.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760931045277696/SMTate045_016.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760938691493888/SMTate045_017.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760945272356864/SMTate045_018.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760952692080640/SMTate045_019.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760959348703236/SMTate045_020.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760965883428866/SMTate045_021.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760971558060032/SMTate045_022.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760978738970624/SMTate045_023.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760985592201216/SMTate045_024.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760992248692736/SMTate045_025.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506760998569508864/SMTate045_026.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506761005057966091/SMTate045_027.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506761010883854336/SMTate045_028.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506761014889545728/SMTate045_029.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/506761021604757506/SMTate045_030.png"
          ];
          response.render("viewChap", {
            title: "Sự trỗi dậy của Khiên Hiệp Sĩ - Chương 45: Đồng đội mới",
            linksChap: links
          });
          response.end();
          break;
        case 46:
          links = [
            "https://cdn.discordapp.com/attachments/482900942812086272/531060535412654081/SMTate046_001.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060544342327316/SMTate046_002.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060555574935565/SMTate046_003.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060565163114497/SMTate046_004.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060569500024832/SMTate046_005.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060576437403658/SMTate046_006.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060580186980352/SMTate046_007.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060586918707210/SMTate046_008.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060594758123530/SMTate046_009.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060600403525639/SMTate046_010.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060609266089985/SMTate046_011.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060617646440458/SMTate046_012.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060624869031937/SMTate046_013.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060628446511115/SMTate046_014.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060635891400714/SMTate046_015.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060644003315712/SMTate046_016.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060650613538816/SMTate046_017.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060657286676481/SMTate046_018.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060665687736321/SMTate046_019.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060671157108746/SMTate046_020.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060677926846485/SMTate046_021.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060682024812554/SMTate046_022.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060691147423755/SMTate046_023.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060695534534677/SMTate046_024.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060702069129216/SMTate046_025.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060706938716161/SMTate046_026.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060714161307659/SMTate046_027.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060721128308736/SMTate046_028.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060728191516724/SMTate046_029.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060734357143562/SMTate046_030.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060742326190080/SMTate046_031.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060749196591115/SMTate046_032.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060752841179145/SMTate046_033.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060760470749184/SMTate046_034.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060768867614730/SMTate046_035.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060772634230787/SMTate046_036.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060780150292500/SMTate046_037.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060787255574538/SMTate046_038.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060795728068618/SMTate046_039.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060802032107520/SMTate046_040.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060808633810945/SMTate046_041.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060815097364480/SMTate046_042.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/531060823599218688/SMTate046_043.png"
          ];
          response.render("viewChap", {
            title:
              "Sự trỗi dậy của Khiên Hiệp Sĩ - Chương 46: Cố vấn chiến đấu",
            linksChap: links
          });
          response.end();
          break;
        case 47:
          links = [
            "https://cdn.discordapp.com/attachments/482900942812086272/535097026782953473/SMTate047_001.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097034928160778/SMTate047_002.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097043912359956/SMTate047_003.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097057937981480/SMTate047_004.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097072928686090/SMTate047_005.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097107183566878/SMTate047_006.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097113177227274/SMTate047_007.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097123113533440/SMTate047_008.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097132118573070/SMTate047_009.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097143271096330/SMTate047_010.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097151978602510/SMTate047_011.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097161449472010/SMTate047_012.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097171612008448/SMTate047_013.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097177559531530/SMTate047_014.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097188972494888/SMTate047_015.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097201534304277/SMTate047_016.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097212015738901/SMTate047_017.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097223298547713/SMTate047_018.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097233918394380/SMTate047_019.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097242907050005/SMTate047_020.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097251345858593/SMTate047_021.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097261953253401/SMTate047_022.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097272174772225/SMTate047_023.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097281842642944/SMTate047_024.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097291980275742/SMTate047_025.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097302197600276/SMTate047_026.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097312528302113/SMTate047_027.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097327254372352/SMTate047_028.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097339271053332/SMTate047_029.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097345457651713/SMTate047_030.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097354076815370/SMTate047_031.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097361324834856/SMTate047_032.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097373345710080/SMTate047_033.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097380303798272/SMTate047_034.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097387694161920/SMTate047_035.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097400168153098/SMTate047_036.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097409420656640/SMTate047_037.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097417117204480/SMTate047_038.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097428903329792/SMTate047_039.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097438315479041/SMTate047_040.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097446703955968/SMTate047_041.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097457839702016/SMTate047_042.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097468241838080/SMTate047_043.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097477305597952/SMTate047_044.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097490396020747/SMTate047_045.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097499254521867/SMTate047_046.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097510268502028/SMTate047_047.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097519395569674/SMTate047_048.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/535097528882954240/SMTate047_049.png"
          ];
          response.render("viewChap", {
            title:
              "Sự trỗi dậy của Khiên Hiệp Sĩ - Chương 47: Biến ảo vô song lưu",
            linksChap: links
          });
          response.end();
          break;
        case 48:
          links = [
            "https://cdn.discordapp.com/attachments/482900942812086272/550633991225475072/SMTate048_001.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550633999966535690/SMTate048_002.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634012889317376/SMTate048_003.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634024905998336/SMTate048_004.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634047970213888/SMTate048_005.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634063099068417/SMTate048_006.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634078295031810/SMTate048_007.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634090215374848/SMTate048_008.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634104279007242/SMTate048_009.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634118132531211/SMTate048_010.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634131609092122/SMTate048_011.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634148663132160/SMTate048_012.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634155528945685/SMTate048_013.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634162021990400/SMTate048_014.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634182699778048/SMTate048_015.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634210596225024/SMTate048_016.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634221299826719/SMTate048_017.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634243978690570/SMTate048_018.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634250752229426/SMTate048_019.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634257111056404/SMTate048_020.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634260365836289/SMTate048_021.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634268582215690/SMTate048_022.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634274576138241/SMTate048_023.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634281639084033/SMTate048_024.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634288584851456/SMTate048_025.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634294805004288/SMTate048_026.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634299724922900/SMTate048_027.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634306750382080/SMTate048_028.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634315675860993/SMTate048_029.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634325088010256/SMTate048_030.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634331274739723/SMTate048_031.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634336886456321/SMTate048_032.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634340158144513/SMTate048_033.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634347456233492/SMTate048_034.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634353672192000/SMTate048_035.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634360894652427/SMTate048_036.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634369568473098/SMTate048_037.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634378321985536/SMTate048_038.png",
            "https://cdn.discordapp.com/attachments/482900942812086272/550634389986476032/SMTate048_039.png"
          ];
          response.render("viewChap", {
            title: "Sự trỗi dậy của Khiên Hiệp Sĩ - Chương 48: Ma thú",
            linksChap: links
          });
          response.end();
          break;
        default:
          response.redirect("/404.html");
          response.end();
          break;
      }
    }
  } else {
    response.redirect("/404.html");
    response.end();
  }
};
app.get("/download/*/*", renderChap);
app.get("/read/*/*", renderChap);

function isNumeric(num) {
  return !isNaN(num);
}

exports.donate = functions.https.onRequest(app);
app.get("/donate", (request, response) => {
  response.redirect("/404.html");
  response.end();
});

exports.shield = functions.https.onRequest(app);
app.get("/shield", (request, response) => {
  if (request.session.userlog) {
    response.render("mana");
    response.end();
  } else {
    ResponseHtml(response, "/login.html");
    response.end();
  }
});
app.post("/shield", (request, response) => {
  if (request.body.username !== null && request.body.password !== null) {
    var username = request.body.username;
    var password = request.body.password;
    if (username.trim() === "nickfury" && password.trim() === "1") {
      request.session.userlog = "nickfury";
      request.session.save();
      // response.setHeader('Cache-Control', 'private');
      // response.write("success login " + request.session.user + ' | ' + request.sessionID);
      response.redirect("/shield");
      response.end();
    } else {
      ResponseHtml(response, "/login.html");
    }
  }
});

exports.manastory = functions.https.onRequest(app);
app.get("/manastory", (request, response) => {
  if (request.session.userlog) {
    response.write(request.session.userlog);
  } else {
    request.session.userlog = "nickfury2";
    response.write("not login");
  }
  response.end();
});

exports.logout = functions.https.onRequest(app);
app.get("/snap", (request, response) => {
  if (request.session.userlog) {
    request.session.destroy();
  }
  response.redirect("/shield");
});

exports.listChapter = functions.https.onRequest(app);
app.get("/listc", (request, response) => {
  validAccess(request, response, () => {
    if (request.query.c) {
      if (request.query.a) {
        if (request.query.a === "del") {
          deleteChapter(request, response);
        }
      } else {
        getManaChapter(response, request.query.c);
      }
    } else {
      database.getAllChapter(
        res => {
          if (res) {
            response.render("manachapter", { result: res, request: request });
            response.end();
          } else {
            response.render("manachapter", { error: "undefined error" });
            response.end();
          }
        },
        err => {
          response.render("manachapter", { error: err });
          response.end();
        }
      );
    }
  });
});

exports.addChapter = functions.https.onRequest(app);
app.get("/addc", (request, response) => {
  validAccess(request, response, () => {
    response.end();
  });
});

exports.listStory = functions.https.onRequest(app);
app.get("/lists", (request, response) => {
  validAccess(request, response, () => {
    if (request.query.i) {
      database.getStory(
        res => {},
        err => {
          console.log(err);
        },
        request.query.i
      );
      database.getListChapter(
        res => {},
        err => {
          console.log(err);
        },
        request.query.i
      );
    } else {
      database.getAllStory(
        res => {
          response.render("");
          response.end();
        },
        err => {
          console.log(err);
        }
      );
    }
  });
});

exports.addStory = functions.https.onRequest(app);
app.get("/adds", (request, response) => {
  validAccess(request, response, () => {
    response.end();
  });
});

function ResponseHtml(response, p) {
  data = fs.readFileSync(path.join(__dirname, "/views", p));
  response.write(data);
  response.end();
}

function validAccess(request, response, accept) {
  if (request.query.t === token) {
    accept();
  } else {
    response.redirect("/shield");
  }
}

function deleteChapter(request, response) {
  database.delChapter(
    res => {
      var url = request.url.substr(0, request.url.indexOf("&a="));
      response.redirect(url);
      response.end();
    },
    err => {
      errLog(response, err);
    },
    request.query.c
  );
}

function errLog(response, err) {
  response.render("error", {
    error: err
  });
  response.end();
}

function getManaChapter(response, idChapter) {
  database.getChapter(
    res => {
      console.log(res);
      if (res && res.length !== 0) {
        response.write(res[0].title);
        response.end();
      } else {
        errLog(response, "Chapter not found!");
      }
    },
    err => {
      errLog(response, err);
    },
    idChapter
  );
}

// app.use(bodyParser.urlencoded({extended:true,limit: '20MB',parameterLimit:10000}));
// app.use(bodyParser.json());
exports.uploadPhoto = functions.https.onRequest(app);

app.post("/upload", (req, res) => {
  const Busboy = require("busboy");
  const busboy = new Busboy({ headers: req.headers });
  let fields = [];
  busboy.on("file", (fieldname, file, filename) => {
    file.on("readable", () => {
      var s = file.read();
      if (s) {
        var string = s.toString("base64");
        cloudinary.uploader.upload(
          "data:image/png;base64," + string,
          (error, result) => {
            if (result) res.json(result);
            if (error) res.json(error);
            res.end();
          }
        );
      }
    });
  });

  busboy.on("finish", () => {});
  busboy.end(req.rawBody);
});
