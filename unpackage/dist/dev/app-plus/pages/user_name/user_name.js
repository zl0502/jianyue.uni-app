
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"_input { height: 50px; border-bottom: 1px solid #eee; margin-bottom: 5px; }\n.",[1],"green-btn{ margin-top: 20px; width: 80%; background: #00B26A; color: white; }\n",],undefined,{path:"./pages/user_name/user_name.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/user_name/user_name.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      