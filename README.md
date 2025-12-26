СТЕК: 
    backend: express
             разделил проект на контроллеры/модель/роуты
             тестирование модели через jest
    frontend: vite + react + tailwind + react router
              запрос /api/service.js через axios

    общие: добавил линтер + prettier; настроил docker

Запуск (*cd dashboard):
1) local:
    npm run setup
    npm run dev


2) docker:
    docker-compose up


Что можно улучшить (no time :sad): 
    использовать Typescript
    заменить react router на TanStack router
    использовать state менеджер, например zustand, но у меня мало useState + в одной компоненте + нет prop drilling
    покрыть весь код, а не только модель юнит тестами
    CI pipeline ?
 




