/**
 * @author Clayton
 */

function showTable(){
	productTable.style.display = ""
}



var productTable = document.getElementById("productTable");
var sel = document.getElementById("productSelect");
sel.addEventListener("change",showTable);
