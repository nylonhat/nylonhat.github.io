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
		alert("test");
	}
	
	spyScrollSections.array.forEach(spyScrollSection => {
		alert("test");
		let sectionLink = document.createElement('a');
		sectionLink.href = "#" + spyScrollSection.innerHTML;
		sectionLink.setAttribute("class", "navlinks");
		pageSections.array.forEach( pageSection => {
			pageSection.appendChild(sectionLink);
		});

	});

	
}