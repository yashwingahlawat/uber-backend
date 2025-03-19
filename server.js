const http=require('http');
const app=require('./app');
const server=http.createServer(app);
const PORT=process.env.PORT||3001
const connectToDb=require('./db/db');
connectToDb();
server.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})