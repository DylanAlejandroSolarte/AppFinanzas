const express = require("express");
const router = express.Router();
const tagModel = require("../models/tagModel");

/**
 * @swagger
 * components:
 *  schemas:
 *      Tag:
 *          type: object
 *          properties:
 *              name:
 *                  type: String
 *                  description: Nombre del tag
 *              finanzas:
 *                  type: array
 *                  items:
 *                      type: String
 *                      description: ObjectIds de las finanzas que tienen este tag
 *              user:
 *                  type: String
 *                  description: ObjectId del usuario al que pertenece el tag
 *          required:
 *              - name
 *              - user
 *          example:
 *              name: Compras en efectivo
 *              finanzas: ["65610e7bccafedb231af285b", "42310e7bccafedb271af685b"]
 *              user: "656102391a5dd9f2795bf689"
 *
 */

/**
 * @swagger
 * /tag/add:
 *  post:
 *      summary: Crea un nuevo tag
 *      tags: [Tag]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Tag'
 *      responses:
 *          201:
 *              description: Se creo el tag
 *          500:
 *              description: Error interno
 *
 *
 */
router.post("/add", tagModel.add_tag);

/**
 * @swagger
 * /tag/read:
 *  get:
 *      summary: Retorna todos los tags
 *      tags: [Tag]
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Tag'
 *          500:
 *              description: Error interno
 *
 *
 *
 */
router.get("/read", tagModel.read_tag);

/**
 * @swagger
 * /tag/read/{id}:
 *  get:
 *      summary: Retorna un tag por su id
 *      tags: [Tag]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id del tag
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Tag'
 *          500:
 *              description: Error interno
 *
 *
 *
 */
router.get("/read/:id", tagModel.read_tagById);

/**
 * @swagger
 * /tag/update/:id:
 *  put:
 *      summary: Actualiza el tag de la id especificada
 *      tags: [Tag]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id del tag
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Tag'
 *      responses:
 *          200:
 *              description: Tag modificado exitosamente
 *          404:
 *              description: No se pudo modificar el tag, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.put("/update/:id", tagModel.update_tag);

/**
 * @swagger
 * /tag/update-finanzas/:id:
 *  put:
 *      summary: Actualiza el array de finanzas del tag de la id especificada
 *      tags: [Tag]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id del tag
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
 *              description: Array de finanzas modificado exitosamente
 *          404:
 *              description: No se pudo modificar el Array de finanzas del tag, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.put("/update-finanzas/:id", tagModel.update_tagFinanzas);

/**
 * @swagger
 * /tag/delete/:id:
 *  delete:
 *      summary: Elimina el tag de la id especificada
 *      tags: [Tag]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id del tag
 *      responses:
 *          200:
 *              description: Tag eliminado exitosamente
 *          404:
 *              description: No se pudo encontrar el tag para eliminar, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.delete("/delete/:id", tagModel.delete_tag);

module.exports = router;
