const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { validateContact } = require('../utils/validate');

const router = express.Router();

// In-memory data
let contacts = [
  { id: uuidv4(), firstName: 'Alan', lastName: 'Turing', email: 'alan.turing@auring.com', phone: '123456789', tags: ['Work'] },
  { id: uuidv4(), firstName: 'Marie', lastName: 'Curie', email: 'marie.curie@mail.com', phone: '987654321', tags: ['Family'] }
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *       required:
 *         - firstName
 *         - email
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts (optionally search by name or email)
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name, lastName or email
 *     responses:
 *       200:
 *         description: List of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get('/', (req, res) => {
  const { search } = req.query;
  if (search) {
    const q = search.toLowerCase();
    const result = contacts.filter(c =>
      (c.firstName && c.firstName.toLowerCase().includes(q)) ||
      (c.lastName && c.lastName.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q))
    );
    return res.json(result);
  }
  res.json(contacts);
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact object
 *       404:
 *         description: Not found
 */
router.get('/:id', (req, res) => {
  const c = contacts.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ message: 'Contact not found' });
  res.json(c);
});

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', (req, res) => {
  const payload = req.body;
  const { valid, errors } = validateContact(payload);
  if (!valid) return res.status(400).json({ errors });

  const newContact = { id: uuidv4(), ...payload };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:id', (req, res) => {
  const idx = contacts.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Contact not found' });

  const payload = req.body;
  const { valid, errors } = validateContact(payload, { partial: true });
  if (!valid) return res.status(400).json({ errors });

  contacts[idx] = { ...contacts[idx], ...payload };
  res.json(contacts[idx]);
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', (req, res) => {
  const idx = contacts.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Contact not found' });
  contacts.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;