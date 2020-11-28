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