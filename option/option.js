var max = document.getElementsByName("max");

document.getElementById("save").onclick = function(){
	for(i=0;i<10;i++){
		if(max[i].checked){
			chrome.storage.local.set({"max":max[i].value})
				alert("Save has been successfully finished.\nMax : "+max[i].value);
			return;
		}
		
		if(i==9)
		alert("Nothing is selected.");
	}
};