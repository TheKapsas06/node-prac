const mysql = require('mysql2');

function loadSql(){
    const sql = mysql.createConnection({    
        host: "localhost",
        user: "root",
        password: "test",
        database: "random"
    });
    return sql;
}

function sqlQuery(sql, queryValue){
    const sql = loadSql();
    const results = sql.connect(function(err) {
        if (err) throw err;
        const results = sql.query(
            queryValue,
            function (err, results) {
                if (err) throw err;
                const result = results;
            }
        );
    });
}
// SELECT * FROM ss
function init(){
    const testQuery = sqlQuery(sql, 'SELECT * FROM ss')

    console.log(testQuery);
    process.exit();
}
//for (const result of testQuery) {
    //console.log (result.name);
//};

init();