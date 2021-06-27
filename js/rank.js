const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  slidesPerView: 1,

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
    hide: true,
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});

$(document).on("click", '#city-button-rank', function (event) {
  document.querySelector("#work-rank .rank-mid").innerHTML = ""
  document.querySelector("#love-rank .rank-mid").innerHTML = ""
  document.querySelector("#food-rank .rank-mid").innerHTML = ""
  document.querySelector("#activity-rank .rank-mid").innerHTML = ""
  document.querySelector("#travel-rank .rank-mid").innerHTML = ""
  document.querySelector("#social-rank .rank-mid").innerHTML = ""
  document.querySelector("#total-rank .rank-mid").innerHTML = ""
  $.post("./mypage-record", function (data) {
    
    let myname = data.name
    $.post('./leaderboard', {
      category: '1'
    },
      function (rankdata) {
        for (let i = 0; i < rankdata.length; i++) {
          let firstrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/first.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let secondrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/second.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let thirdrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/third.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let otherrank = "<div class='rank-block'><div class='rank-block-order'>" + (i + 1) + "</div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          if (rankdata[i][0] == myname) {
            document.querySelector("#work-rank .myrank-score").innerHTML = i + 1
            document.querySelector("#work-rank .myscore-score").innerHTML = rankdata[i][1]
          }
          if (i == 0) {
            $("#work-rank .rank-mid").append(firstrank)
          } else if (i == 1) {
            $("#work-rank .rank-mid").append(secondrank)
          } else if (i == 2) {
            $("#work-rank .rank-mid").append(thirdrank)
          } else {
            $("#work-rank .rank-mid").append(otherrank)
          }
        }
      });
    $.post('./leaderboard', {
      category: '2'
    },
      function (rankdata) {
        for (let i = 0; i < rankdata.length; i++) {
          let firstrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/first.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let secondrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/second.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let thirdrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/third.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let otherrank = "<div class='rank-block'><div class='rank-block-order'>" + (i + 1) + "</div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          if (rankdata[i][0] == myname) {
            document.querySelector("#love-rank .myrank-score").innerHTML = i + 1
            document.querySelector("#love-rank .myscore-score").innerHTML = rankdata[i][1]
          }
          if (i == 0) {
            $("#love-rank .rank-mid").append(firstrank)
          } else if (i == 1) {
            $("#love-rank .rank-mid").append(secondrank)
          } else if (i == 2) {
            $("#love-rank .rank-mid").append(thirdrank)
          } else {
            $("#love-rank .rank-mid").append(otherrank)
          }
        }
      });
    $.post('./leaderboard', {
      category: '3'
    },
      function (rankdata) {
        for (let i = 0; i < rankdata.length; i++) {
          let firstrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/first.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let secondrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/second.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let thirdrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/third.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let otherrank = "<div class='rank-block'><div class='rank-block-order'>" + (i + 1) + "</div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          if (rankdata[i][0] == myname) {
            document.querySelector("#food-rank .myrank-score").innerHTML = i + 1
            document.querySelector("#food-rank .myscore-score").innerHTML = rankdata[i][1]
          }
          if (i == 0) {
            $("#food-rank .rank-mid").append(firstrank)
          } else if (i == 1) {
            $("#food-rank .rank-mid").append(secondrank)
          } else if (i == 2) {
            $("#food-rank .rank-mid").append(thirdrank)
          } else {
            $("#food-rank .rank-mid").append(otherrank)
          }
        }
      });
    $.post('./leaderboard', {
      category: '4'
    },
      function (rankdata) {
        for (let i = 0; i < rankdata.length; i++) {
          let firstrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/first.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let secondrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/second.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let thirdrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/third.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let otherrank = "<div class='rank-block'><div class='rank-block-order'>" + (i + 1) + "</div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          if (rankdata[i][0] == myname) {
            document.querySelector("#activity-rank .myrank-score").innerHTML = i + 1
            document.querySelector("#activity-rank .myscore-score").innerHTML = rankdata[i][1]
          }
          if (i == 0) {
            $("#activity-rank .rank-mid").append(firstrank)
          } else if (i == 1) {
            $("#activity-rank .rank-mid").append(secondrank)
          } else if (i == 2) {
            $("#activity-rank .rank-mid").append(thirdrank)
          } else {
            $("#activity-rank .rank-mid").append(otherrank)
          }
        }
      });
    $.post('./leaderboard', {
      category: '5'
    },
      function (rankdata) {
        for (let i = 0; i < rankdata.length; i++) {
          let firstrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/first.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let secondrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/second.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let thirdrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/third.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let otherrank = "<div class='rank-block'><div class='rank-block-order'>" + (i + 1) + "</div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          if (rankdata[i][0] == myname) {
            document.querySelector("#travel-rank .myrank-score").innerHTML = i + 1
            document.querySelector("#travel-rank .myscore-score").innerHTML = rankdata[i][1]
          }
          if (i == 0) {
            $("#travel-rank .rank-mid").append(firstrank)
          } else if (i == 1) {
            $("#travel-rank .rank-mid").append(secondrank)
          } else if (i == 2) {
            $("#travel-rank .rank-mid").append(thirdrank)
          } else {
            $("#travel-rank .rank-mid").append(otherrank)
          }
        }
      });
    $.post('./leaderboard', {
      category: '6'
    },
      function (rankdata) {
        for (let i = 0; i < rankdata.length; i++) {
          let firstrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/first.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let secondrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/second.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let thirdrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/third.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let otherrank = "<div class='rank-block'><div class='rank-block-order'>" + (i + 1) + "</div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          if (rankdata[i][0] == myname) {
            document.querySelector("#social-rank .myrank-score").innerHTML = i + 1
            document.querySelector("#social-rank .myscore-score").innerHTML = rankdata[i][1]
          }
          if (i == 0) {
            $("#social-rank .rank-mid").append(firstrank)
          } else if (i == 1) {
            $("#social-rank .rank-mid").append(secondrank)
          } else if (i == 2) {
            $("#social-rank .rank-mid").append(thirdrank)
          } else {
            $("#social-rank .rank-mid").append(otherrank)
          }
        }
      });
    $.post('./leaderboard', {
      category: '7'
    },
      function (rankdata) {
        for (let i = 0; i < rankdata.length; i++) {
          let firstrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/first.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let secondrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/second.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let thirdrank = "<div class='rank-block'><div class='rank-block-order'><img src='../resources/update/third.png'></div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          let otherrank = "<div class='rank-block'><div class='rank-block-order'>" + (i + 1) + "</div><img class='rank-block-header'src='" + rankdata[i][2] + "'><div class='rank-block-name'>" + rankdata[i][0] + "</div><div class='rank-block-score'>" + rankdata[i][1] + "</div></div>"
          if (rankdata[i][0] == myname) {
            document.querySelector("#total-rank .myrank-score").innerHTML = i + 1
            document.querySelector("#total-rank .myscore-score").innerHTML = rankdata[i][1]
          }
          if (i == 0) {
            $("#total-rank .rank-mid").append(firstrank)
          } else if (i == 1) {
            $("#total-rank .rank-mid").append(secondrank)
          } else if (i == 2) {
            $("#total-rank .rank-mid").append(thirdrank)
          } else {
            $("#total-rank .rank-mid").append(otherrank)
          }
        }
      });
  })

})
