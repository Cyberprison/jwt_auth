https://www.youtube.com/watch?v=fN25fMQZ2v0 \
Продвинутая JWT авторизация на React и Node js. Access, refresh, активация по почте \
Ulbi TV \

# Server

```
npm run swagger_nodemon
```

express
mongoose
mongodb
nodemon
dotenv

bcrypt
jsonwebtoken
uuid

swagger-autogen
swagger-ui-express

cookie-parser
cors

nodemailer

.env
```
PORT=5000
DB_URL=mongodb://root:example@127.0.0.1:27017/
JWT_ACCESS_SECRET=jwt-secret-key
JWT_REFRESH_SECRET=jwt-refresh-secret-key
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER=
SMTP_PASSWORD=
API_URL="http://localhost:5000"
```

влючить IMAP \
включить POP

git rm --cached .env \
".env" >> .gitignore

express-validator

# Client

interceptors - функция перехватчик запроса и ответа, типо промежуточного по, но на фронте

интерцептор добавления хедера к запросу

если успешный запрос

если ошибка то новый запрос на рефреш токена и заново

типо автоматизированный клиент

но всё это конечно же я не буду реализовывать, тк хз как во вью3 они пишутся

просто компоненты + запросы на XMLHttpRequest'ах

