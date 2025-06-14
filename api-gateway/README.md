#  API Gateway – Naija Escrow Platform

This service serves as the central gateway for routing requests to microservices in the escrow platform. It also provides authentication middleware, rate limiting, and logging.

---

##  Features

- Proxies requests to user, order, payment, wallet, shipping, and notification services
- JWT authentication middleware
- IP-based rate limiting
- Security headers with Helmet
- Request logging with Morgan



##  Tech Stack

- Express.js
- express-http-proxy
- JSON Web Token (JWT)
- express-rate-limit
- Helmet, Morgan, CORS
- Dockerized

---

##  Authentication

Most services require JWT authentication via `Authorization: Bearer <token>`. Only `/api/users` is publicly accessible for login/register.

---

##  Environment Variables

```bash
PORT=3000
JWT_SECRET=your_jwt_secret

USER_SERVICE_URL=http://user-service:3001
ORDER_SERVICE_URL=http://order-service:3002
PAYMENT_SERVICE_URL=http://payment-service:3003
WALLET_SERVICE_URL=http://wallet-service:3004
NOTIFICATION_SERVICE_URL=http://notification-service:3005
SHIPPING_SERVICE_URL=http://shipping-service:3006
```

## Routes

| Route                | Requires Auth | Description                   |
| -------------------- | ------------- | ----------------------------- |
| `/api/users`         | ❌             | Proxy to user service         |
| `/api/orders`        | ✅             | Proxy to order service        |
| `/api/payments`      | ✅             | Proxy to payment service      |
| `/api/wallets`       | ✅             | Proxy to wallet service       |
| `/api/notifications` | ✅             | Proxy to notification service |


## Rate Limiting
Limits each IP to 100 requests per 10 minutes.