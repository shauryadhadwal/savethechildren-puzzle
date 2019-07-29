window.onload = function () {
    var grid = [
          //0    1    2    3    4    5    6    7    8    9   10   11   12   13    14  15
    /*0*/['0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    /*2*/['0', '0', '0', '1', '0', '2', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    /*1*/['0', '0', '3', '3,1', '3', '3,2', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    /*3*/['0', '0', '0', '1', '0', '4,2', '4', '4', '0','0','5','0', '0', '0', '0', '0'],
    /*4*/['0', '0', '0', '1', '0', '0', '0', '0', '6', '6', '5,6', '0', '0', '0', '0', '0'],
    /*5*/['0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '5', '0', '0', '0', '0', '0'],
    /*6*/['7', '7', '7', '7,1', '7', '7', '7', '7', '7', '7','7.5','7', '7', '0', '0', '0'],
    /*7*/['0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '5', '0', '0', '0', '0', '0'],
    /*8*/['0', '0', '0', '0', '0', '8', '8', '8', '8', '8', '5,8', '8', '8', '8', '8', '0'],
    /*9*/['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '5', '0', '0', '0', '0', '0'],
    /*10*/['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '5', '0', '0', '0', '0', '0'],
    /*11*/['0', '0', '0', '0', '0', '0', '9', '9', '9', '9', '5,9', '0', '0', '0', '0', '0'],
    /*12*/['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '5', '0', '0', '0', '0', '0'],
    /*13*/['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '5', '0', '0', '0', '0', '0'],
    /*14*/['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '5', '0', '0', '0', '0', '0'],
    /*15*/['0', '0', '0', '10', '10', '10', '10', '10', '10', '10', '5,10', '0', '0', '0', '0', '0'],
    /*16*/['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ];

    var clues = [
        "The 20th day of this month is celebrated as International Child rights day.",
        "The convention emphasising on basic rights for children adopted by the UN on 20 November 1989.",
        "The Convention of the Rights of the Child has 53 Articles categorised under _________ groups of rights.",
        "This is the name of a prominent non-governmental organisation working for the Rights of Children which is based out of India.",
        "This category of Rights has given access to children to play active role in their communities and nations .",
        "A popular democracy which is yet to ratify the CRC.",
        "The Right to ________ entitles a child to holistic mental and physical growth and development.",
        "Category of child rights that mandates children be safeguarded against all forms of abuse, neglect and exploitation.",
        "This nation ratified the UNCRC in 1992.",
        "One gets a license and another gets the right to vote but for children at this age and below is what defines them."
    ];

    var answers = [
        "NOVEMBER",
        "CRC",
        "FOUR",
        "CRY",
        "PARTICIPATION",
        "USA",
        "DEVELOPMENTAL",
        "PROTECTION",
        "INDIA",
        "EIGHTEEN"
    ];

    //Draw grid
    $.each(grid, function (i) {
        var row = $('<tr></tr>');
        $.each(this, function (j) {
            if (this == '0') {
                $(row).append('<td class="square empty"></td>');
            }
            else {
                var question_number = String(grid[i][j]).split(",");

                var starting_number = '';
                var question_number_span = '';

                for (var k = 0; k < question_number.length; k++) {
                    var direction = get_direction(question_number[k]);
                    var startpos = get_startpos(question_number[k], direction);

                    if (direction == "horizontal" && startpos[0] == i && startpos[1] == j) {
                        starting_number += question_number[k] + ",";

                    }
                    else if (direction == "vertical" && startpos[0] == j && startpos[1] == i) {
                        starting_number += question_number[k] + ",";
                    }

                }
                if (starting_number != "") {
                    question_number_span = '<span class="question_number">' + starting_number.replace(/(^,)|(,$)/g, "") + '</span>';
                }

                $(row).append('<td>' + question_number_span + '<div class="square letter" data-number="' + this + '" contenteditable="true"></div></td>');
            }
        });
        $("#puzzle").append(row);
    });

    //Draw hints
    var vertical_hints = $('<div id="vertical_hints"></div>');
    var horizontal_hints = $('<div id="horizontal_hints"></div>');
    $.each(clues, function (index) {

        var direction = get_direction(index + 1);

        if (direction == "horizontal") {
            $(horizontal_hints).append('<div class="hint"><b>' + (index + 1) + '</b>.-' + clues[index] + '</hint>');
        }
        else if (direction == "vertical") {
            $(vertical_hints).append('<div class="hint"><b>' + (index + 1) + '</b>.-' + clues[index] + '</hint>');
        }
    });
    $("#vertical_hints_container").append(vertical_hints);
    $("#horizontal_hints_container").append(horizontal_hints);

    $(".letter").keyup(function () {
        var this_text = $(this).text().toUpperCase();
        if (this_text.length > 1) {
            $(this).text(this_text[this_text.length-1]);
        }
    });

    $(".letter").click(function () {
        document.execCommand('selectAll', false, null);

        $(".letter").removeClass("active");
        $(this).addClass("active");

        $(".hint").css("color", "initial");

        var question_numbers = String($(this).data("number")).split(",");

        $.each(question_numbers, function () {
            $("#hints .hint:nth-child(" + this + ")").css("color", "red");
        });
    });

    $("#solve").click(function () {
        if (!$(".letter.active").length)
            return;
        var question_numbers = String($(".letter.active").data("number")).split(",");
        $.each(question_numbers, function () {
            fillAnswer(this);
        });
    });

    $("#clear_all").click(function () {
        if (!$(".letter.active").length)
            return;
        var question_numbers = String($(".letter.active").data("number")).split(",");
        $.each(question_numbers, function () {
            clearAnswer(this);
        });
    });

    $("#check").click(function () {
        $("#puzzle td div").css("color", "initial");
        for (var i = 0; i < answers.length; i++) {
            checkAnswer(i + 1);
        }
    });

    $("#clue").click(function () {
        if (!$(".letter.active").length)
            return;
        var question_numbers = String($(".letter.active").data("number")).split(",");
        showClue(question_numbers[0], $(".letter.active").parent().index(), $(".letter.active").parent().parent().index());
    });

    function get_direction(question_number) {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                if (String(grid[i][j]).indexOf(question_number) != -1) {
                    if (grid[i + 1][j] == question_number || (i == 0 ? false : grid[i - 1][j] == question_number)) {
                        return "vertical";
                    }

                    if (grid[i][j + 1] == question_number || (j == 0 ? false : grid[i][j - 1] == question_number)) {
                        return "horizontal";
                    }
                }
            }
        }
    }

    function get_startpos(question_number, direction) {
        if (direction == "horizontal") {
            for (var i = 0; i < grid.length; i++) {
                for (var j = 0; j < grid[i].length; j++) {
                    if (String(grid[i][j]).indexOf(question_number) != -1) {
                        return [i, j];
                    }
                }
            }
        }

        else if (direction == "vertical") {
            for (var i = 0; i < grid.length; i++) {
                for (var j = 0; j < grid[i].length - 1; j++) {
                    if (grid[j][i].indexOf(question_number) != -1) {
                        return [i, j];
                    }
                }
            }
        }
    }

    function fillAnswer(question_number) {
        $("#puzzle td div").css("color", "initial");

        var question_answer = answers[question_number - 1];
        var direction = get_direction(question_number);
        var startpos = get_startpos(question_number, direction);
        var answer_letters = question_answer.split("");

        if (direction == "horizontal") {
            for (var i = 0; i < answer_letters.length; i++) {
                $("#puzzle tr:nth-child(" + (startpos[0] + 1) + ") td:nth-child(" + (startpos[1] + 1 + i) + ") div").text(answer_letters[i]);
            }

        }
        else if (direction == "vertical") {
            for (var i = 0; i < answer_letters.length; i++) {
                $("#puzzle tr:nth-child(" + (startpos[1] + 1 + i) + ") td:nth-child(" + (startpos[0] + 1) + ") div").text(answer_letters[i]);
            }

        }
    }

    function clearAnswer(question_number) {
        $("#puzzle td div").css("color", "initial");

        var question_answer = answers[question_number - 1];
        var direction = get_direction(question_number);
        var startpos = get_startpos(question_number, direction);
        var answer_letters = question_answer.split("");

        if (direction == "horizontal") {
            for (var i = 0; i < answer_letters.length; i++) {
                $("#puzzle tr:nth-child(" + (startpos[0] + 1) + ") td:nth-child(" + (startpos[1] + 1 + i) + ") div").text('');
            }

        }
        else if (direction == "vertical") {
            for (var i = 0; i < answer_letters.length; i++) {
                $("#puzzle tr:nth-child(" + (startpos[1] + 1 + i) + ") td:nth-child(" + (startpos[0] + 1) + ") div").text('');
            }

        }
    }

    function checkAnswer(question_number) {
        var question_answer = answers[question_number - 1];
        var direction = get_direction(question_number);
        var startpos = get_startpos(question_number, direction);
        var answer_letters = question_answer.split("");

        if (direction == "horizontal") {
            for (var i = 0; i < answer_letters.length; i++) {
                if ($("#puzzle tr:nth-child(" + (startpos[0] + 1) + ") td:nth-child(" + (startpos[1] + 1 + i) + ") div").text() != question_answer[i] && $("#puzzle tr:nth-child(" + (startpos[0] + 1) + ") td:nth-child(" + (startpos[1] + 1 + i) + ") div").text() != "") {
                    $("#puzzle tr:nth-child(" + (startpos[0] + 1) + ") td:nth-child(" + (startpos[1] + 1 + i) + ") div").css("color", "red");
                }
            }

        }
        else if (direction == "vertical") {
            for (var i = 0; i < answer_letters.length; i++) {
                if ($("#puzzle tr:nth-child(" + (startpos[1] + 1 + i) + ") td:nth-child(" + (startpos[0] + 1) + ") div").text() != question_answer[i] && $("#puzzle tr:nth-child(" + (startpos[1] + 1 + i) + ") td:nth-child(" + (startpos[0] + 1) + ") div").text() != "") {
                    $("#puzzle tr:nth-child(" + (startpos[1] + 1 + i) + ") td:nth-child(" + (startpos[0] + 1) + ") div").css("color", "red");
                }
            }

        }
    }

    function showClue(question_number, i, j) {
        var question_answer = answers[question_number - 1];
        var direction = get_direction(question_number);
        var startpos = get_startpos(question_number, direction);
        var answer_letters = question_answer.split("");

        if (direction == "horizontal") {
            $("#puzzle tr:nth-child(" + (j + 1) + ") td:nth-child(" + (i + 1) + ") div").text(answer_letters[i - startpos[1]]).css("color", "initial");
        }
        else if (direction == "vertical") {
            $("#puzzle tr:nth-child(" + (j + 1) + ") td:nth-child(" + (i + 1) + ") div").text(answer_letters[j - startpos[1]]).css("color", "initial");
        }
    }
































}































