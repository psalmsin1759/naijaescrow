import express, { Router } from 'express';
import * as AdminController from '../controllers/admin.controller';
import { validate } from '../middlewares/validate';
import { validateUser, validateLogin, validateForgotPassword, validateResetPassword } from '../validators/admin.validator';



const adminRouter: Router = express.Router();

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Get all admins
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: List of all admins
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
 *                   example: Fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Admin'
 */
adminRouter.get('/', AdminController.getAllAdmins);

/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     summary: Get admin by ID
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin found
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
 *                   $ref: '#/components/schemas/Admin'
 */
adminRouter.get('/:id', AdminController.getAdminById);

/**
 * @swagger
 * /admins:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminInput'
 *     responses:
 *       201:
 *         description: Admin created successfully
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
 *                   $ref: '#/components/schemas/Admin'
 */
adminRouter.post('/', validate(validateUser), AdminController.createAdmin);

/**
 * @swagger
 * /admins/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Admin'
 */
adminRouter.post('/login', validate(validateLogin), AdminController.login);

/**
 * @swagger
 * /admins/forgot-password:
 *   post:
 *     summary: Send password reset email
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset link sent
 */
adminRouter.post('/forgot-password', validate(validateForgotPassword), AdminController.forgotPassword);

/**
 * @swagger
 * /admins/reset-password:
 *   post:
 *     summary: Reset admin password
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, password]
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */
adminRouter.post('/reset-password', validate(validateResetPassword), AdminController.resetPassword);

/**
 * @swagger
 * /admins/{id}:
 *   put:
 *     summary: Update admin info
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminInput'
 *     responses:
 *       200:
 *         description: Admin updated
 */
adminRouter.put('/:id', AdminController.updateAdmin);

/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     summary: Delete an admin
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Admin deleted successfully
 */
adminRouter.delete('/:id', AdminController.deleteAdmin);

export default adminRouter;
