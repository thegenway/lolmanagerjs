// 需要自行进入游戏，并且关闭所有广告弹窗/签到弹窗/。进入主页面（有“开始比赛”“签约”“俱乐部”这些按钮的页面）
// 在游戏主页面就可运行此脚本了
// 可以自行选择需要执行的任务，需要执行的就写【true】，不需要执行的就写【false】
// 会自动跳过已经完成的或需要花钱的任务
// 因为需要截图分析页面，开始运行脚本时会有弹窗请求截图权限，请允许
var todoFlag = {
    shangcheng: true, //去商城里买两个免费的东西
    lianmeng: true, //联盟里点赞和领工资
    xuanshou: true, //选手的符文升级 和 选手升级
    qianyuexuanshou: true, //免费签约一个选手
    zhaohuanyingxiong: true, //召唤一个英雄（会花费一个英雄召唤币）
    julebu_shijian: true, //俱乐部 - 完成所有事件
    julebu_shouyi: true, //俱乐部 - 领取收益
    julebu_yingxiongfenxi: true, //俱乐部 - 英雄分析
    julebu_zhanduidalou: true, //俱乐部 - 战队大楼
    julebu_huodongzhongxin: true, //俱乐部 - 活动中心
    julebu_zhanduisushe: true, //俱乐部 - 战队宿舍
    julebu_zhanlanguan: true, //俱乐部 - 展览馆
    julebu_xuanshouzhaopin: true, //俱乐部 - 选手招聘
    youqingdian: true, //赠送友情点 和 接受友情点
    tehui: true, //特惠里领取免费礼包
    lingqutili: true, //去活动里领取体力
    mianfeitili: true, //在比赛页面里领取每天的免费体力
    bisai_guanjuntiaozhan: true, //扫荡冠军挑战
    bisai_saiquzhengba: true, //自动连战赛区争霸一次
    bisai_tuanzhanjixun: true, //自动连战团战集训一次
    bisai_zhiyeliansai: true, //职业联赛里的快速扫荡，直到用尽扫荡次数（你要扫荡哪个选手的看下方配置）
    bisai_dianfengjingjichang: true, //巅峰竞技场
}
// 联赛的快速扫荡，你选哪一路，总共有6列，填从0~5。（【全部】就写0，【上路】就写1，【打野】就写2，【中路】就写3，【下路】就写4，【辅助】就写5，如果写了其他值那就按0算）
var saodangRow1Index = 4;
// 联赛的快速扫荡，选完分路后，选第几个人物，同上填0~5。
var saodangRow2Index = 3;

// ==============================================================================================================================================================
// ==============================================================================================================================================================
// ==============================================================================================================================================================
// ==============================================================================================================================================================

if(todoFlag.bisai_zhiyeliansai) {
    if(!(saodangRow1Index && saodangRow1Index <= 5 && saodangRow1Index >= 0)) {
        alert("saodangRow1Index值配置有误");
        exit();
    }
    if(!(saodangRow1Index && saodangRow2Index <= 5 && saodangRow2Index >= 0)) {
        alert("saodangRow2Index值配置有误");
        exit();
    }
}

auto();
if(!requestScreenCapture(true)){
    alert("请求截图权限失败,请重新启动脚本");
    exit();
}


setScreenMetrics(1080, 1920);
console.show()
sleep(300)
console.setPosition(100, 100);


// ========================================================================================================================

function ocrCaptureScreen(x1, y1, x2, y2) {
    var img = captureScreen();
    var clip = images.clip(img, x1, y1, x2 - x1, y2 - y1);
    let ocrRes = gmlkit.ocr(clip, "zh");
    console.log("ocr识别结果：", ocrRes.text)
    return ocrRes.text || "";
}

function checkColor(color, x, y) {
    var img = captureScreen();
    return images.detectsColor(img, color, x, y);
}

function closeBlankToCloseDialog() {
    sleep(1200)
    click(1553, 890);
    sleep(1200);
}

//是否是游戏主页面
function isMainPage() {
    var img = captureScreen();
    return "开始比赛" === ocrCaptureScreen(1120, 660, 1492, 757);
}

//是否是商城页面
function isMallPage() {
    var img = captureScreen();
    return "商城-道具" === ocrCaptureScreen(341, 28, 555, 79);
}

//是否是联盟页面
function isLeaguePage() {
    var img = captureScreen();
    var clip = images.clip(img, 341, 28, 555 - 341, 79 - 28);
    let ocrRes = gmlkit.ocr(clip, "zh");
    console.log("ocr识别结果：", ocrRes.text)
    return "联盟信息" === ocrRes.text;
}

//转向主页面
function toMainPage() {
    console.setPosition(100, 100)
    while(!isMainPage()) {
        toBack()
        sleep(1000)
    }
}

