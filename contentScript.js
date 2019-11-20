//av60461684* default setting

let avcode = "60461684";
let time = 9.8;
var curAVCode;

// chrome.storage.sync.get("config",function(val){
//     if(config==undefined)
//         avcode=val;
// })
chrome.storage.sync.get("config",function(obj){
    let config = obj.config;
    let list = config.list;
    let url = config.url;
    let s = url.lastIndexOf('v')+1;
    let e = url.indexOf('?');
    curAVCode = url.slice(s,e);
    for(i=0,len=list.length;i<len;i++){
        let tempCode = list[i].avcode;
        let tempTime = list[i].time;
        if(tempCode == curAVCode){
            jump(tempTime);
            return;
        }
    }
    if(curAVCode==avcode)
        jump(time);
})
function jump(time){
    //页面加载完成后跳进度
    var vi = document.getElementsByTagName("video")[0];
        vi.addEventListener("loadeddata",function(){
            vi.currentTime=time;
        },true);

    //监听元素变动，实现换p后也能跳进度
    var insertedNodes = [];
    var observer = new WebKitMutationObserver(function(mutations) {
    //    console.log(mutations);
        for(let mutation of mutations) {
            let type = mutation.type;
            if(type == "childList" && mutation.addedNodes.length>0)
                if(mutation.addedNodes[0].nodeName=="VIDEO"){
                    var video = mutation.addedNodes[0];
                    video.currentTime = time;
                }

                //console.log("A child node has been added or removed.");
            }
        });

    observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true
    });
}