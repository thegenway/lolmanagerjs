# lolmanagerjs

### 在全面屏手机上会导致定位不准确，建议使用在1080*1920的屏幕上使用，或者在pc端使用安卓模拟器

AutoX.js手游英雄联盟电竞经理自动做任务脚本
> 运行脚本依赖项目：[AutoX.js](https://github.com/kkevsekk1/AutoX)

此脚本可自动完成英雄联盟电竞经理的每日基础任务

``` javascript
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
```

![运行过程截图](https://github.com/thegenway/lolmanagerjs/blob/main/img/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20231229151029.png)
![运行过程截图](https://github.com/thegenway/lolmanagerjs/blob/main/img/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20231229151601.png)
![运行过程截图](https://github.com/thegenway/lolmanagerjs/blob/main/img/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20231229151653.png)
![运行过程截图](https://github.com/thegenway/lolmanagerjs/blob/main/img/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20231229151812.png)
![运行过程截图](https://github.com/thegenway/lolmanagerjs/blob/main/img/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20231229151626.png)
