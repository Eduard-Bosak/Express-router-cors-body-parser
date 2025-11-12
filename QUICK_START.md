#  Быстрый старт - Пошаговая инструкция

## Шаг 1: Запуск сервера

### Вариант А (рекомендуется):
1. Откройте папку проекта
2. Двойной клик по файлу **start-server.bat**
3. Дождитесь сообщения: "Server is running on http://localhost:3000"
4. **НЕ ЗАКРЫВАЙТЕ это окно!** Сервер должен работать постоянно.

### Вариант Б (через терминал):
1. Откройте терминал в папке проекта
2. Выполните команду: `npm start`
3. Дождитесь сообщения: "Server is running on http://localhost:3000"

---

## Шаг 2: Тестирование API

###  Способ 1: Визуальный тестер (САМЫЙ ПРОСТОЙ!)

1. Откройте браузер (Chrome, Firefox, Edge)
2. Перейдите по адресу: **http://localhost:3000/api-tester.html**
3. Вы увидите красивый интерфейс с кнопками
4. Тестируйте API прямо в браузере! 

**Что делать:**
- Введите название в поле "Создать элемент" и нажмите кнопку
- Нажмите "Обновить список" чтобы увидеть все элементы
- Используйте кнопки "Редактировать" и "Удалить" рядом с каждым элементом

---

###  Способ 2: PowerShell команды (ручное тестирование)

1. Откройте **ВТОРОЕ** окно PowerShell (первое занято сервером!)
2. Перейдите в папку проекта
3. Выполняйте команды по очереди:

####  Создать элемент:
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/api/items' -Method POST -Headers @{'Content-Type'='application/json'} -Body '{"name": "Example Item"}'
```

####  Получить все элементы:
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/api/items' -Method GET
```

####  Обновить элемент (ID=1):
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/api/items/1' -Method PUT -Headers @{'Content-Type'='application/json'} -Body '{"name": "Updated Item"}'
```

####  Удалить элемент (ID=1):
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/api/items/1' -Method DELETE
```

---

###  Способ 3: Автоматический тест

1. Откройте **ВТОРОЕ** окно PowerShell
2. Перейдите в папку проекта
3. Выполните: `.\test-api.ps1`
4. Скрипт автоматически протестирует все CRUD операции!

---

###  Способ 4: Postman (если установлен)

1. Откройте Postman
2. Создайте новый запрос
3. Используйте адреса:
   - POST: `http://localhost:3000/api/items`
   - GET: `http://localhost:3000/api/items`
   - PUT: `http://localhost:3000/api/items/1`
   - DELETE: `http://localhost:3000/api/items/1`

---

## ✅ Критерии выполнения задания

- [x] K1: Проект создан с помощью express-generator ✅
- [x] K2: Добавлены middleware (cors и body-parser) ✅
- [x] K3: Реализован CRUD API с Express Router ✅
- [x] K4: API протестирован и работает корректно ✅

---

##  Часто задаваемые вопросы

### Q: Сервер не запускается
**A:** Убедитесь, что порт 3000 свободен. Закройте другие приложения, которые могут его использовать.

### Q: "Cannot POST /api/items"
**A:** Проверьте, что сервер запущен и работает. Откройте http://localhost:3000/api/items в браузере.

### Q: Данные пропадают после перезапуска
**A:** Это нормально! Данные хранятся в памяти (массив). Для постоянного хранения нужна база данных.

### Q: CORS ошибки в браузере
**A:** Убедитесь, что в `app.js` есть строка `app.use(cors());` и она подключена ДО маршрутов.

---

##  Что вы узнали в этом проекте

✅ **Express Router** - как организовать маршруты в отдельных файлах  
✅ **CORS** - что это такое и зачем нужно  
✅ **body-parser** - как парсить JSON из тела запроса  
✅ **CRUD операции** - Create, Read, Update, Delete  
✅ **HTTP методы** - POST, GET, PUT, DELETE  
✅ **HTTP статус коды** - 200, 201, 204, 404  
✅ **RESTful API** - принципы построения API  

---

##  Дополнительные ресурсы

- [Express.js документация](https://expressjs.com/)
- [MDN HTTP методы](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [REST API туториал](https://restfulapi.net/)

---
