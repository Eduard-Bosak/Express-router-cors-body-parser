# Руководство по тестированию CRUD API

## Описание проекта

Этот проект представляет собой Express приложение с CRUD API для управления элементами (items). 
API поддерживает создание, чтение, обновление и удаление элементов.

## Установленные зависимости

- **express** - веб-фреймворк для Node.js
- **cors** - middleware для обработки CORS (Cross-Origin Resource Sharing)
- **body-parser** - middleware для парсинга тела запроса (JSON, URL-encoded)

## Что такое CORS?

**CORS (Cross-Origin Resource Sharing)** - это механизм безопасности браузера, который позволяет веб-приложениям с одного домена делать запросы к ресурсам на другом домене. 

В нашем проекте `cors` настроен так:
```javascript
app.use(cors());
```
Это позволяет принимать запросы из любых источников.

## Что такое body-parser?

**body-parser** - это middleware для Express, который парсит (разбирает) тело входящих запросов и делает данные доступными в `req.body`.

В проекте используется:
```javascript
app.use(bodyParser.json()); // Парсинг JSON данных
app.use(bodyParser.urlencoded({ extended: true })); // Парсинг URL-encoded данных
```

## CRUD операции

CRUD - это акроним от:
- **C**reate (Создать) - POST запрос
- **R**ead (Прочитать) - GET запрос
- **U**pdate (Обновить) - PUT запрос
- **D**elete (Удалить) - DELETE запрос

## Как запустить сервер

### Вариант 1: Через командную строку
```bash
npm start
```

### Вариант 2: Через батник (рекомендуется для Windows)
Двойной клик по файлу `start-server.bat`

Сервер запустится на `http://localhost:3000`

## Как тестировать API

### Вариант 1: С помощью PowerShell скрипта (автоматический тест)

1. Убедитесь, что сервер запущен
2. Откройте второе окно PowerShell
3. Выполните команду:
```powershell
.\test-api.ps1
```

Этот скрипт автоматически выполнит все CRUD операции и покажет результаты.

### Вариант 2: Ручное тестирование через PowerShell

#### 1. Создать элемент (CREATE)
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/api/items' -Method POST -Headers @{'Content-Type'='application/json'} -Body '{"name": "Example Item"}'
```

**Ожидаемый результат:**
```json
{"id": 1, "name": "Example Item"}
```

#### 2. Получить список элементов (READ)
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/api/items' -Method GET
```

**Ожидаемый результат:**
```json
[{"id": 1, "name": "Example Item"}]
```

#### 3. Обновить элемент (UPDATE)
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/api/items/1' -Method PUT -Headers @{'Content-Type'='application/json'} -Body '{"name": "Updated Item"}'
```

**Ожидаемый результат:**
```json
{"id": 1, "name": "Updated Item"}
```

#### 4. Удалить элемент (DELETE)
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/api/items/1' -Method DELETE
```

**Ожидаемый результат:** Статус 204 (No Content), пустой ответ

### Вариант 3: Через Postman

Если у Вас установлен Postman:

1. **CREATE** - Создать элемент:
   - Method: POST
   - URL: `http://localhost:3000/api/items`
   - Headers: `Content-Type: application/json`
   - Body (raw, JSON): `{"name": "Example Item"}`

2. **READ** - Получить список:
   - Method: GET
   - URL: `http://localhost:3000/api/items`

3. **UPDATE** - Обновить элемент:
   - Method: PUT
   - URL: `http://localhost:3000/api/items/1`
   - Headers: `Content-Type: application/json`
   - Body (raw, JSON): `{"name": "Updated Item"}`

4. **DELETE** - Удалить элемент:
   - Method: DELETE
   - URL: `http://localhost:3000/api/items/1`

### Вариант 4: Через браузер (только для GET запросов)

Откройте в браузере:
```
http://localhost:3000/api/items
```

Вы увидите список всех элементов в формате JSON.

## Структура проекта