//转向商城页面
function toMallPage() {
    toMainPage()
    sleep(1000)
    console.warn("在主页面点击商城")
    click(1814, 1019)
    sleep(1000)
}

//转向联盟页面
function toLeaguePage() {
    toMainPage()
    sleep(1000)
    console.warn("在主页面点击联盟")
    click(1562, 1011);
    sleep(1000)
}

//转向选手页面
function toPlayerPage() {
    toMainPage()
    sleep(1000)
    console.warn("在主页面点击联盟")
    click(619, 1011);
    sleep(1000)
}

//转向签约页面
function toSigningPage() {
    toMainPage()
    sleep(1000)
    console.warn("在主页面点击签约")
    click(1229, 524);
    sleep(1000)
}

//转向俱乐部页面
function toClubPage() {
    toMainPage()
    sleep(1000)
    console.warn("在主页面点击俱乐部")
    click(1671, 490);
    sleep(1000)
}

//转向开始比赛页面
function toCompetitionPage() {
    toMainPage()
    sleep(1000)
    console.warn("在主页面点击开始比赛")
    click(1530, 640);
    sleep(1000)
}

//点左上角返回一次
function toBack() {
    console.warn("点击左上角，返回一级")
    click(129, 52);
}

// ========================================================================================================================


//进入主页后开始脚本
while(true) {
    if(isMainPage()) {
        console.info("已成功进入主页面，开始脚本操作")
        break;
    } else {
        console.log("等待进入主页面中...")
        sleep(1000);
    }
}


//进入商店，买两个免费的东西
if(todoFlag.shangcheng) {
    console.info("开始执行商店任务")
    sleep(1000)
    toMallPage();
    if(isMallPage()) {
        //买免费的经营点礼包
        swipe(753, 952, 753, 326, 1000)
        sleep(2000)
        var free1StartX = 934.7, free1StartY = 201.8;
        var storeScImage = captureScreen();
        //经营点礼包左上角的红色，和箱子图片的黄色，找到是【免费的经营点礼包】
        var free1StartPosioion = images.findMultiColors(storeScImage, "#ffd6aa30", [[936 - 1019, 545 - 381, "#ff3a7ad3"], [1144 - 1019, 543 - 381, "#ff3b7bd5"]]);
        if(free1StartPosioion != null) {
            console.log("发现了免费的经营点礼包")
            click(free1StartPosioion.x, free1StartPosioion.y)
            sleep(300)
            click(1687, 985);
            sleep(1000)
    
            //二次确认ocr识别购买按钮的金额是否为【0】
            var goodsScImage = captureScreen();
            var goodsClipImg = images.clip(goodsScImage, 795, 751, 1122 - 795, 829 - 751);
            let goodsOcrRes = gmlkit.ocr(goodsClipImg, "zh");
            console.log("识别到购买按钮文字：" + goodsOcrRes.text)
            if("购买0" === goodsOcrRes.text) {
                console.log("打开商品购买dialog确实为免费，点击购买")
                click(967, 785)
                sleep(1000)
                console.log("点击【确定】进行购买")
                click(1096, 753)
                closeBlankToCloseDialog(); //点击空白关闭模态框
                click(1514, 224) //点击dialog右上角的关闭按钮
            } else {
                console.verbose("打开购买窗口后未发现【免费】标识，关闭")
                click(1514, 224)
            }
    
        } else {
            console.verbose("没有发现免费的经营点礼包，此处跳过")
        }
    
        //买免费的资金
        console.setPosition(1250, 100);
        sleep(500)
        storeScImage = captureScreen();
        var free2StartPosioion = images.findMultiColors(storeScImage, "#ff9bc5ad", [[327 - 383, 890 - 732, "#ff3a78d1"], [518 - 383, 850 - 732, "#ff3764b0"]]);
        if(free2StartPosioion != null) {
            console.log("发现了免费的资金")
            click(free2StartPosioion.x, free2StartPosioion.y)
            sleep(300)
            click(1687, 985);
            console.setPosition(100, 100);
            sleep(1000)
    
            //二次确认ocr识别购买按钮的金额是否为【0】
            var goodsScImage = captureScreen();
            var goodsClipImg = images.clip(goodsScImage, 795, 751, 1122 - 795, 829 - 751);
            let goodsOcrRes = gmlkit.ocr(goodsClipImg, "zh");
            console.log("识别到购买按钮文字：" + goodsOcrRes.text)
            if("购买0" === goodsOcrRes.text) {
                console.log("打开商品购买dialog确实为免费，点击购买")
                click(967, 785)
                sleep(1000)
                console.log("点击【确定】进行购买")
                click(1096, 753)
                console.log("等待3秒钟购买完成后自动关闭模态框")
                closeBlankToCloseDialog(); //点击空白关闭模态框
                click(1514, 224) //点击dialog右上角的关闭按钮
            } else {
                console.verbose("打开购买窗口后未发现【免费】标识，关闭")
                click(1514, 224)
            }
        } else {
            console.verbose("没有发现免费的资金，此处跳过")
        }
        console.warn("商城任务执行结束")
    } else {
        console.verbose("进入商城页面失败，跳过")
    }
}



