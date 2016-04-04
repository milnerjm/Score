function $(id){
  return document.getElementById(id);
}
function make(name){
  return document.createElement(name);
}

var app = {
  init: function(){
    $("content").innerHTML = view.home;
  },
  onBackKey: function(){
    var isHome = document.getElementsByClassName("home").length;
    if(isHome){
      navigator.app.exitApp();
    }else{
      $("content").innerHTML = view.home;
    }
  },
  new: function(){
    $("content").innerHTML = view.new;
    app.navclose();
  },
  add: function(){
    var count = $("players").lastElementChild.id.replace(/p/,"");
    var i = ++count, br = make("br"), div = make("div"), x = make("i");
    div.id = "p"+i;
    x.className = "fa fa-times fa-2x red btn";
    x.onclick = function(){app.remove(this)};
    $("players").appendChild(div);
    $("p"+i).appendChild(br);
    $("p"+i).appendChild(x);
    $("p"+i).appendChild(view.add(i)).focus();
    app.navclose();
  },
  remove: function(e){
    var elemid = e.parentElement.id;
    $("players").removeChild($(elemid));
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
  },
  navopen: function(){
    $("sidenav").style.width = "250px";
  },
  navclose: function(){
    $("sidenav").style.width = "0";
  },
  plus: function(e){
    var player = e.id.replace(/plusP/,"scoreP");
    app.openNumModal();
    $("enter").onclick = function(){
      var num = Number($("entry").value);
      var curScore = Number($(player).textContent);
      $(player).textContent = curScore + num;
      $("numModal").style.display = "none";
    }
  },
  minus: function(e){
    var player = e.id.replace(/minusP/,"scoreP");
    app.openNumModal();
    $("enter").onclick = function(){
      var num = Number($("entry").value);
      var curScore = Number($(player).textContent);
      $(player).textContent = curScore - num;
      $("numModal").style.display = "none";
    }
  },
  openNumModal: function(){
    var modal = $("numModal");
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
  }
};

var view = {
  home: "<div class='home'><h1>Score!</h1>"+
        "<img src='img/die.png' class='img' onclick='app.new()'></div>",

  new:  "<div id='players'><div id='p1'>"+
        "</i><input type='text' id='player1' placeholder='Name'/></div></div>"+
        "<br/><i onclick='app.add()' class='fa fa-plus fa-2x blue'></i>"+
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
        "<i class='fa fa-arrow-right fa-2x green' onclick='app.score()'></i>",

  add: function(i){
    var input = make("input");
    input.type = "text";
    input.id = "player"+i;
    input.placeholder = "Name";
    return input;
  },

  load: "<h1>Load Previous Game</h1>",

  score: function(players){
    var html = "<table class='centered'>";
    for (var i = 0; i < players.length; i++) {
      html += "<tr><td class='big bold'>"+players[i]+
              "</td><td class='fixedwidth big bold' id='scoreP"+i+"'>0</td>"+
              "<td><i class='fa fa-plus fa-3x green' id='plusP"+i+"' onclick='app.plus(this)'>"+
              "</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
              "<i class='fa fa-minus fa-3x red' id='minusP"+i+"' onclick='app.minus(this)'>"+
              "</i></td></tr>";
    }
    return html;
  },

  roll: "<h1>Roll the Dice!</h1>",

  numModal: ""
};