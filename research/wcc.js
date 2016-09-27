/*v0.7cc_20160919*/
var $gwxcount
var $gaic = {}
$gwx = function (path, global) {
    function addChild(a, b) {
        b && a.children.push(b);
    }

    function convertToWXTag(tag) {
        $gwxcount++;
        if ($gwxcount >= 16000) {
            throw 'enough, dom limit exceeded, you don\'t do stupid things, do you?'
        };
        return {tag: tag.substr(0, 3) == 'wx-' ? tag : 'wx-' + tag, attr: {}, children: []}
    }

    function getData(scope, env, key) {
        return typeof(scope[key]) != 'undefined' ? scope[key] : env[key]
    }

    var e_ = {}
    if (global && typeof(global.entrys) == 'object')e_ = global.entrys
    var d_ = {}
    if (global && typeof(global.defines) == 'object')d_ = global.defines
    var wxmlLineMap
    d_['src/index.wxml'] = {}
    var m0 = function (env, scope, root, global) {
        wxmlLineMap.push("src/index.wxml:page:1:1")
        var uB = convertToWXTag('page')
        wxmlLineMap.push("src/index.wxml:view:3:6")
        var hC = convertToWXTag('view')
        hC.attr.class = "container"
        wxmlLineMap.push("src/index.wxml:view:4:8")
        var aD = convertToWXTag('view')
        aD.attr.bindtap = "bindViewTap"
        aD.attr.class = "userinfo"
        wxmlLineMap.push("src/index.wxml:image:5:10")
        var oE = convertToWXTag('image')
        oE.attr.backgroundSize = "cover"
        oE.attr.class = "userinfo-avatar"
        oE.attr.src = "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7pIm6FdyB5rlkI0JCr9uOr8n7aCIQ4RsyG0oPeicO9pfQ/132"
        wxmlLineMap.pop()
        addChild(aD, oE)
        wxmlLineMap.push("src/index.wxml:text:6:10")
        var jF = convertToWXTag('text')
        jF.attr.class = "userinfo-nickname"
        var appData = getData(scope, env, 'userInfo')

        var cH = appData ? appData.nickName : undefined
        var aG = typeof(cH) == 'undefined' ? '' : cH
        aG = aG.toString()
        addChild(jF, aG)
        wxmlLineMap.pop()
        addChild(aD, jF)
        wxmlLineMap.pop()
        addChild(hC, aD)
        wxmlLineMap.push("src/index.wxml:view:8:8")
        var yJ = convertToWXTag('view')
        yJ.attr.class = "usermotto"
        wxmlLineMap.push("src/index.wxml:text:9:10")
        var sK = convertToWXTag('text')
        sK.attr.class = "user-motto"
        var bL = "hello,world"
        bL = bL.toString()
        addChild(sK, bL)
        wxmlLineMap.pop()
        addChild(yJ, sK)
        wxmlLineMap.pop()
        addChild(hC, yJ)
        wxmlLineMap.pop()
        addChild(uB, hC)
        wxmlLineMap.pop()
        addChild(root, uB)
        return root
    }
    e_["src/index.wxml"] = {f: m0, i: [], ti: [], ic: []}
    if (path && e_[path]) {
        return function (env, global) {
            $gwxcount = 0;
            var root = {"tag": "wx-page"};
            root.children = []
            var main = e_[path].f
            wxmlLineMap = []
            try {
                main(env, {}, root, global);
            } catch (err) {
                console.log(wxmlLineMap, env);
                console.log(err)
            }
            return root;
        }
    }
}

var test = {
    userInfo: {
        nickName: "phodal"
    }
};
console.log(JSON.stringify($gwx('src/index.wxml')(test)));