//进入联盟
console.setPosition(100, 100);
if(todoFlag.lianmeng) {
    console.info("开始执行联盟任务")
    toLeaguePage();
    sleep(1000)
    if("联盟信息" === ocrCaptureScreen(341, 28, 555, 79)) {
        //一键全赞
        if("一键全赞" === ocrCaptureScreen(1708, 159, 1825, 192)) {
            console.log("点击【一键全赞】")
            click(1768, 173)
        } else {
            console.verbose("没有找到【一键全赞】，点赞任务跳过");
        }

        //每日薪资
        sleep(1000)
        var img = captureScreen();
        var salaryColor = colors.toString(images.pixel(img, 88.8, 932.5))
        console.log("左下角每日薪资箱子的颜色是", salaryColor)
        sleep(1000)
        click(131, 951) //点击箱子
        sleep(1000)

        console.warn("联盟任务执行结束")
    } else {
        console.log("进入联盟失败，跳过")
    }
}


// 进入选手
if(todoFlag.xuanshou) {
    console.info("开始执行选手任务")
    toPlayerPage();
    sleep(1000)
    if("选手管理" === ocrCaptureScreen(341, 28, 555, 79)) {
        //每行有5个人，随机挑一列
        console.info("开始执行选手符文升级任务")
        var choseRowIndex = Math.floor((Math.random() * 5))
        var playerCardXArr = [434, 745, 1050, 1350, 1657];

        //升符文
        console.setPosition(200, 450);
        sleep(1000)
        click(playerCardXArr[choseRowIndex], 426) //点击一个人
        sleep(2000)
        click(177, 892); //点击左侧【符文】按钮
        sleep(1000)
        click(177, 892); //点击左侧【符文】按钮
        sleep(1000)
        var fScImg = captureScreen();
        var fUpdatePosition = images.findMultiColors(fScImg, "#ff04d491", [[1435.4 - 1409, 0, "#ff1d1e2d"]]);
        if(fUpdatePosition != null) {
            click(fUpdatePosition.x - 10, fUpdatePosition.y - 10); //点击一个可以升级的符文（带有绿色箭头的）
            sleep(1000)
            click(928, 339); //点击【升级】按钮
            sleep(1000)
            while(true) {
                sleep(1000)
                console.log("点击一次符文")
                click(298, 377);
                sleep(1000)
                var cfScImg = captureScreen();
                if(images.detectsColor(cfScImg, "#fffafc5c", 1671, 874)) {
                    console.info("已经达到升级要求， 点击升级")
                    click(1671, 874)
                    break;
                } else {
                    console.log("还未达到升级要求")
                }
            }

            sleep(1000)
            click(1708, 133); //点击右上角dialog的叉
            sleep(1000)
            click(704, 64); //点击背包的叉
            
        } else {
            console.verbose("没有找到可以升级的符文，跳过")
        }

        sleep(1000)
        toBack();

        //升级
        //一般来说第一行或前几行都是满级的，所以随机往下滚几下，去升级不重要的选手
        console.info("开始执行选手任务")
        console.setPosition(100, 100);
        sleep(1000)
        var swipeTimes = Math.floor((Math.random() * 10) + 1)
        for(var i = 0; i < swipeTimes; i++) {
            console.log("随机往下滚几下：" + (i+1) + "/" + swipeTimes)
            swipe(1350, 952, 1350, 326, 500)
            sleep(300)
        }
        
        console.setPosition(300, 300);
        sleep(2000)
        click(playerCardXArr[choseRowIndex], 230); //点击一个人
        sleep(1000)
        click(133, 442); //点击左侧【升级】按钮
        sleep(1000)
        var img = captureScreen();
        if(images.detectsColor(img, "#fffbfb59", 1800, 950) && "升级" === ocrCaptureScreen(78, 421, 157, 468)) { //右下角的升级按钮是黄色，并且左侧有升级文字
            console.log("点击右下角升级按钮")
            click(1800, 950)
        } else {
            console.verbose("此选手不可升级")
        }
    } else {
        console.log("进入选手失败，跳过")
    }
}

//签约选手
if(todoFlag.qianyuexuanshou) {
    console.info("开始执行签约选手任务")
    sleep(1000);
    toSigningPage();
    sleep(1000)
    click(971, 169)
    console.setPosition(200, 200)
    sleep(1000)
    click(127, 185)
    sleep(1000)
    if("签约选手" === ocrCaptureScreen(341, 20, 522.7, 82.8)) {
        if("本次免费" === ocrCaptureScreen(755, 916, 948, 975)) {
            console.log("点击【本次免费】")
            click(755, 916);
            sleep(5000); //签约有个动画，多等一会儿
            click(791, 961); //签约完成后点击确认按钮
        } else {
            console.verbose("本次签约不免费，跳过")
        }
    } else {
        console.verbose("进入签约选手页面失败，跳过")
    }
}

