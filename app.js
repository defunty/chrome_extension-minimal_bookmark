var tab="";
var count=0;
var newid;
var array=new Array;
var max=30
var t_count=0;

chrome.storage.local.get("count",function(result){
  if(typeof result.count!="undefined") count=result.count;
});
  
chrome.storage.local.get("max",function(result){
  var span = document.createElement("span");
  var bodySpan = document.getElementsByTagName("span").item(0);
  if(typeof result.max!="undefined"){
    max = result.max;
  }
  else{
    chrome.storage.local.set({"max":30});
  }
  bodySpan.innerHTML = ("Max : "+max);
  bodySpan.appendChild(span);
});

chrome.storage.local.get("array",function(result){

  if(typeof result.array != "undefined"){
    array=result.array;
    chrome.storage.local.get("array",function(result){
      if(count>max){
      var dif =count-max;
      result.array.splice(0,dif);
      array=result.array;
      chrome.storage.local.set({"array":result.array});
      count=max;
      chrome.storage.local.set({"count":count});
    }
      for(var i=array.length-1; i>=0; i--){
        displayValue(result.array[i].title,result.array[i].url);
      }
    });
  }
});

//addボタン
document.getElementById("add").onclick = function(){
  //一旦全部表示消す
  displayClear();
  //再表示
  chrome.tabs.getSelected(null,function(tab){
    title = tab.title;
    url = tab.url;
    //tabオブジェクトを格納
    array[count]=tab;

    if(count==max)
    array.splice(0,1);
    else 
    count++;
    
    chrome.storage.local.set({"array":array});
    chrome.storage.local.get("array",function(result){
      for(var i=array.length-1; i>=0; i--){
        displayValue(result.array[i].title,result.array[i].url);
      }
    });
    chrome.storage.local.set({"count":count});
  });

};

//clearボタン
document.getElementById("clear").onclick = function(){
  var temp;
  chrome.storage.local.get("max",function(result){
    temp=result.max;
    chrome.storage.local.clear();
    chrome.storage.local.set({"max":temp});
  })
  count=0;
  array.length=0;
  displayClear();
};

//optionボタン
document.getElementById("option").onclick = function(){
  chrome.tabs.create({url:"chrome-extension://eojhlpkifpijikpjpakcdklflnkohjnb/option/options.html"});
};

function displayValue(str,url){
  var ele = document.createElement("li");
  var a = document.createElement("a");
  a.onclick = function(){
    chrome.tabs.create({url:url});
  };
  
  a.href=url;
  var body = document.getElementsByTagName("ol").item(0);
  a.innerHTML = str;
  a.href=url;
  a.style.textDecoration="none";
  
  ele.id="newlist";
  ele.style.margin="4px";
  ele.appendChild(a);
  body.appendChild(ele);	
}
function displayClear(){
  //olの子ノードを全部消す
  var body = document.getElementsByTagName("ol").item(0)
  var child;
  while(child=body.lastChild)
  body.removeChild(child);
}
