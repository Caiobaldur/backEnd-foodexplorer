//lidando com erros
require("express-async-errors")
//lidando com rotas
const express = require("express");
const routes = require("./routes");
//banco de dados
const database = require("./database/sqlite")
database();

//lidando com rotas
const app = express();
app.use(express.json());
app.use(routes);

//lidando com erros
const AppError = require("./utils/AppError");
app.use((error,request,response,next) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }

  console.error(error); //debug

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  })
})


const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
