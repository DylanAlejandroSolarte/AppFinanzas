const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config();
const cors = require("cors");

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FinanzasAPI [Proyecto ACM]",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./controllers/*.js")}`], // Asegúrate de que esta ruta sea correcta
};

const app = express();
const port = process.env.PORT || 3000; // El puerto en el que se ejecutará el servidor

app.use(
  express.urlencoded({
    extended: true,
  })
);

var corsOptions = {
  credentials: true,
  origin: `*`,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://dasolarter:OLM7bjFlKdnwNrk7@cluster0.y6oaqmy.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("mongodb connection up"))
  .catch((error) =>
    console.log(`unable to connect to mongodb: ${error.message}`)
  );

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)));

app.use(require("./controllers/routes"));