//召唤英雄
if(todoFlag.zhaohuanyingxiong) {
    console.info("开始执行召唤英雄任务")
    sleep(1000);
    toSigningPage();
    sleep(1000)
    click(1568, 212)
    sleep(1000)
    if("召唤英雄" === ocrCaptureScreen(339, 26, 525, 87)) {
        if("0" !== ocrCaptureScreen(1411, 28, 1504, 79)) {
            var choseColumnIndex = Math.floor((Math.random() * 5))
            var heroLeftMenuYArr = [216, 333, 448, 565, 686];
            console.log("随机点一个分路")
            click(64, heroLeftMenuYArr[choseColumnIndex])
            sleep(1000)
            click(840, 935); //点击单召按钮
            sleep(2000)
            click(724, 944); //点击确定按钮
        } else {
            console.verbose("英雄召唤币为0，跳过")
        }
    } else {
        console.verbose("进入召唤英雄页面失败，跳过")
    }
}

// 俱乐部 - 事件
if(todoFlag.julebu_shijian) {
    console.info("开始执行俱乐部事件任务")
    sleep(1000)
    toClubPage();
    sleep(1000);
    if("俱乐部" === ocrCaptureScreen(343, 28, 486, 85)) {
        
        while(true) {
            sleep(1000)
            console.warn("点击右下角的【事件】")
            click(1663, 981)
            sleep(1000)
            var scImage = captureScreen();
            if(images.detectsColor(scImage, "#fffafc5c", 1635, 335)) { //如果第一行事件的右侧按钮是黄色，则说明存在有可以处理的事件
                click(1635, 335); //点击右侧黄色按钮处理事件
                sleep(1000)
                click(1845, 62); //点击右上角按钮跳过
                sleep(2000);
                click(1249, 440); //点击第一个剧情
                closeBlankToCloseDialog();
                sleep(3000)
                toBack()
            } else {
                console.verbose("目前没有可以处理的事件")
                click(1716, 133); //点击右上角的叉
                break;
            }
        }

    } else {
        console.verbose("进入俱乐部页面失败，跳过")
    }
}

//俱乐部 - 收益
if(todoFlag.julebu_shouyi) {
    console.info("开始执行俱乐部收益任务")
    sleep(1000)
    toClubPage();
    sleep(1000);
    if("俱乐部" === ocrCaptureScreen(343, 28, 486, 85)) {
        click(1808, 975)
        sleep(1000)
        if(checkColor("#fffafc5d", 1605, 805)) {
            click(1605, 805)
            closeBlankToCloseDialog(); //点击空白关闭模态框
            click(1736, 111)
        } else {
            console.verbose("目前收益按钮不可领，跳过")
            click(1736, 111);
        }
    } else {
        console.verbose("进入俱乐部页面失败，跳过")
    }
}

//俱乐部 - 英雄分析
if(todoFlag.julebu_yingxiongfenxi) {
    console.info("开始执行俱乐部英雄分析任务")
    sleep(1000)
    toClubPage();
    sleep(1000);
    if("俱乐部" === ocrCaptureScreen(343, 28, 486, 85)) {
        click(78, 617)
        sleep(1000)
        if("英雄分析中心" === ocrCaptureScreen(340, 24, 608, 85)) {
            var y1 = 785, y2 = 827;
            var xArr = [[175, 313], [539, 678], [894, 1035], [1261, 1397], [1621, 1758]]
            for(var i = 0; i < xArr.length; i++) {
                sleep(1000)
                var text = ocrCaptureScreen(xArr[i][0], y1, xArr[i][1], y2);
                console.log("第" + (i + 1) + "个：" + text)
                if(text && text.indexOf("报告") >= 0) {
                    click(xArr[i][0], y1); //点击一个卡片
                    sleep(1000)
                    click(627, 938); //点击右下角黄色按钮
                    closeBlankToCloseDialog(); //点击空白关闭模态框
                    click(xArr[i][0], y1); //再次点击卡片
                    sleep(1000)
                    click(1831, 944); //点击右下角确认按钮
                } else if(text && text.indexOf("开始") >= 0) {
                    click(xArr[i][0], y1)
                    sleep(1000)
                    click(1831, 944)
                } else {
                    console.log("第" + (i + 1) + "个英雄分析未完成")
                }
            }
        } else {
            console.verbose("进入英雄分析中心失败，跳过")
        }
    } else {
        console.verbose("进入俱乐部页面失败，跳过")
    }
}


