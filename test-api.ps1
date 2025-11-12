# Скрипт для тестирования CRUD API

Write-Host "=== Тестирование CRUD API ===" -ForegroundColor Green
Write-Host ""

# 1. Создание элемента
Write-Host "1. Создаём элемент..." -ForegroundColor Yellow
$createResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/items" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body '{"name": "Example Item"}' `
    -UseBasicParsing

Write-Host "Статус: $($createResponse.StatusCode)" -ForegroundColor Cyan
Write-Host "Ответ: $($createResponse.Content)" -ForegroundColor Cyan
Write-Host ""

# 2. Получение списка элементов
Write-Host "2. Получаем список всех элементов..." -ForegroundColor Yellow
$listResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/items" `
    -Method GET `
    -UseBasicParsing

Write-Host "Статус: $($listResponse.StatusCode)" -ForegroundColor Cyan
Write-Host "Ответ: $($listResponse.Content)" -ForegroundColor Cyan
Write-Host ""

# 3. Обновление элемента
Write-Host "3. Обновляем элемент с ID=1..." -ForegroundColor Yellow
$updateResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/items/1" `
    -Method PUT `
    -Headers @{"Content-Type"="application/json"} `
    -Body '{"name": "Updated Item"}' `
    -UseBasicParsing

Write-Host "Статус: $($updateResponse.StatusCode)" -ForegroundColor Cyan
Write-Host "Ответ: $($updateResponse.Content)" -ForegroundColor Cyan
Write-Host ""

# 4. Проверяем обновление
Write-Host "4. Проверяем, что элемент обновился..." -ForegroundColor Yellow
$checkResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/items" `
    -Method GET `
    -UseBasicParsing

Write-Host "Статус: $($checkResponse.StatusCode)" -ForegroundColor Cyan
Write-Host "Ответ: $($checkResponse.Content)" -ForegroundColor Cyan
Write-Host ""

# 5. Удаление элемента
Write-Host "5. Удаляем элемент с ID=1..." -ForegroundColor Yellow
$deleteResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/items/1" `
    -Method DELETE `
    -UseBasicParsing

Write-Host "Статус: $($deleteResponse.StatusCode)" -ForegroundColor Cyan
Write-Host ""

# 6. Проверяем удаление
Write-Host "6. Проверяем, что элемент удалён..." -ForegroundColor Yellow
$finalResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/items" `
    -Method GET `
    -UseBasicParsing

Write-Host "Статус: $($finalResponse.StatusCode)" -ForegroundColor Cyan
Write-Host "Ответ: $($finalResponse.Content)" -ForegroundColor Cyan
Write-Host ""

Write-Host "=== Тестирование завершено ===" -ForegroundColor Green
