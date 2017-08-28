var Local = function () {
  // 游戏对象
  var game;

  // 时间间隔
  var INTERVAL = 300;

  // 定时器
  var timer = null;

  // 时间计数器
  var time = 0;
  var timeCount = 0;

  // 绑定键盘事件
  var bindKeyEvent = function () {
    document.onkeydown = function (e) {
      if (e.keyCode == 38) { // up
        game.rotate();
      } else if (e.keyCode == 39) { // right
        game.right();
      } else if (e.keyCode == 40) { // down
        game.down();
      } else if (e.keyCode == 37) { // left
        game.left();
      } else if (e.keyCode == 32) { // space
        game.fall();
      }
    }
  }

  // 屏幕按钮事件
  var bindClickEvent = function () {
    document.onclick = function (e) {
      var target = e.target.getAttribute("id")
      if (target === "up") {
        game.rotate();
      } else if (target === "right") {
        game.right();
      } else if (target === "down") {
        game.down();
      } else if (target === "left") {
        game.left();
      } else if (target === "fall") {
        game.fall();
      } else if (target === "newGame") {
        location.reload();
        // document.getElementById("gameover").innerText = "";
        // document.getElementById("time").innerText = "0";
        // document.getElementById("score").innerText = "0";
        // stop();
        // time = 0;
        // start();
      }
    }
  }

  // 移动
  var move = function () {
    timeFunc();
    if (!game.down()) {
      game.fixed();
      var line = game.checkClear();
      if (line) {
        game.addScore(line);
      }
      var gameOver = game.checkGameOver();
      if (gameOver) {
        game.onGameOver(false);
        stop();
      } else {
        game.performNext(generateType(), generateDir());
      }
    }
  }
  // 随机生成干扰行
  var generateBotLine = function (lineNum) {
    var lines = [];
    for (var i = 0; i < lineNum; i++) {
      var line = [];
      for (var j = 0; j < 10; j++) {
        line.push(Math.ceil(Math.random() * 2) - 1); // 生成 0 1 随机数
      }
      lines.push(line);
    }
    return lines;
  }
  // 计时函数
  var timeFunc = function () {
    timeCount += 1;
    if (timeCount == 5) {
      timeCount = 0;
      time += 1;
      game.setTime(time);
      if (time % 15 == 0) {
        game.addBotLine(generateBotLine(1));
      }
    }
  }
  // 随机生成一个方块种类
  var generateType = function () {
    return Math.ceil(Math.random() * 7) - 1;
  }
  // 随机生成一个旋转次数
  var generateDir = function () {
    return Math.ceil(Math.random() * 4) - 1;
  }
  // 结束
  var stop = function () {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    document.onkeydown = null;
  }
  // 开始
  var start = function () {
    var doms = {
      gameDiv: document.getElementById('game'),
      nextDiv: document.getElementById('next'),
      timeDiv: document.getElementById('time'),
      scoreDiv: document.getElementById('score'),
      resultDiv: document.getElementById('gameover'),
    }
    game = new Game();
    game.init(doms, generateType(), generateDir());
    bindKeyEvent();
    bindClickEvent();
    game.performNext(generateType(), generateDir());
    timer = setInterval(move, INTERVAL);
  }

  this.start = start;
}