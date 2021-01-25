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
			
		}
	}
	
}


function initSpyScroll(){
	const spyScrollSections = document.querySelectorAll(".spyscroll-section");
	const spyScrollLinks = document.querySelectorAll(".spyscroll-link");

	const makeActive = (link) => spyScrollLinks[link].classList.add("active-spyscroll-link");
 	const removeActive = (link) => spyScrollLinks[link].classList.remove("active-spyscroll-link");
  	const removeAllActive = () => [...Array(spyScrollLinks.length).keys()].forEach((link) => removeActive(link));
	
	const sectionMargin = 200;

	let currentActive = 0;

	makeActive(currentActive);
	makeActive(currentActive + spyScrollSections.length);

	var scrollWindow = document.querySelector(".right-panel");

	scrollWindow.addEventListener("scroll", ()=> {
		console.log("scrolling");

		const current = spyScrollSections.length - [...spyScrollSections].reverse().findIndex((section)=> 
			scrollWindow.scrollTop >= section.offsetTop - sectionMargin) - 1
		
		console.log("current section");
		console.log(current);

		if (current !== currentActive){
			removeAllActive();
			currentActive = current;
			makeActive(current);
			makeActive(current + spyScrollSections.length);
		}
	});

}




function initSpyScrollTest(){
	const spyScrollSections = document.querySelectorAll(".spyscroll-section");
	const navMenus = document.getElementsByClassName("nav-menu");
	

	const makeActive = (link, linkSet) => linkSet[link].classList.add("active-spyscroll-link");
 	const removeActive = (link, linkSet) => linkSet[link].classList.remove("active-spyscroll-link");
  	const removeAllActive = (linkSet) => [...Array(linkSet.length).keys()].forEach((link) => removeActive(link, linkSet));
	
	const sectionMargin = 200;

	let currentActive = 0;

	let i;
			for (i=0; i< navMenus.length; i++){
				const spyScrollLinks = navMenus[i].querySelectorAll(".spyscroll-link");

				removeAllActive(spyScrollLinks);
				makeActive(currentActive, spyScrollLinks);
			}

	var scrollWindow = document.querySelector(".right-panel");

	scrollWindow.addEventListener("scroll", ()=> {
		console.log("scrolling");

		const current = spyScrollSections.length - [...spyScrollSections].reverse().findIndex((section)=> 
			scrollWindow.scrollTop >= section.offsetTop - sectionMargin) - 1;


		if (current !== currentActive){

			let i;
			for (i=0; i< navMenus.length; i++){
				const spyScrollLinks = navMenus[i].querySelectorAll(".spyscroll-link");

				removeAllActive(spyScrollLinks);
				currentActive = current;
				makeActive(current, spyScrollLinks);
			}

			
		}
	});

}