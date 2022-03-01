const mysql = require('mysql');

// Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

// View Users
exports.view = (req, res)=>{
    // Connect to DB
    pool.getConnection((err, connection)=>{
        if (err) throw err; // Not Connected!
        console.log('Connected to DB ID:'+ connection.threadId);   
        // User the connection
        connection.query('select * from user', (err, rows)=>{
            // When done with connection , release it
            connection.release();
            if(!err){
                let removedUser = req.query.removed;
                res.render('home', { rows, removedUser});
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows)
        });
    });
};

exports.find = (req, res)=>{
    // Connect to DB
    pool.getConnection((err, connection)=>{
        if (err) throw err; // Not Connected!
        console.log('Connected to DB ID:'+ connection.threadId);   
        
        let searchTerm = req.body.search;
        
        // User the connection
        connection.query('select * from user where first_name like ? or last_name like ?', ['%'+ searchTerm +'%','%'+ searchTerm +'%'], (err, rows)=>{
            // When done with connection , release it
            connection.release();
            if(!err){
                res.render('home', { rows });
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows)
        });
    });
};

exports.userForm = (req, res)=>{
    res.render('add-user')
};

exports.createUser = (req, res)=>{
    // Connect to DB
    pool.getConnection((err, connection)=>{
        const {first_name, last_name, email, phone, comments} = req.body;
        
        if (err) throw err; // Not Connected!
        console.log('Connected to DB ID:'+ connection.threadId);   
        // User the connection
        connection.query('insert into user set first_name=?,last_name=?,email=?,phone=?,comments=?',[first_name,last_name,email,phone,comments], (err, rows)=>{
            // When done with connection , release it
            connection.release();
            if(!err){
                res.render('add-user', {alert:'User added Successfully!'});
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows)
        });
    });
};

exports.deleteUser = (req, res)=>{
    // Connect to DB
    pool.getConnection((err, connection)=>{
        
        if (err) throw err; // Not Connected!
        console.log('Connected to DB ID:'+ connection.threadId);   
                
        // User the connection
        connection.query('delete from user where id=?', [req.params.id], (err, rows)=>{
            // When done with connection , release it
            connection.release();
            if(!err){
                let removedUser = encodeURIComponent('User successeflly removed!');
                res.redirect('/?removed=' + removedUser);
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows)
        });
    });
};

exports.editForm = (req, res)=>{
    // Connect to DB
    pool.getConnection((err, connection)=>{
        
        if (err) throw err; // Not Connected!
        console.log('Connected to DB ID:'+ connection.threadId);   
                
        // User the connection
        connection.query('select * from user where id=?', [req.params.id], (err, rows)=>{
            // When done with connection , release it
            connection.release();
            if(!err){
                res.render('edit-user', {rows})
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows)
        });
    });
};

exports.updateUser = (req, res)=>{
    const {first_name, last_name, email, phone, comments} = req.body;
    // Connect to DB
    pool.getConnection((err, connection)=>{
        
        if (err) throw err; // Not Connected!
        console.log('Connected to DB ID:'+ connection.threadId);
                
        // User the connection
        connection.query('update user set first_name=?,last_name=?,email=?,phone=?,comments=? where id=?',[first_name,last_name,email,phone,comments,req.params.id], (err, rows)=>{
            // When done with connection , release it
            if(!err){// User the connection
                connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
                  // When done with the connection, release it  
                  connection.release();
                  if (!err) {
                    res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
                  } else {
                    console.log(err);
                  }
                  console.log('The data from user table: \n', rows);
                });
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows)
        });
    });
};

exports.viewUserdetails = (req, res)=>{
    // Connect to DB
    pool.getConnection((err, connection)=>{
        
        if (err) throw err; // Not Connected!
        console.log('Connected to DB ID:'+ connection.threadId);
                
        // User the connection
        connection.query('select * from user where id=?',[req.params.id], (err, rows)=>{
            // When done with connection , release it
            connection.release();
            if(!err){
                res.render('view-user', {rows});
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows)
        });
    });
};
