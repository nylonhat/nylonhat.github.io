function toggleDisplay(ElementId) {
	var x = document.getElementById(ElementId);
	if (x.style.height === "0em") {
	  //x.style.display = "block";
	  x.style.height = "20em";
	} else {
	  //x.style.display = "none";
	  x.style.height = "0em";
	}
}


function initExpandableLinks(){
	var dropdown = document.getElementsByClassName("expandable-link");

	for (let i = 0; i < dropdown.length; i++) {
		dropdown[i].addEventListener("click", function() {
			this.classList.toggle("active-expandable-link");
			var dropdownContent = this.nextElementSibling;
			if (dropdownContent.style.display === "block") {
				dropdownContent.style.display = "none";
			} else {
				dropdownContent.style.display = "block";
			}
		});
	}
}