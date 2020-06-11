$(document).ready(function(){
    // GLOBAL VARIABLES ========================================
    var timer = 60;
    var timeId;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;
  
    // FUNCTIONS ===============================================
  
    //Check Answers
    function checkAnswers (){
      for (var q = 1; q <= 10; q++){
        for (var a = 1; a <= 3; a++){
          var answerValue = document.getElementById("inlineRadio" + a+ "-q" + q).value;
          var answerChecked = document.getElementById("inlineRadio" + a+ "-q" + q).checked;
          if ((answerValue == "correct") && (answerChecked == true)){
            correctAnswers++;
          }
          if ((answerValue == "incorrect") && (answerChecked == true)){
            incorrectAnswers++;
          }
        }
        unanswered = 10 - (incorrectAnswers + correctAnswers);
        $("#stats-container").show();
        $("#number-correct").text("CORRECT: " + correctAnswers);
        $("#number-incorrect").text("INCORRECT: " + incorrectAnswers);
        $("#number-unanswered").text("UNANSWERED: " + unanswered);
      }
    };
  
    //Timer 
    $("#timer").text("0:00")
    $(".question-container").hide();
    $(".timer-container").hide();
    $("#done").hide();
    $("#stats-container").hide();
    $("#tagline").show();
  
    $("#play").on("click",function(){
      function startTimer(){
        clearInterval(timeId);
        timeId = setInterval(decrement, 1000);
      };
      function decrement(){
        timer--;
        //console.log(timer);
        var converted = timeConverter(timer);
        $("#timer").text(converted);
        if (timer == -1) {
          stopTimer();
          alert("Time is up");
          $(".question-container").hide();
          $(".timer-container").hide();
          $("#done").hide();
          checkAnswers();
        }
      };
      function timeConverter(t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        if (minutes === 0) {
          minutes = "0";
        }
        return minutes + ":" + seconds;
      }
      function stopTimer() {
        clearInterval(timeId);
      }
      $(".question-container").show();
      $(".timer-container").show();
      $("#play").hide();
      $("#done").show();
      $("#tagline").hide();
      startTimer();
      
    
      $("#done").on("click",function(){
        clearInterval(timeId);
        $(".timer-container").hide();
        $(".question-container").hide();
        $("#done").hide();
        checkAnswers();
      })
    });
  
  });