const express = require("express");
const router = express.Router();
const finanzaModel = require("../models/finanzaModel");

/**
 * @swagger
 * components:
 *  schemas:
 *      Finanza:
 *          type: object
 *          properties:
 *              name:
 *                  type: String
 *                  description: Nombre de la finanza
 *              desc:
 *                  type: String
 *                  description: Descripcion de la finanza
 *              price:
 *                  type: Number
 *                  description: Precio de la finanza
 *              payMethod:
 *                  type: String
 *                  description: Metodo de pago de la finanza
 *              date:
 *                  type: Date
 *                  description: Fecha de la finanza
 *              type:
 *                  type: Boolean
 *                  description: 0 para egreso, 1 para ingreso
 *              tags:
 *                  type: array
 *                  items:
 *                      type: String
 *                      description: ObjectIds de los tags que tiene esta finanza
 *              user:
 *                  type: String
 *                  description: ObjectId del usuario al que pertenece la finanza
 *          required:
 *              - name
 *              - price
 *              - payMethod
 *              - date
 *              - type
 *              - user
 *          example:
 *              name: Compras en efectivo
 *              finanzas: ["65610e7bccafedb231af285b", "42310e7bccafedb271af685b"]
 *              user: "656102391a5dd9f2795bf689"
 *
 */

/**
 * @swagger
 * /finanza/add:
 *  post:
 *      summary: Crea una nueva finanza
 *      tags: [Finanza]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Finanza'
 *      responses:
 *          201:
 *              description: Se creo la finanza
 *          500:
 *              description: Error interno
 *
 *
 */
router.post("/add", finanzaModel.add_finanza);

/**
 * @swagger
 * /finanza/read:
 *  get:
 *      summary: Retorna todos las finanzas
 *      tags: [Finanza]
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Finanza'
 *          500:
 *              description: Error interno
 *
 *
 *
 */
router.get("/read", finanzaModel.read_finanza);

/**
 * @swagger
 * /finanza/read/{id}:
 *  get:
 *      summary: Retorna una finanza por su id
 *      tags: [Finanza]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id de la finanza
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Finanza'
 *          500:
 *              description: Error interno
 *
 *
 *
 */
router.get("/read/:id", finanzaModel.read_finanzaById);

/**
 * @swagger
 * /finanza/update/:id:
 *  put:
 *      summary: Actualiza la finanza de la id especificada
 *      tags: [Finanza]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id del finanza
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Finanza'
 *      responses:
 *          200:
 *              description: Finanza modificado exitosamente
 *          404:
 *              description: No se pudo modificar el finanza, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.put("/update/:id", finanzaModel.update_finanza);

/**
 * @swagger
 * /finanza/update-desc/:id:
 *  put:
 *      summary: Actualiza la descripcion de la finanza de la id especificada
 *      tags: [Finanza]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id de la finanza
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      desc:
 *                          type: string
 *      responses:
 *          200:
 *              description: Descripcion de la finanza modificado exitosamente
 *          404:
 *              description: No se pudo modificar la descripcion de la finanza, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.put("/update-desc/:id", finanzaModel.update_finanzaDesc);

/**
 * @swagger
 * /finanza/update-price/:id:
 *  put:
 *      summary: Actualiza el precio de la finanza de la id especificada
 *      tags: [Finanza]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id de la finanza
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      price:
 *                          type: number
 *      responses:
 *          200:
 *              description: Precio de la finanza modificado exitosamente
 *          404:
 *              description: No se pudo modificar el precio de la finanza, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.put("/update-price/:id", finanzaModel.update_finanzaPrice);

/**
 * @swagger
 * /finanza/update-pay-method/:id:
 *  put:
 *      summary: Actualiza el metodo de pago de la finanza de la id especificada
 *      tags: [Finanza]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id de la finanza
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      payMethod:
 *                          type: string
 *      responses:
 *          200:
 *              description: Metodo de pago de la finanza modificado exitosamente
 *          404:
 *              description: No se pudo modificar el metodo de pago de la finanza, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.put("/update-pay-method/:id", finanzaModel.update_finanzaPayMethod);

/**
 * @swagger
 * /finanza/update-date/:id:
 *  put:
 *      summary: Actualiza la fecha de la finanza de la id especificada
 *      tags: [Finanza]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id de la finanza
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      date:
 *                          type: date
 *      responses:
 *          200:
 *              description: Fecha de la finanza modificado exitosamente
 *          404:
 *              description: No se pudo modificar la fecha de pago de la finanza, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.put("/update-date/:id", finanzaModel.update_finanzaDate);

/**
 * @swagger
 * /finanza/update-type/:id:
 *  put:
 *      summary: Actualiza el tipo de la finanza de la id especificada
 *      tags: [Finanza]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id de la finanza
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      type:
 *                          type: string
 *      responses:
 *          200:
 *              description: Tipo de la finanza modificado exitosamente
 *          404:
 *              description: No se pudo modificar el tipo de la finanza, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.put("/update-type/:id", finanzaModel.update_finanzaType);

/**
 * @swagger
 * /finanza/update-tags/:id:
 *  put:
 *      summary: Actualiza el array de tags de la finanza de la id especificada
 *      tags: [Finanza]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id de la finanza
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
 *              description: No se pudo modificar el Array de tags de la finanza, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.put("/update-tags/:id", finanzaModel.update_finanzaTags);

/**
 * @swagger
 * /finanza/delete/:id:
 *  delete:
 *      summary: Elimina el finanza de la id especificada
 *      tags: [Finanza]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type : integer
 *              format: int64
 *              minimum: 1
 *          description: La id de la finanza
 *      responses:
 *          200:
 *              description: Finanza eliminada exitosamente
 *          404:
 *              description: No se pudo encontrar la finanza para eliminar, verifique el id
 *          500:
 *              description: Error interno
 *
 *
 */
router.delete("/delete/:id", finanzaModel.delete_finanza);

module.exports = router;
