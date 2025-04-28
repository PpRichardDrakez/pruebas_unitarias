const express = require('express');
const router = express.Router();

let items = [{ id: 1, name: 'Item 1' }];

// GET
router.get('/items', (req, res, next) => {
  try {
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
});

// POST
router.post('/items', (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'El campo "name" es obligatorio.' });
    }

    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

// PUT
router.put('/items/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El campo "name" es obligatorio.' });
    }

    const item = items.find(i => i.id === id);
    if (!item) {
      return res.status(404).json({ error: 'Item no encontrado.' });
    }

    item.name = name;
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete('/items/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Item no encontrado.' });
    }

    items.splice(index, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
