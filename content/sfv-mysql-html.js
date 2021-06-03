//mySQL database connection 
var mysql      = require('mysql');
var mysqlConnection = mysql.createConnection({
  host     : '',
  user     : 'anthonylai',
  password : 'f&5TUxiP8uB4W!I3',
  database : 'sfv'
});
 
mysqlConnection.connect();

let queryText = 'CALL getData();';
var combos;

mysqlConnection.query(queryText, function (error, results, fields) {
  if (error) throw error;
  combos = results[0];
  writeHtml(combos);
});

//end mySQL connection
mysqlConnection.end();


function writeHtml(combos){
	var currentType = '';
	var currentCCMove = '';

	for (combo in combos){
		let notation = combos[combo]['std_notation'];
		let vtrigger = combos[combo]['v-trigger'];
		let efficiency = combos[combo]['efficiency'];
		let type = combos[combo]['type'];
		let startup = combos[combo]['startup'];
		let damage = combos[combo]['damage'];
		let stun = combos[combo]['stun'];
		let standState = combos[combo]['standing state'];
		let exbar = combos[combo]['ex_bar'];

		let dmgPerEx = (combos[combo]['dmg per EX'] < 0 ? '': '+') + combos[combo]['dmg per EX'];
		let stunPerEx = (combos[combo]['stun per EX']< 0 ? '': '+') + combos[combo]['stun per EX'];

		let ccMove = combos[combo]['CC move'];
		let distance = combos[combo]['distance'];
		let notes = combos[combo]['notes'];

		let comboName = `${startup}F ${efficiency} ${standState} ${distance}`;


		//Heading sections
		if (type == 'Jump in' || type == 'CC' || type == 'Corner CC' || type == 'Corner Jump in' || type == 'Air to air'){
			comboName = `${efficiency} ${standState} ${distance}`;
		}

		//If CC, subdivide into individual sections
		if (type == 'CC'){
			if (currentCCMove != ccMove){
				currentCCMove = ccMove;
				console.log(`<h3 class="spyscroll-section">${type} ${ccMove}</h3>`);
			}
		}

		else if (currentType != type){
			currentType = type;
			console.log(`<h3 class="spyscroll-section">${currentType}</h3>`);
		} 
		
		//--------------
		//Combo details
		console.log(`<div class="combo-and-detail">`);

		console.log(`<div class="combo-container">`);
		console.log(`\t<p class="spanleft comboname">${comboName}`);
		console.log(`\t\t<span class="spanleft dmgstun">`);
		console.log(`\t\t\t${damage} · ${stun}`);
		console.log(`\t\t</span>`);

		if (vtrigger != 'No V-trigger') {
			console.log();
			console.log(`\t\t<span class="spanright vbar">`);
			console.log(`\t\t\t${vtrigger}`);
			console.log(`\t\t</span>`);
		}

		if (exbar > 0) {
			console.log();
			console.log(`\t\t<span class="spanright exbar">`);
			console.log(`\t\t\t${exbar} Bar`);
			console.log(`\t\t</span>`);
			console.log();
			console.log(`\t\t<span class="spanright exbonus">`);
			console.log(`\t\t\t${dmgPerEx} / ${stunPerEx}`);
			console.log(`\t\t</span>`);
		}

		console.log(`\t</p>`);
		console.log();

		console.log(`\t<p class="codeblock">`);
		console.log(`\t\t${notation}`);
		console.log(`\t</p>`);

		console.log(`</div>`);

		console.log(`<div class="combodetail">`);
		console.log(`\t${notes}`);
		console.log(`</div>`);

		console.log(`</div>`);
		
		console.log();

		
	}
}