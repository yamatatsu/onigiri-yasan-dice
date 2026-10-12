/* おにぎり屋さんダイス
 * 6面のうち、どの面を正面に向けるかで結果を表示する。
 * 面の配置（styles.css の .face--* の transform）と、
 * その面を正面に持ってくるための回転角（x, y）を対応させている。
 */
(function () {
  "use strict";

  var cube = document.getElementById("cube");
  var rollBtn = document.getElementById("roll");
  var resultEl = document.getElementById("result");
  var resultLabel = resultEl.querySelector(".result-label");

  // x, y は「その面を正面に向けるためのキューブの回転角（度）」
  var FACES = [
    { x: 0,   y: 0,   label: "仕入れ",       kind: "stock" }, // front
    { x: 0,   y: 180, label: "仕入れ",       kind: "stock" }, // back
    { x: 0,   y: -90, label: "仕入れ(+1枚)", kind: "plus"  }, // right
    { x: 0,   y: 90,  label: "仕入れ(-1枚)", kind: "minus" }, // left
    { x: -90, y: 0,   label: "開店",         kind: "open"  }, // top
    { x: 90,  y: 0,   label: "開店",         kind: "open"  }  // bottom
  ];

  var SPIN_TURNS = 2;   // 1回の抽選で最低何回転させるか
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SPIN_MS = reduceMotion ? 400 : 1500; // .cube の transition と合わせる

  var curX = 0;
  var curY = 0;
  var rolling = false;

  // current より大きく、かつ target と 360 度単位で同じ角度で最小のものを返す
  function snapUp(current, target, turns) {
    var min = current + 360 * turns;
    var k = Math.ceil((min - target) / 360);
    return target + 360 * k;
  }

  function vibrate(pattern) {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }

  function roll() {
    if (rolling) return;
    rolling = true;
    rollBtn.disabled = true;

    resultEl.dataset.kind = "";
    resultEl.classList.remove("pop");
    resultLabel.textContent = "…";

    var face = FACES[Math.floor(Math.random() * FACES.length)];

    curX = snapUp(curX, face.x, SPIN_TURNS);
    curY = snapUp(curY, face.y, SPIN_TURNS);
    cube.style.transform = "rotateX(" + curX + "deg) rotateY(" + curY + "deg)";

    vibrate(15);

    window.setTimeout(function () {
      rolling = false;
      rollBtn.disabled = false;

      resultEl.dataset.kind = face.kind;
      resultLabel.textContent = face.label;

      // アニメーションを再生し直す
      resultEl.classList.remove("pop");
      void resultEl.offsetWidth;
      resultEl.classList.add("pop");

      vibrate(35);
    }, SPIN_MS);
  }

  rollBtn.addEventListener("click", roll);

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./sw.js").catch(function () {
        /* オフライン対応はベストエフォート */
      });
    });
  }
})();
