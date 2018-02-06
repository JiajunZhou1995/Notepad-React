var express = require('express');
var path = require('path');
var router = express.Router();
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', 'config'));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
		title: 'Notepad'
	});
});

// Add note
router.post('/note/add', function(req, res) {
	var results = [];

	if(req.body.text == null){
		err = 'text body is missing'
		res.status(400).json({ error: err });
		return;
	}else{
		var data = {text: req.body.text, complete: false};
	}

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			res.status(500).json({ error: err });
		}

		client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);
		var query = client.query('SELECT * FROM items ORDER BY id ASC;');

		query.on('row', function(row) {
			results.push(row);
		})

		query.on('end', function() {
			done();
			results = {message: "Add Success"}
			res.status(200).json(results);
		})
	})
}); 

// Get all note:
router.get('/note', function(req, res) {
	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			res.status(500).json({ success: false, data: err });
		}

		// Retrieve requirment 
		var order = req.query.order || "ASC";
		var command = "";
		if ((order == "asc") || (order == "ASC")) {
			command = "SELECT * FROM items ORDER BY id ASC;";
		}else if((order == "desc") || (order == "DESC")){
			command = "SELECT * FROM items ORDER BY id DESC;";
		}else{
			err = 'order parameter is invalid, please enter ASC or DESC'
			res.status(400).json({ error: err });
			return;
		}

		var query = client.query(command);

		query.on('row', function(row) {
			results.push(row);
		})
		
		query.on('end', function() {
			done();
			var limit = req.query.limit || results.length
			var start = req.query.start || 1
			var start = start - 1

			results = results.slice(start,start + limit)
			if(results.length == 0){
				results = {data: "empty"}
			}
			res.status(200).json(results);
		});
	});
});

// Get note by id
router.get('/note/:id', function(req, res) {
	var results = [];


	var id = parseInt(req.params.id);
	if (isNaN(id)){
		err = 'id parameter must be a number'
		res.status(400).json({ error: err });
		return;
	}

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			res.status(500).json({ error: err });
		}

		var query = client.query("SELECT * FROM items where id = ($1);", [id]);

		query.on('row', function(row) {
			results.push(row);
		})
		
		query.on('end', function() {
			done();

			if (results.length == 0) {
				res.json({ error: 'Not found' });
			}else{
				res.json(results);
			}
		});
	});
});

// Update note
router.put('/note/:id', function(req, res) {

	var id = parseInt(req.params.id);
	if (isNaN(id)){
		err = 'id parameter must be a number'
		res.status(400).json({ error: err });
		return;
	}

	var results = [];
	if(req.body.text == null){
		err = 'text body is missing'
		res.status(400).json({ error: err });
		return;
	}else if((req.body.complete != false)&&(req.body.complete != true)){
		err = 'complete body is invalid'
		res.status(400).json({ error: err });
		return;
	}else{
		var data = { text: req.body.text, complete: req.body.complete };
	}

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			res.status(500).json({ error: err });
		}

		client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)",
			[data.text, data.complete, id]);

		var query = client.query("SELECT * FROM items ORDER BY id ASC;");

		query.on('row', function(row) {
			results.push(row);
		});

		query.on('end', function() {
			done();
			results = {message: "Update Success"}
			res.json(results);
		});
	});
})

// Delete note
router.delete('/note/:id', function(req, res) {

	var id = parseInt(req.params.id);
	if (isNaN(id)){
		err = 'id parameter must be a number'
		res.status(400).json({ error: err });
		return;
	}

	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			res.status(500).json({ error: err });
		}

		client.query('DELETE FROM items WHERE id=($1);', [id]);

		var query = client.query('SELECT * FROM items ORDER BY id ASC;');

		query.on('row', function(row) {
			results.push(row);
		});

		query.on('end', function() {
			done();
			results = {message: "Delete Success"}
			res.json(results);
		});
	});
});

// Handle 404 
router.use(function(req, res, next){
	res.status(404);

	if (req.is('application/json')) {
	    res.json({ error: 'Not found' });
	}else{
		res.render("error.jade");
	}
});

module.exports = router;