//俱乐部 - 战队大楼
if(todoFlag.julebu_zhanduidalou) {
    console.info("开始执行俱乐部战队大楼任务")
    sleep(1000)
    toClubPage();
    sleep(1000);
    if("俱乐部" === ocrCaptureScreen(343, 28, 486, 85)) {
        click(989, 254)
        sleep(1000)
        var ocrText = ocrCaptureScreen(339, 26, 608, 85);
        if(ocrText.indexOf("战") >= 0 || ocrText.indexOf("队") >= 0 || ocrText.indexOf("大") >= 0 || ocrText.indexOf("楼") >= 0) {
            var y1 = 801, y2 = 850;
            var xArr = [[187, 335], [537, 682], [888, 1029], [1235, 1383], [1585, 1726]]
            for(var j = 0; j < 2; j++) { //第一次循环用来领取奖励，第二次循环用来安排日程
                console.info("第"+(j+1)+"次循环用来" + (j == 0 ? "领取" : "安排"))
                for(var i = 0; i < xArr.length; i++) {
                    sleep(1000)
                    var text = ocrCaptureScreen(xArr[i][0], y1, xArr[i][1], y2);
                    console.log("第" + (i + 1) + "个：" + text)
                    if(text.indexOf("取") >= 0) {
                        click(xArr[i][0], y1)
                        sleep(1000)
                        if(checkColor("#fffafc5d", 1257, 789)) { //说明还没有训练完成，打开了确认提示框，直接关闭
                            console.verbose("未训练完成，直接关闭")
                            click(1512, 228)
                        } else {
                            closeBlankToCloseDialog(); //点击空白关闭模态框
                        }
                        
                    } else if(text.indexOf("安") >= 0 || text.indexOf("日") >= 0 || text.indexOf("曰") >= 0) {
                        click(xArr[i][0], y1)
                        sleep(1000)
                        click(1669, 900)
                    } else {
                        console.verbose("正在训练中不做任何操作，跳过")
                    }
                }
            }
            

            // 单独处理第六个
            console.log("向左滑动单独处理第6个")
            swipe(1257, 948, 680, 970, 300)
            sleep(500)
            swipe(1257, 948, 680, 970, 300)
            sleep(1000)
            for(var j = 0; j < 2; j++) {
                console.log("第"+(j+1)+"次循环用来" + (j == 0 ? "领取" : "安排"))
                var text = ocrCaptureScreen(1580, y1, 1726, y2);
                console.log("第6个：" + text)
                if(text.indexOf("取") >= 0) {
                    click(1580, y1)
                    sleep(1000)
                    if(checkColor("#fffafc5d", 1257, 789)) { //说明还没有训练完成，打开了确认提示框，直接关闭
                        console.verbose("未训练完成，直接关闭")
                        click(1512, 228)
                    } else {
                        closeBlankToCloseDialog(); //点击空白关闭模态框
                    }
                } else if(text.indexOf("安") >= 0 || text.indexOf("日") >= 0 || text.indexOf("曰") >= 0) {
                    click(1580, y1)
                    sleep(1000)
                    click(1669, 900)
                } else {
                    console.verbose("正在训练中不做任何操作，跳过")
                }
            }
            


        } else {
            console.verbose("进入战队大楼失败，跳过")
        }
    } else {
        console.verbose("进入俱乐部页面失败，跳过")
    }
}

//俱乐部 - 活动中心
if(todoFlag.julebu_huodongzhongxin) {
    console.info("开始执行俱乐部活动中心任务")
    sleep(1000)
    toClubPage();
    sleep(1000);
    if("俱乐部" === ocrCaptureScreen(343, 28, 486, 85)) {
        click(1110, 712)
        sleep(1000)
        if(ocrCaptureScreen(340, 24, 608, 85).indexOf("活动中心") >= 0) {
            var y1 = 809, y2 = 854;
            var xArr = [[192, 327], [539, 674], [894, 1031], [1243, 1370], [1588, 1722]]
            for(var i = 0; i < xArr.length; i++) {
                sleep(1000)
                var text = ocrCaptureScreen(xArr[i][0], y1, xArr[i][1], y2);
                console.log("第" + (i + 1) + "个：" + text)
                if(text.indexOf("派") >= 0 || text.indexOf("遣") >= 0) {
                    click(xArr[i][0], y1)
                    sleep(1000)
                    while(!checkColor("#fffafc5c", 1681, 890)) {
                        click(914, 686)
                        swipe(900, 803, 882, 575, 500)
                        console.log("随机滑动选人，直到达到满足条件")
                    }
                    sleep(1000)
                    click(1681, 890); //点击右下角派遣
                } else if(text.indexOf("领") >= 0 || text.indexOf("取") >= 0) {
                    click(xArr[i][0], y1)
                    closeBlankToCloseDialog(); //点击空白关闭模态框【状态提升】
                    closeBlankToCloseDialog(); //点击空白关闭模态框【恭喜获得】
                } else {
                    console.verbose("第" + (i+1) + "个无需操作，跳过")
                }
            }
            
        } else {
            console.verbose("进入活动中心失败，跳过")
        }
    } else {
        console.verbose("进入俱乐部页面失败，跳过")
    }
}

