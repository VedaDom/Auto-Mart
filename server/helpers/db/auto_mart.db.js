const { Pool } = require('pg');

class Database{
  
  dbConnection() {
    return new Pool({
      connectionString: 'postgresql://postgres:Veda1.@127.0.0.1:5432/auto_mart',
    });
  }

  async selectById(table, id) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM ${table} WHERE id='${id}';`);
    await conn.end();
    return result;
  }

  async selectBy(table, column, value) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM ${table} WHERE ${column}='${value}';`);
    await conn.end();
    return result;
  }

  async selectCount(table, column, value){
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT COUNT(1) FROM ${table} WHERE ${column} = '${value}';`);
    await conn.end();
    return result;
  }

  async createDb(){
    const conn = this.dbConnection();
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users( Id VARCHAR(255) PRIMARY KEY, FirstName VARCHAR(50) NOT NULL, LastName VARCHAR(50) NOT NULL, Email VARCHAR(50) UNIQUE NOT NULL, Password VARCHAR(255) NOT NULL, Address VARCHAR(50) NOT NULL, IsAdmin BOOLEAN NOT NULL DEFAULT false);

      CREATE TABLE IF NOT EXISTS cars ( Id VARCHAR(255) PRIMARY KEY, Owner VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE, Create_on DATE NOT NULL, State VARCHAR(30) NOT NULL, Status VARCHAR(30) NOT NULL, Price FLOAT NOT NULL, Manufacturer VARCHAR(30) NOT NULL, Model VARCHAR(30) NOT NULL, Body_type VARCHAR(30) NOT NULL );

      CREATE TABLE IF NOT EXISTS orders ( Id VARCHAR(255) PRIMARY KEY, Buyer VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE, Car_id VARCHAR(255) REFERENCES cars(id) ON DELETE CASCADE, Amount INTEGER NOT NULL, Status VARCHAR(30) NOT NULL );

      CREATE TABLE IF NOT EXISTS flags ( Id VARCHAR(255) PRIMARY KEY, Car_id VARCHAR(255) REFERENCES cars(id) ON DELETE CASCADE, Create_on DATE NOT NULL, Description VARCHAR(30) NOT NULL );
    `);
    await conn.end();
    return;
  }

  async addUser(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO users VALUES(
        '${data.id}',
        '${data.first_name}',
        '${data.last_name}',
        '${data.email}',
        '${data.password}',
        '${data.address}',
        ${data.is_admin}
      ) returning *;
    `);
    
    await conn.end();

    return result;
  }
  
}

module.exports.Database = Database;