function inFrame () {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

function usingFirefox(){
  return navigator.userAgent.indexOf("Firefox") != -1;
}

var redirectSite = "https://www.google.com";

function openBackup(){
  var tab = window.open('about:blank', '_blank');
  tab.document.documentElement.innerHTML = '<!DOCTYPE html><html><head><title>Classes</title><link rel="icon" type="image/png" href="https://ssl.gstatic.com/classroom/favicon.png"><style>body {margin:0;overflow:hidden}</style></head><body><iframe width="100%" height="100%" src="' + window.location.href + '" frameborder="0"></iframe></body></html>';
  tab.document.close();
  
  window.location.replace(redirectSite);
}

if( window.location.pathname == "/"){
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  if(params.url){
    var frameUrl = params.url;
    if(params.url.startsWith("/gams")){
      frameUrl = "/g" + frameUrl.substring(5);
    }
    document.querySelector(".frame").src = window.location.origin + frameUrl;
  }
  if(params.gams = "true"){
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "white";
  }

  if(inFrame() != true && usingFirefox() != true){
    document.querySelector(".warning").style.display = "flex";
    document.querySelector(".tosMsg").style.userSelect = "none";
    document.onclick = () => {openBackup()};
    document.onmousedown = () => {openBackup()};
    document.onkeypress = () => {openBackup()};
    //document.onkeydown = () => {openBackup()};
  }
}