//俱乐部 - 战队宿舍
if(todoFlag.julebu_zhanduisushe) {
    console.info("开始执行俱乐部战队宿舍任务")
    sleep(1000)
    toClubPage();
    sleep(1000);
    if("俱乐部" === ocrCaptureScreen(343, 28, 486, 85)) {
        click(1362, 383)
        sleep(1000)
        if(ocrCaptureScreen(340, 24, 608, 85).indexOf("大厅") >= 0) {
            click(296, 825)
            sleep(1000)
            if(checkColor("#fffbfc5b", 1403, 918)) {
                click(1403, 918)
            } else {
                console.verbose("赠送按钮不可点击，跳过")
            }
        } else {
            console.verbose("进入战队宿舍失败，跳过")
        }
    } else {
        console.verbose("进入俱乐部页面失败，跳过")
    }
}

//俱乐部 - 展览馆
if(todoFlag.julebu_zhanlanguan) {
    console.info("开始执行俱乐部展览馆任务")
    sleep(1000)
    toClubPage();
    sleep(1000);
    if("俱乐部" === ocrCaptureScreen(343, 28, 486, 85)) {
        click(1611, 761)
        sleep(1000)
        var ocText = ocrCaptureScreen(340, 24, 608, 85);
        if(ocText.indexOf("展") >= 0 || ocText.indexOf("览") >= 0 || ocText.indexOf("馆") >= 0) {
            click(72, 426); //点击左侧拜访按钮
            sleep(1000)
            console.setPosition(500, 100)
            sleep(1000)
            click(327, 343); //点击左侧好友菜单
            console.setPosition(100, 100)
            sleep(1000)
            click(1597, 335); //点击第一个好友的右侧拜访按钮
            console.setPosition(500, 100)
            sleep(1000)
            click(401, 197); //点击好友展览馆的点赞
            console.setPosition(100, 100)
        } else {
            console.verbose("进入战队宿舍失败，跳过")
        }
    } else {
        console.verbose("进入俱乐部页面失败，跳过")
    }
}

// 俱乐部 - 选手招聘
if(todoFlag.julebu_xuanshouzhaopin) {
    console.info("开始执行俱乐部选手招聘任务")
    sleep(1000)
    toClubPage();
    sleep(1000);
    if("俱乐部" === ocrCaptureScreen(343, 28, 486, 85)) {
        click(1831, 573)
        sleep(1000)
        var ocText = ocrCaptureScreen(340, 24, 608, 85);
        if(ocText.indexOf("选") >= 0 || ocText.indexOf("手") >= 0 || ocText.indexOf("招") >= 0|| ocText.indexOf("聘") >= 0) {
            gesture(1000, [1371, 444], [1150, 444], [1150, 200])
            for(var j = 0; j < 2; j++) {
                var y = 791.2;
                var xArr = [195, 547, 975, 1415, 1782]
                for(var i = 0; i < xArr.length; i++) {
                    sleep(1000)
                    var img = captureScreen();
                    var lineColor = colors.toString(images.pixel(img, xArr[i], y));
                    console.log("第" + (i+1) + "的状态条颜色是" + lineColor)
                    if(lineColor.indexOf("#ffffff") >= 0) {
                        console.log("第" + (i+1) + "个可领取")
                        click(xArr[i], y)
                        closeBlankToCloseDialog();
                    } else {
                        console.log("第" + (i+1) + "个不可领取")
                        click(xArr[i], y)
                        sleep(1000)
                        var orText = ocrCaptureScreen(573, 165, 1003, 228);
                        if(orText.indexOf("请") >= 0 || orText.indexOf("选") >= 0 || orText.indexOf("中") >= 0) {
                            sleep(2000)
                            click(900, 345) //选中二排坐二
                            sleep(1000)
                            click(1249, 369) //选中一排左二
                            sleep(1000)
                            click(1643, 341) //选中一排坐三
                            sleep(1000)
                            click(1805, 950) //点击右下角确认按钮
                        } else {
                            console.log("点击没反应，判断未正在招聘，跳过")
                        }
                        
                    }
                }
            }
        } else {
            console.verbose("进入选手招聘失败，跳过")
        }
    } else {
        console.verbose("进入俱乐部页面失败，跳过")
    }
}

