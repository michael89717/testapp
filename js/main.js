var allQuestions = 
[{question: "1 Who is Prime Minister of the United Kingdom?", choices: ["1", "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:["0"]}, 
{question: "2 Who is Prime Minister of the United Kingdom?", choices: ["2", "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:["0"]},
{question: "3 Who is Prime Minister of the United Kingdom?", choices: ["3", "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:["0"]},
{question: "4 Who is Prime Minister of the United Kingdom?", choices: ["4", "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:["0"]},
{question: "5 Who is Prime Minister of the United Kingdom?", choices: ["5", "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:["0"]},
{question: "6 Who is Prime Minister of the United Kingdom?", choices: ["6", "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:["0"]}];

var i = 0;
var score = 0;

$(document).ready(function(){

	loadQuestions(0);
	displaceOptions(0);

	$( "input" ).on("change", function(){
	console.log("test");
	var checkboxValues = {};
	$( "input" ).each(function(){
	  checkboxValues[this.id] = this.checked;
	  console.log(checkboxValues);
	});
	$.cookie('checkboxValues', checkboxValues, { expires: 7, path: '/' });
	console.log($.cookie('checkboxValues'));
	});

	$( "#next" ).on( "click", function() {
		if ($("input:checked").length === 0){   //check if at least one option is selected.
			return alert("Please select in order to move on.") ;
		}
		countScore(i);
		 
		if (i === (allQuestions.length - 2)){
			$("ul").empty();
			$("#next").hide();
			return $("h2").replaceWith("<h2 class='result'>" + "Your total score is " +  score + "</h2>" );

		}
		i++; 
		$("ul").empty();
		loadQuestions(i);
		displaceOptions(i);
	});

	$( "#back" ).on( "click", function() {
		$("ul").empty();
		$("h2").empty();
		$("#next").show();
		loadQuestions(0);
		displaceOptions(0);
		i = 0;
		repopulateCheckboxes();

	});

});



function loadQuestions(i){
	
	$("h2").replaceWith("<h2 class='question'>" + allQuestions[i].question + "</h2>" );

}


function displaceOptions(i){
	var count = 0;
	allQuestions[i].choices.forEach(function(option){
		$("ul").append("<li class='option'><input type='checkbox' value=" + count + " " + "id=option" + count +  ">" + option + "</li></br>");
		count++;

	})
}

function varify(i){
	var selectedOptions = [];
	$("input:checked").each(function(index){selectedOptions.push(($(this).attr("value")))})
	if (selectedOptions.compare(allQuestions[i].correctAnswer)){
		return true;
	}
	else return false;
	
}


function countScore(i){	
	if (varify(i)){
		score++;
	}
	else {

	}

}










function repopulateCheckboxes(){
var checkboxValues = $.cookie('checkboxValues');
if(checkboxValues){
  Object.keys(checkboxValues).forEach(function(element) {
    var checked = checkboxValues[element];
    $("#" + element).prop('checked', checked);
  });
}
}

$.cookie.json = true;
// repopulateCheckboxes();


// ///////////
Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
