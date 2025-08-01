import express, { Router } from "express";
import * as BusinessController from "../controllers/business.controller";
import { validate } from "../middlewares/validate";
import {
  createBusinessSchema,
  updateBusinessSchema,
} from "../validators/business.validator";

const businessRouter: Router = express.Router();

/**
 * @swagger
 * /businesses:
 *   get:
 *     summary: Get all businesses
 *     tags: [Business]
 *     responses:
 *       200:
 *         description: List of all businesses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Business'
 */
businessRouter.get("/", BusinessController.getAllBusinesses);

/**
 * @swagger
 * /businesses/{id}:
 *   get:
 *     summary: Get a business by ID
 *     tags: [Business]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the business
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Business found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       404:
 *         description: Business not found
 */
businessRouter.get("/:id", BusinessController.getBusinessById);

/**
 * @swagger
 * /businesses:
 *   post:
 *     summary: Create a new business
 *     tags: [Business]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessInput'
 *     responses:
 *       201:
 *         description: Business created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       400:
 *         description: Validation error
 */
businessRouter.post(
  "/",
  validate(createBusinessSchema),
  BusinessController.createBusiness
);

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Verify a business email using verification code
 *     description: Confirms a business account using the verification code sent via email.
 *     tags:
 *       - Business
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 example: business@example.com
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Business verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Business verified successfully
 *       400:
 *         description: Invalid or expired verification code
 *       404:
 *         description: Business not found
 */
businessRouter.post("/verify", BusinessController.verifyBusiness);

/**
 * @swagger
 * /businesses/{id}:
 *   put:
 *     summary: Update an existing business
 *     tags: [Business]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Business ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessInput'
 *     responses:
 *       200:
 *         description: Business updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       404:
 *         description: Business not found
 */
businessRouter.put(
  "/:id",
  validate(updateBusinessSchema),
  BusinessController.updateBusiness
);

/**
 * @swagger
 * /businesses/{id}:
 *   delete:
 *     summary: Delete a business
 *     tags: [Business]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Business ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Business deleted successfully
 *       404:
 *         description: Business not found
 */
businessRouter.delete("/:id", BusinessController.deleteBusiness);

export default businessRouter;