// 友情点
if(todoFlag.youqingdian) {
    console.info("开始执行赠送友情点任务")
    sleep(1000)
    toMainPage();
    sleep(1000);
    click(1766, 54); //点击右上角的好友图标
    sleep(1000)
    var ocText = ocrCaptureScreen(342, 26, 450, 80);
    if(ocText.indexOf("好") >= 0 || ocText.indexOf("友") >= 0) {
        if(checkColor("#fffbfc5b", 1829, 930)) {
            console.warn("点击一键领取")
            click(1829, 930)
            closeBlankToCloseDialog();
        } else {
            console.verbose("一键领取不可点击，跳过")
        }

        sleep(1000)
        if(checkColor("#ff4871fd", 1320, 967)) {
            console.warn("点击一键赠送")
            click(1320, 967)
            sleep(2000)
        } else {
            console.verbose("一键赠送不可点击，跳过")
        }
    } else {
        console.verbose("进入好友页面失败，跳过")
    }
}

//取活动领取体力
if(todoFlag.lingqutili) {
    sleep(1000)
    console.info("取活动页领取体力")
    toMainPage();
    click(1463, 169)
    sleep(1000)
    var ocText = ocrCaptureScreen(339, 24, 438, 84)
    if(ocText.indexOf("活") >= 0 || ocText.indexOf("动") >= 0) {
        click(66, 329); //点击左侧日常菜单
        sleep(1000)
        if(checkColor("#fffbfb59", 1814, 403)) {
            click(1814, 403)
            closeBlankToCloseDialog();
        } else {
            console.verbose("第一个体力不可领取，跳过")
        }

        sleep(1000)
        if(checkColor("#fffbfb59", 1814, 403)) {
            click(1814, 403)
            closeBlankToCloseDialog();
        } else {
            console.verbose("第二个体力不可领取，跳过")
        }
    } else {
        console.verbose("进入活动页失败，跳过")
    }
}

function isCompetitionPage() {
    var ocText = ocrCaptureScreen(347, 28, 535, 80);
    return ocText.indexOf("选") >= 0 || ocText.indexOf("择") >= 0 || ocText.indexOf("比") >= 0 || ocText.indexOf("赛") >= 0;
}

//免费体力
if(todoFlag.mianfeitili) {
    console.info("开始执行职业联赛任务")
    sleep(1000)
    toCompetitionPage();
    sleep(1000);
    if(isCompetitionPage()){
        click(882, 321) //点击职业联赛
        sleep(3000)
        click(1565, 60) //点击添加体力按钮
        console.setPosition(20, 20)
        sleep(2000)
        var ocrText = ocrCaptureScreen(688, 705, 828, 740)
        console.setPosition(100, 100)
        if(ocrText.indexOf("本") >= 0 || ocrText.indexOf("次") >= 0 || ocrText.indexOf("免") >= 0 || ocrText.indexOf("费") >= 0) {
            click(875, 820) //点击购买按钮
            sleep(1500)
            closeBlankToCloseDialog();
        } else {
            console.verbose("体力不免费，跳过")
        }
        click(1511, 233) //点右上角的叉
    } else {
        console.verbose("进入比赛页面失败，跳过")
    }
}

//特惠
if(todoFlag.tehui) {
    toMainPage();
    console.info("开始执行特惠页面领取")
    sleep(1000)
    click(1341, 173) //点击【特惠】
    sleep(1000)
    click(74, 563) //点击【每日】
    sleep(1000)
    if(checkColor("#fffbfb59", 625, 990)) {
        click(625, 990)
        closeBlankToCloseDialog()
    } else {
        console.verbose("本次免费礼包不可领，跳过")
    }

    //点击一下【超值】，强迫症去掉红点
    console.info("点击一下【超值】，强迫症去掉红点")
    console.setPosition(300, 100)
    sleep(1000)
    click(79, 682)
    sleep(1000)
    click(285, 430)
    console.setPosition(100, 100)
}

//比赛 - 冠军挑战
if(todoFlag.bisai_guanjuntiaozhan) {
    console.info("开始执行冠军挑战任务")
    sleep(1000)
    toCompetitionPage();
    sleep(1000);
    if(isCompetitionPage()) {
        click(1722, 355); //点击冠军挑战
        sleep(1000)
        if(checkColor("#fffbfd5c", 1825, 926)) {
            click(1825, 926)
            sleep(1000)
            var challengeImage = captureScreen();
            var mopStartPosioion = images.findMultiColors(challengeImage, "#ff8438ff", [[983 - 630, 781 - 770, "#fffbfb5a"]]);
            if(mopStartPosioion != null) {
                click(mopStartPosioion.x, mopStartPosioion.y + 20); //点击黄色挑战左侧的蓝色扫荡按钮
                sleep(1000)
                if(checkColor("#fffafc5d", 1508, 825)) {
                    click(1508, 825) //点击挑战
                    sleep(3000)
                    click(1708, 133) //点击叉
                } else {
                    console.verbose("扫荡按钮不可点击， 关闭弹窗")
                    click(1512, 228)
                }
            } else {
                console.verbose("未找到扫荡按钮，跳过")
            }
        } else {
            console.verbose("无法进入，跳过")
        }
    } else {
        console.verbose("进入比赛页面失败，跳过")
    }
}

