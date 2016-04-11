function $(id){
  return document.getElementById(id);
}
function makeE(elem){
  return document.createElement(elem);
}
function makeT(txt){
  return document.createTextNode(txt);
}

var storage = window.localStorage;

function printObj(obj){
    var len = obj.length;
    var out = "";
    for(var i in obj){
        out += i + ": " + obj[i] + "\n";
    }
    alert(out);
    return null;
}

function saveLog(file){
  var objF = JSON.parse(storage.getItem(file));
  var objL = JSON.parse(storage.getItem("saveFiles"));
  var outF = "\n" + file;
  var outL = "\n******Files*********";
  for(var i in objF){
    outF += "\n" + i + ": " + objF[i];
  }
  for (var i=0; i!==objL.length; i++) {
    outL += "\n" + objL[i];
  }
  outL += "\n********************";
  console.log(outL);
  console.log(outF);
}

var app = {
  init: function(){
    $("content").innerHTML = view.home;
    if(!storage.getItem("saveFiles")){
      var list = [];
      storage.setItem("saveFiles", JSON.stringify(list));
    }
  },
  onBackKey: function(){
    var isHome = document.getElementsByClassName("home").length;
    if(isHome){
      navigator.app.exitApp();
    }else{
      $("content").innerHTML = view.home;
    }
  },

  navopen: function(){
    $("sidenav").style.width = "250px";
  },
  navclose: function(){
    $("sidenav").style.width = "0";
  },

  plus: function(e){
    var player = e.id.replace(/plusP/,"scoreP");
    app.openModal("numModal");
    $("enter1").onclick = function(){
      var num = Number($("entry").value);
      var curScore = Number($(player).textContent);
      $(player).textContent = curScore + num;
      $("numModal").style.display = "none";
    }
  },
  minus: function(e){
    var player = e.id.replace(/minusP/,"scoreP");
    app.openModal("numModal");
    $("enter1").onclick = function(){
      var num = Number($("entry").value);
      var curScore = Number($(player).textContent);
      $(player).textContent = curScore - num;
      $("numModal").style.display = "none";
    }
  },

  openModal: function(e){
    var modal = $(e);
    // Display the modal
    modal.style.display = "block";
    $("entry").value = null;
    $("entry").focus();
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  },

  home: function(){
    $("content").innerHTML = view.home;
    app.navclose();
  },
  new: function(){
    $("content").innerHTML = view.new;
    $("player1").focus();
    app.navclose();
  },
  add: function(){
    var count = $("players").lastElementChild.id.replace(/p/,"");
    var i = ++count, div = makeE("div"),
        x = makeE("i"), input = makeE("input");
    div.id = "p"+i;
    input.type = "text";
    input.id = "player"+i;
    input.placeholder = "Name";
    x.className = "fa fa-times fa-2x red btn";
    x.onclick = function(){app.remove(this)};
    $("players").appendChild(div);
    $("p"+i).appendChild(x);
    $("p"+i).appendChild(input).focus()
    app.navclose();
  },
  save: function(){
    app.navclose();
    var entries = document.getElementsByTagName("tr");
    var data = {}, saveName = "";
    app.openModal("saveModal");
    $("enter2").onclick = function(){
      saveName = $("savename").value;
      $("saveModal").style.display = "none";
      for (var i=0; i!==entries.length; i++) {
        var name = entries[i].children[0].textContent;
        var score = entries[i].children[1].textContent;
        data[name] = score;
      }
      var files = JSON.parse(storage.getItem("saveFiles"));
      var pointer = files.length++;
      storage.setItem(saveName, JSON.stringify(data));
      files[pointer] = saveName;
      storage.setItem("saveFiles", JSON.stringify(files));
      saveLog(saveName);
    }
  },
  del: function(){
    app.openModal("delModal");
    var len = $("list").children.length;
    var elems = $("list").children;
    for(var i=0; i!==len; i++) {
      $("list").removeChild($("list").elems[i]);
    }
    var files = JSON.parse(storage.getItem("saveFiles"));
    for(var i=0; i!==files.length; i++){
      var eLI = makeE("li"), eA = makeE("a"), txt = makeT(files[i]);
      eA.href = "javascript:app.remove("+files[i]+")";
      $("list").appendChild(eLI).appendChild(eA).appendChild(txt);
    }
  },
  remove: function(file){
    storage.removeItem(file);
    app.del();
  },
  load: function(){
    $("content").innerHTML = view.load;
    app.navclose();
  },
  score: function(){
    var players = $("players").getElementsByTagName("input");
    var arr = [];
    for (var i = 0; i < players.length; i++) {
      arr[i] = players[i].value;
    }
    $("content").innerHTML = view.score(arr);
    app.navclose();
  },
  roll: function(){
    $("content").innerHTML = view.roll;
    app.navclose();
  }
};