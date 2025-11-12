const express = require("express");
const router = express.Router();

// Массив для хранения элементов (в памяти, данные теряются при перезапуске)
let items = [];

// CREATE - Создание нового элемента
// POST /api/items
router.post("/", (req, res) => {
  const { name } = req.body; // Получаем имя из тела запроса
  const id = items.length + 1; // Генерируем уникальный ID
  const newItem = { id, name }; // Создаём новый объект элемента
  items.push(newItem); // Добавляем в массив
  res.status(201).json(newItem); // Возвращаем созданный элемент со статусом 201
});


// READ - Получение всех элементов
// GET /api/items
router.get("/", (req, res) => {
  res.json(items); // Возвращаем весь массив элементов
});

// UPDATE - Обновление элемента по ID
// PUT /api/items/:id
router.put("/:id", (req, res) => {
  const { id } = req.params; // Получаем ID из параметров URL
  const { name } = req.body; // Получаем новое имя из тела запроса
  const item = items.find((i) => i.id === parseInt(id)); // Ищем элемент по ID
  if (!item) return res.status(404).send("Item not found"); // Если не найден - ошибка 404

  item.name = name; // Обновляем имя элемента
  res.json(item); // Возвращаем обновлённый элемент
});

// DELETE - Удаление элемента по ID
// DELETE /api/items/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params; // Получаем ID из параметров URL
  const itemIndex = items.findIndex((i) => i.id === parseInt(id)); // Ищем индекс элемента
  if (itemIndex === -1) return res.status(404).send("Item not found"); // Если не найден - ошибка 404
  
  items.splice(itemIndex, 1); // Удаляем элемент из массива
  res.status(204).send(); // Возвращаем статус 204 (No Content)
});

module.exports = router;