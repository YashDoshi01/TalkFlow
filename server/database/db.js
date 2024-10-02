const {Pool} = require("pg");

const pool = new Pool({
    connectionString : "postgresql://users_owner:4DUmVX5KFzfx@ep-sweet-glitter-a1uuh39w.ap-southeast-1.aws.neon.tech/users?sslmode=require"
});

async function createTable()
{
    try{
    const res = await pool.query(`
            CREATE TABLE userInfo(
            id VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL
            );
        `);
    }
    catch(err)
    {
        console.log(err);
    }
}
// createTable();

module.exports = {pool};