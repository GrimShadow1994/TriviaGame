$(document).ready(function () {
    var options = [
        {
            question: "Which Star Wars movie was filmed entirely in the studio?",
            choice: ["Revenge of the Sith", "Return of the Jedi", "Star Wars", "Attack of the Clones"],
            answer: 0,
        },
        {
            question: "Which of the three main heroes (Luke, Leia, and Han Solo) in the first Star Wars trilogy refused to sign a three picture deal?",
            choice: ["Mark Hamill", "Harrison Ford", "Carrie Fisher", "They All Signed"],
            answer: 1,
        },
        {
            question: "What color is Mace Windu's lightsaber?",
            choice: ["Black", "Blue", "Purple", "Green"],
            answer: 2,
        },
        {
            question: '"The Star Wars Holiday Special" marked the first appearance of which Star Wars character?',
            choice: ["Jabba the Hut", "Boba Fett", "Jar Jar Binks", "Lando Calrissian"],
            answer: 1,
        },
        {
            question: "What actor pulled out of Episode III: Revenge of the Sith when he discovered that non-union actors were being used in the film?",
            choice: ["George Clooney", "Gary Coleman", "Mel Gibson", "Gary Oldman"],
            answer: 3,
        },
        {
            question: "Who is the only non Jedi in the original Star Wars trilogy to use a lightsaber?",
            choice: ["Chewbacca", "R2-D2", "Princess Leia", "Han Solo"],
            answer: 3,
        },
        {
            question: "What character did George Lucas consider making a midget?",
            choice: ["Jar Jar Binks", "Chewbacca", "Luke Skywalker", "Princess Leia"],
            answer: 2,
        },
        {
            question: "Approximately how many languages can C-3PO speak?",
            choice: ["6 Trillion", "6 Million", "6 Thousand", "6 Billion"],
            answer: 1,
        }];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    $("#reset").hide();
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    function displayQuestion() {
        index = Math.floor(Math.random() * options.length);
        pick = options[index];
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
        }
        $(".answerchoice").on("click", function () {
            userGuess = parseInt($(this).attr("data-guessvalue"));
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();
            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }
    function hidepicture() {
        newArray.push(pick);
        options.splice(index, 1);
        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 20;
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;
            } else {
                runTimer();
                displayQuestion();
            }
        }, 3000);
    }
    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    })
})
