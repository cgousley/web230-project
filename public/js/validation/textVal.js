/**
 * @author Clayton G. Ousley
 * 
 * Validates Registration Form
 */

document.getElementById("submit").addEventListener("click", function(evt){
	
	// var inputs = document.querySelectorAll(".hasError"); //grabs all the inputs that have error functions
	// var num2check = inputs.length; //gets the number of errorable inputs
	// var inputs2check = []; //creates empty array to hold errorable input values
// 	
	// for (i = 0; i < num2check; i++){ //gathers all errorable inputs and places them in array
		// inputs2check.push(inputs[i].value);
	// }
// 		
	// var alerts4inputs = document.querySelectorAll(".regError"); //gathers all alert icons
// 				
	// var regex = [
		// /^[\w\d\s,!.:?"'()]+$/ig //Alpha, Num, Space, punctuation
	// ];
// 	
	// var i = 0;
// 		
	// do {//Validates all inputs against regex rules
// 		
		// if (regex[i].test(inputs2check[i])){ //if pass, alert icon remains hidden
				// alerts4inputs[i].style.display = "none";
		// }
// 	
		// else {//if fail, alert icon appears
			// evt.preventDefault();//prevents from submittal
			// alerts4inputs[i].style.display = "inline-block";
		// }
// 	
	// i++;
// 	
	// }	while (i < num2check);
	
	$('#updateMessage').modal("show");
			
	
}, false);
