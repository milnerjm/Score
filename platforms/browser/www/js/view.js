var view = {
  home: "<div class='home'><h1>Score!</h1>"+
        "<img src='img/die.png' class='img' onclick='app.new()'></div>",

  new:  "<div id='players'><div id='p1'>"+
        "</i><input type='text' id='player1' placeholder='Name'/></div></div>"+
        "<br/><i onclick='app.add()' class='fa fa-plus fa-2x blue'></i>"+
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
        "<i class='fa fa-arrow-right fa-2x green' onclick='app.score()'></i>",

  add: function(i){
    var input = makeE("input");
    input.type = "text";
    input.id = "player"+i;
    input.placeholder = "Name";
    return input;
  },

  load: "<h1>Load Previous Game</h1>",

  score: function(players){
    var html = "<table class='centered'>";
    for (var i = 0; i < players.length; i++) {
      html += "<tr><td class='big bold'id='nameP"+i+"'>"+players[i]+
              "</td><td class='fixedwidth big bold' id='scoreP"+i+"'>0</td>"+
              "<td><i class='fa fa-plus fa-3x green' id='plusP"+i+"' onclick='app.plus(this)'>"+
              "</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
              "<i class='fa fa-minus fa-3x red' id='minusP"+i+"' onclick='app.minus(this)'>"+
              "</i></td></tr>";
    }
    html += "</table>";
    return html;
  },

  roll: "<h1>Roll the Dice!</h1>"
};