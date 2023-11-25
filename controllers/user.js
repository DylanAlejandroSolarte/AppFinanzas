const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              name:
 *                  type: String
 *                  description: Nombre de usuario
 *              email:
 *                  type: String
 *                  description: Correo de usuario
 *              pss:
 *                  type: String
 *                  description: Contraseña
 *              finanzas:
 *                  type: array
 *                  items:
 *                      type: String
 *                      description: ObjectIds de las finanzas del usuario
 *              tags:
 *                  type: array
 *                  items:
 *                      type: String
 *                      description: ObjectIds de los tags del usuario
 *          required:
 *              - name
 *              - email
 *              - pss
 *          example:
 *              name: Dylan
 *              email: dasolarter@udistrital.edu.co
 *              pss: holamundo
 *              finanzas: ["65610e7bccafedb231af285b", "42310e7bccafedb271af685b"]
 *              tags: ["16560e7bccafedb332af285b", "43120e7bccafedb271af685b"]
 *
 */

/**
 * @swagger
 * /usuario/add:
 *  post:
 *      summary: Crea un nuevo usuario
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: Se creo el usuario
 *          404:
 *              description: Error interno
 *
 *
 */
router.post("/add", userModel.add_usuario);

/**
 * @swagger
 * /usuario/read:
 *  get:
 *      summary: Retorna todos los usuarios
 *      tags: [User]
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          500:
 *              description: Error interno
 *
 *
 *
 */
router.get("/read", userModel.read_usuario);

/**
 * @swagger
 * /usuario/read/{id}:
 *  get:
 *      summary: Retorna un usuario por su id
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id del usuario
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Error interno
 *
 *
 *
 */
router.get("/read/:id", userModel.read_usuarioById);
/**
 * @swagger
 * /usuario/read-post:
 *  post:
 *      summary: Retorna un usuario por id
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *                          required: true
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Error interno
 *
 *
 *
 */
router.post("/read-post", userModel.read_usuarioByIdPost);
/**
 * @swagger
 * /usuario/update/:id:
 *  put:
 *      summary: Actualiza el usuario de la id especificada
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id del usuario
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Usuario modificado exitosamente
 *          404:
 *              description: No se pudo modificar el usuario, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.put("/update/:id", userModel.update_usuario);
/**
 * @swagger
 * /usuario/update-finanzas/:id:
 *  put:
 *      summary: Actualiza el array de finanzas del usuario de la id especificada
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id del usuario
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      finanzas:
 *                          items:
 *                              type: string
 *                          required: true
 *      responses:
 *          200:
 *              description: Array de finanzas modificado exitosamente
 *          404:
 *              description: No se pudo modificar el Array de finanzas del usuario, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.put("/update-finanzas/:id", userModel.update_usuarioFinanzas);

/**
 * @swagger
 * /usuario/update-tags/:id:
 *  put:
 *      summary: Actualiza el array de tags del usuario de la id especificada
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id del usuario
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      tags:
 *                          items:
 *                              type: string
 *                          required: true
 *      responses:
 *          200:
 *              description: Array de tags modificado exitosamente
 *          404:
 *              description: No se pudo modificar el Array de tags del usuario, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.put("/update-tags/:id", userModel.update_usuarioTags);

/**
 * @swagger
 * /usuario/delete/:id:
 *  delete:
 *      summary: Elimina el usuario de la id especificada
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id del usuario
 *      responses:
 *          200:
 *              description: Usuario eliminado exitosamente
 *          404:
 *              description: No se pudo encontrar el usuario para eliminar, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.delete("/delete/:id", userModel.delete_usuario);

/**
 * @swagger
 * /usuario/login:
 *  post:
 *      summary: Valida los datos del usuario para el inicio de sesión
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          required: true
 *                      pss:
 *                          type: string
 *                          required: true
 *      responses:
 *          200:
 *              description: Inicio de sesión exitoso
 *          401:
 *              description: Correo electrónico o contraseña incorrectos
 *          500:
 *              description: Error interno
 *
 */
router.post("/login", userModel.login);
module.exports = router;
