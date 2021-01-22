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

function toggleExpandableLink(){
	var dropdownContent = this.nextElementSibling;

	if (dropdownContent.classList.contains("expandable-link-container")){
		this.classList.toggle("active-expandable-link");
		if (dropdownContent.style.display === "block") {
			dropdownContent.style.display = "none";
		} else {
			dropdownContent.style.display = "block";
		}
	}
}


function initExpandableLinks(){
	var dropdown = document.getElementsByClassName("navlinks expandable-link");
	var i;
	for (i = 0; i < dropdown.length; i++) {
		dropdown[i].addEventListener("click", toggleExpandableLink);
	}
}


function createSectionLinks(){
	var pageSections = document.getElementsByClassName("current-page-section-links");
	var spyScrollSections = document.getElementsByClassName("spyscroll-section");
	var i;
	for (i = 0; i< spyScrollSections.length; i++){
		spyScrollSections[i].setAttribute("id", "spyScrollSection" + i);

		var j;
		for (j = 0; j < pageSections.length; j++){
			var sectionLink = document.createElement('a');
			sectionLink.href = "#" + spyScrollSections[i].getAttribute("id");
			sectionLink.setAttribute("class", "navlinks spyscroll-link");
			sectionLink.innerHTML = spyScrollSections[i].innerHTML;

			pageSections[j].appendChild(sectionLink);
			
			console.log("child appended  " + i + j);
			console.log(pageSections[j]);
		}
	}
	
}


function initSpyScroll(){
	const spyScrollSections = document.querySelectorAll(".spyscroll-section");
	const spyScrollLinks = document.querySelectorAll(".navlinks, .spyscroll-link");

	console.log("spyScrollSection.length");
	console.log(spyScrollSections.length);

	console.log("spyScrollLinks.length");
	console.log(spyScrollLinks.length);
}