// 比赛 - 赛区争霸
if(todoFlag.bisai_saiquzhengba) {
    console.info("开始执行赛区争霸任务")
    sleep(1000)
    toCompetitionPage();
    sleep(1000);
    if(isCompetitionPage()){
        click(1433, 331)
        sleep(3000)
        click(411, 962) //点击左下角的自动连战
        sleep(1000)
        if(checkColor("#fffbfc5c", 1223, 910)) {
            click(1223, 910) //点击开始挑战
            sleep(1000)
            click(1710, 135) //点击叉
        } else {
            console.verbose("开始挑战按钮不可点，跳过")
            click(1710, 135)
        }
    }else {
        console.verbose("进入比赛页面失败，跳过")
    }
}

// 比赛 - 团战集训
if(todoFlag.bisai_saiquzhengba) {
    console.info("开始执行团战集训任务")
    sleep(1000)
    toCompetitionPage();
    sleep(1000);
    if(isCompetitionPage()){
        click(1152, 337)
        sleep(3000)
        click(411, 962) //点击左下角的自动连战
        sleep(1000)
        if(checkColor("#fffbfc5c", 1223, 910)) {
            click(1223, 910) //点击开始挑战
            sleep(1000)
            click(1710, 135) //点击叉
        } else {
            console.verbose("开始挑战按钮不可点，跳过")
            click(1710, 135)
        }
    }else {
        console.verbose("进入比赛页面失败，跳过")
    }
}

// 比赛 - 职业联赛
if(todoFlag.bisai_zhiyeliansai) {
    console.info("开始执行职业联赛任务")
    sleep(1000)
    toCompetitionPage();
    sleep(1000);
    if(isCompetitionPage()){
        click(882, 321)
        sleep(3000)
        click(232, 944) //点击左下角的快速扫荡
        console.setPosition(100, 482)
        sleep(1000)
        var ocText = ocrCaptureScreen(878, 103, 1037, 155)
        if(ocText.indexOf("快") >= 0 || ocText.indexOf("快") >= 0 || ocText.indexOf("快") >= 0 || ocText.indexOf("快") >= 0) {
            var xArr = [579, 793, 1007, 1229, 1447, 1659]
            click(xArr[saodangRow1Index], 224)
            sleep(1000)
            click(xArr[saodangRow2Index], 315)
            console.setPosition(100, 100)
            sleep(1000)
            while(true) {
                var mopImage = captureScreen();
                var mopBtnPostition = images.findMultiColors(mopImage, "#fffef445", [[1681 - 1465, 682 - 678, "#fffafc5c"],[1578 - 1465, 724 - 678, "#fffcf851"]]);
                if(mopBtnPostition != null) {
                    console.info(mopBtnPostition)
                    click(mopBtnPostition.x, mopBtnPostition.y)
                    sleep(3000)
                    click(1705, 135)
                    sleep(2000)
                } else {
                    console.verbose("没有可扫荡的按钮")
                    break;
                }
            }
        } else {
            console.verbose("进入快速扫荡失败，跳过");
        }
    }else {
        console.verbose("进入比赛页面失败，跳过")
    }
}

//比赛 - 巅峰竞技场
if(todoFlag.bisai_dianfengjingjichang) {
    console.info("开始执行巅峰竞技场任务")
    sleep(1000)
    toCompetitionPage();
    sleep(1000);
    if(isCompetitionPage()){
        click(218, 774)
        sleep(1000)
        // 往左划几下，确保划到头
        swipe(1722, 480, 1080, 480, 500)
        sleep(500)
        swipe(1722, 480, 1080, 480, 500)
        sleep(500)
        swipe(1722, 480, 1080, 480, 500)
        sleep(500)
        while(true) {
            click(1768, 720)
            sleep(1000)
            var ocrText = ocrCaptureScreen(800, 496, 1009, 582)
            if(ocrText.indexOf("挑") >= 0 || ocrText.indexOf("挑") >= 0 || ocrText.indexOf("挑") >= 0 || ocrText.indexOf("挑") >= 0) {
                console.verbose("挑战次数不够了， 关闭")
                click(1511, 227) //点击右上角的叉
                break
            } else {
                closeBlankToCloseDialog()
            }
        }

        sleep(1000)
        console.log("点一下下方的收益")
        click(1136, 956)
    }else {
        console.verbose("进入比赛页面失败，跳过")
    }
}

// ==========================================================================================================

sleep(1000);
toMainPage();
sleep(3000)
threads.shutDownAll()
console.info("运行结束，脚本已退出，请自行关闭此弹窗")
alert("运行结束");