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

function toggleExpandableLink() {
	var dropdownContent = this.nextElementSibling;

	if (dropdownContent.classList.contains("expandable-link-container")) {
		this.classList.toggle("active-expandable-link");
		if (dropdownContent.style.display === "block") {
			dropdownContent.style.display = "none";
		} else {
			dropdownContent.style.display = "block";
		}
	}
}
   

function initExpandableLinks() {
	var dropdown = document.getElementsByClassName("navlinks expandable-link");
	var i;
	for (i = 0; i < dropdown.length; i++) {
	   	dropdown[i].addEventListener("click", toggleExpandableLink);
	}
}


function createSectionLinks() {
	var pageSections = document.getElementsByClassName("current-page-section-links");
	var spyScrollSections = document.getElementsByClassName("spyscroll-section");
	var i;
	for (i = 0; i < spyScrollSections.length; i++) {
		spyScrollSections[i].setAttribute("id", "spyScrollSection" + i);

		var j;
		for (j = 0; j < pageSections.length; j++) {
			var sectionLink = document.createElement('a');
			sectionLink.href = "#" + spyScrollSections[i].getAttribute("id");
			sectionLink.setAttribute("class", "navlinks spyscroll-link");
			sectionLink.innerHTML = spyScrollSections[i].innerHTML;

			pageSections[j].appendChild(sectionLink);
			

		}
	}
}


function initSpyScroll() {
	const spyScrollSections = document.querySelectorAll(".spyscroll-section");
	const navMenus = document.getElementsByClassName("nav-menu");

	if (spyScrollSections.length == 0) {
		console.log("No spyscroll sections");  
	} else {

		const makeActive = (link, linkSet) => linkSet[link].classList.add("active-spyscroll-link");
		const removeActive = (link, linkSet) => linkSet[link].classList.remove("active-spyscroll-link");
		const removeAllActive = (linkSet) => [...Array(linkSet.length).keys()].forEach((link) => removeActive(link, linkSet));

		const sectionMargin = 200;

		let currentActive = 0;

		let i;
		for     (i = 0; i < navMenus.length; i++) {
			const spyScrollLinks = navMenus[i].querySelectorAll(".spyscroll-link");

			removeAllActive(spyScrollLinks);
			makeActive(currentActive, spyScrollLinks);
			
		}

		var scrollWindow = document.querySelector(".right-panel");

		scrollWindow.addEventListener("scroll", () => {
			console.log("scrolling");

			const current = spyScrollSections.length - [...spyScrollSections].reverse().findIndex((section) =>
				scrollWindow.scrollTop >= section.offsetTop -   sectionMargin) - 1;

			if (current !== currentActive) {

				let i;
				for (i = 0; i < navMenus.length; i++) {
					const spyScrollLinks = navMenus[i].querySelectorAll(".spyscroll-link");

					removeAllActive(spyScrollLinks);
					currentActive = current;
					makeActive(current, spyScrollLinks);
					removeAllActive (index, spyscrool) 
				}    
			}
		}); 
	}
}

function initComboForm() {
	//Character options and  options that depend on it
	$.getJSON('json/characters.json', function (jsonData) {
		console.log("got character json");
		$.each(jsonData, function (key, value) {
			$("#character").append(
				`<option value="${value.character_id}">${value.name}</option>`
			);
		});
	})
		.then(function () {
			$.getJSON('json/crush_counter_moves.json', function (jsonData) {
				$.each(jsonData, function (key, value) {
					if (value.character_id == $("#character").val()) {
						$("#cc_move").append(
							`<option value="${value.crush_counter_move_id}">${value.move}</option>`
						);


					}
				});
			});

			$.getJSON('json/character_forms.json', function (jsonData) {
				$.each(jsonData, function (key, value) {
					if (value.character_id == $("#character").val()) {
						$("#character_form").append(
							`<option value="${value.character_forms_id}">${value.name}</option>`
						);
					}
				});
			});

			$.getJSON('json/vtriggers.json', function (jsonData) {
				$.each(jsonData, function (key, value) {
					if (value.character_id == $("#character").val()) {
						$("#vtrigger").append(
							`<option value="${value.vtrigger_id}">${value.name} (${value.type_name})</option>`
						);    
					}

				});
			});

		}); 

	//Non dependant options
	$.getJSON('json/combo_types.json', function (jsonData) {
		$.each(jsonData, function (key, value) {
			$("#combo_type").append(
				`<option value="${value.combo_type_id}">${value.name}</option>`
			);
		});
	});

	$.getJSON('json/efficiency.json', function (jsonData) {
		$.each(jsonData, function (key, value) {
			$("#efficiency").append(
				`<option value="${value.efficiency_id}">${value.name}</option>`
				          
			);
		});
	});

	$.getJSON('json/game_versions.json', function (jsonData) {
		$.each(jsonData, function (key, value) {
			$("#game_version").append(
				`<option value="${value.game_version_id}">${value.common_name} (${value.name})</option>`
			);
		});
	});

	
	$.getJSON('json/distance.json', function (jsonData) {
		$.each(jsonData, function (key, value) {
			$("#distance").append(
				`<option value="${value.distance_id}">${value.name}</option>`
			);
		});
	}); 

	//Update when different character is selected
	$(document).on('change', '#character', function () {
		$.getJSON('json/crush_counter_moves.json', function (jsonData) {
			$("#cc_move").children('option').remove();

			$.each(jsonData, function (key, value) {
				if (value.character_id == $("#character").val()) {
					$("#cc_move").append(
						`<option value="${value.crush_counter_move_id}">${value.move}</option>`
					);
				

				} 
			}); 
		});

		$.getJSON('json/character_forms.json', function (jsonData) {
			$("#character_form").children('option').remove();

			$.each(jsonData, function (key, value) {
				if (value.character_id == $("#character").val()) {
					$("#character_form").append(
						`<option value="${value.character_forms_id}">${value.name}</option>`
					);
				}
			});
		});

		$.getJSON('json/vtriggers.json', function (jsonData) {
			$("#vtrigger").children('option').remove();

			$.each(jsonData, function (key, value) {
				if (value.character_id == $("#character").val()) {
					$("#vtrigger").append(
						`<option value="${value.vtrigger_id}">${value.name} (${value.type_name})</option>`
					);
				}
			});
		});
	});
}