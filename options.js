let button = document.getElementById("submit");
button.addEventListener("click",function(){
    let avcode = document.getElementsByName("avcode")[0].value;
    let time = document.getElementsByName("time")[0].value;
    chrome.storage.sync.get("config", function(obj) {
        let config = obj.config;
        let list=config.list;
        for(j = 0,len=list.length; j < len; j++) {
            let temp = list[j];
            if(temp.avcode ==avcode)
                return;
        }
        config.list.push({avcode,time});
        chrome.storage.sync.set({config}, function() {
            alert("提交成功!");
          })
      })
    
});