```
express_router-main/
├── app.js                 # Главный файл приложения с настройкой middleware
├── package.json           # Зависимости проекта
├── bin/
│   └── www               # Точка входа для запуска сервера
├── routes/
│   ├── index.js          # Главный маршрут (/)
│   ├── users.js          # Маршрут для пользователей (/users)
│   └── items.js          # CRUD API для элементов (/api/items)
├── public/               # Статические файлы (CSS, изображения)
├── views/                # Шаблоны Jade
├── start-server.bat      # Батник для запуска сервера
└── test-api.ps1          # Скрипт для автоматического тестирования API
```

## Объяснение кода в routes/items.js

```javascript
const express = require("express");
const router = express.Router();

let items = []; // Массив для хранения элементов (в памяти)

// CREATE - Создание нового элемента
router.post("/", (req, res) => {
  const { name } = req.body;           // Извлекаем имя из тела запроса
  const id = items.length + 1;         // Генерируем ID
  const newItem = { id, name };        // Создаём новый объект
  items.push(newItem);                 // Добавляем в массив
  res.status(201).json(newItem);       // Возвращаем созданный элемент
});

// READ - Получение всех элементов
router.get("/", (req, res) => {
  res.json(items);                     // Возвращаем весь массив
});

// UPDATE - Обновление элемента по ID
router.put("/:id", (req, res) => {
  const { id } = req.params;           // Извлекаем ID из URL
  const { name } = req.body;           // Извлекаем новое имя из тела запроса
  const item = items.find((i) => i.id === parseInt(id)); // Ищем элемент
  if (!item) return res.status(404).send("Item not found"); // Если не найден
  
  item.name = name;                    // Обновляем имя
  res.json(item);                      // Возвращаем обновлённый элемент
});

// DELETE - Удаление элемента по ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;           // Извлекаем ID из URL
  const itemIndex = items.findIndex((i) => i.id === parseInt(id)); // Ищем индекс
  if (itemIndex === -1) return res.status(404).send("Item not found"); // Если не найден
  
  items.splice(itemIndex, 1);          // Удаляем элемент из массива
  res.status(204).send();              // Возвращаем статус 204 (No Content)
});

module.exports = router;
```

## Объяснение настройки middleware в app.js

```javascript
const cors = require("cors");
const bodyParser = require("body-parser");
const itemsRouter = require("./routes/items");

// Подключаем CORS - позволяет принимать запросы из других доменов
app.use(cors());

// Подключаем body-parser для парсинга JSON
app.use(bodyParser.json());

// Подключаем маршрутизатор для /api/items
app.use("/api/items", itemsRouter);

// Подключаем body-parser для парсинга URL-encoded данных
app.use(bodyParser.urlencoded({ extended: true }));
```

## Коды состояния HTTP

- **200 OK** - Успешный запрос (GET, PUT)
- **201 Created** - Ресурс создан (POST)
- **204 No Content** - Успешное удаление (DELETE)
- **404 Not Found** - Ресурс не найден
- **500 Internal Server Error** - Ошибка сервера

## Возможные проблемы и решения

### Проблема 1: Сервер не запускается
**Решение:** Убедитесь, что порт 3000 не занят другим приложением.

### Проблема 2: "Cannot POST /api/items" или подобные ошибки
**Решение:** Убедитесь, что:
1. Сервер запущен
2. В заголовках указан `Content-Type: application/json`
3. Тело запроса в формате JSON

### Проблема 3: Данные не сохраняются после перезапуска сервера
**Это нормально!** Данные хранятся в памяти (массив `items`). После перезапуска сервера массив очищается.

## Полезные советы

1. **Используйте два терминала**: один для сервера, второй для тестирования
2. **Проверяйте статус коды**: они помогают понять, успешно ли выполнен запрос
3. **Читайте сообщения об ошибках**: они содержат полезную информацию
4. **Используйте Postman**: он удобнее для визуального тестирования API

## Дополнительная информация

- Express документация: https://expressjs.com/
- CORS объяснение: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- HTTP методы: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
- REST API концепции: https://restfulapi.net/


