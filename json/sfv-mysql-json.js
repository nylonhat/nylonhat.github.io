const fs = require('fs');

//mySQL database connection 
var mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
	host: '',
	user: 'anthonylai',
	password: 'f&5TUxiP8uB4W!I3',
	database: 'sfv'
});

mysqlConnection.connect();

var tables = ['characters', 'combo_types', 'crush_counter_moves', 'distance', 'efficiency', 'game_versions', 'vtriggers', 'character_forms'];


var combos;

for (let i = 0; i < tables.length; i++) {
	console.log(tables[i]);

	let queryText = '';
	if (tables[i] == 'vtriggers'){
		queryText = `SELECT vtrigger_id, character_id, type_id, sfv.vtriggers.name, v_bar, vtrigger_types.name as 'type_name'  FROM sfv.vtriggers inner join sfv.vtrigger_types on sfv.vtrigger_types.vtrigger_type_id = sfv.vtriggers.type_id order by sfv.vtriggers.character_id ASC, sfv.vtriggers.type_id ASC;`;
	}else if(tables[i] == 'crush_counter_moves'){
		queryText = `SELECT * FROM sfv.crush_counter_moves order by sfv.crush_counter_moves.order ASC;`;
	}else{
		queryText = `SELECT * FROM sfv.${tables[i]};`;
	}

	
	mysqlConnection.query(queryText, function (error, results, fields) {
		if (error) throw error;
		combos = results;
		fs.writeFileSync(`${tables[i]}.json`, JSON.stringify(combos));
		console.log("inside  " + tables[i]);
	});
}





//end mySQL connection
mysqlConnection.end();