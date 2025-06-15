# Naija Escrow Platform – Microservices Architecture

This project is a microservice-based Escrow Platform where businesses can create product orders, send payment links to buyers, and funds are securely held in escrow until delivery is confirmed. Upon confirmation, the funds are released to the business's wallet. If a buyer cancels an order, delivery fees are deducted and the remaining funds are refunded.

---

##  Features

-  Business can create orders and send payment links to buyers
-  Buyers can make secure payments that are held in escrow
-  Businesses ship products after payment
-  Buyers confirm delivery to release funds
-  Refund process with delivery fee deduction for cancelled orders
-  Businesses can have multiple admins
-  JWT authentication with role-based access
-  Built using an event-driven microservice architecture

---

##  System Design

![System Design](/docs/screenshots/systemdesign.png)

##  Microservices and clients

| Service             | Description                                               |
|---------------------|-----------------------------------------------------------|
| `user-service`      | Manages user accounts (buyers, businesses, admins)        |
| `order-service`     | Handles order creation, status updates, shipping info     |
| `payment-service`   | Generates payment links, processes payments, holds escrow |
| `wallet-service`    | Manages wallet balances and escrow transfers              |
| `notification-service` | Sends SMS/Email notifications to buyers and businesses |
| `dispute-service`   | handles conflicts between buyers and businesses for orders |
| `gateway-api`       | API gateway that routes requests to internal services     |
| `frontend`          | Web client built with Next.js                             |
| `mobile_app`       | Mobile client built with Flutter                           |

---

##  Tech Stack

- **Backend Framework:** Node.js ( Express)
- **Communication:** REST + RabbitMQ
- **Auth:** JWT with Role-based Access Control
- **Databases:**  MongoDB (per service)
- **Containerization:** Docker
- **CI/CD:** GitHub Actions 

---

##  Order Flow Summary

1. Business creates an order → `order-service`
2. Payment link generated → `payment-service`
3. Buyer pays → funds held in escrow
4. Business ships product → updates order status
5. Buyer confirms receipt → funds transferred to `wallet-service`
6. If cancelled: delivery fee deducted → refund processed

---

##  Event-Driven Architecture

Each service emits and listens to events over **RabbitMQ**. For example:

- `order.paid` → triggers shipping and wallet services
- `order.received` → triggers escrow release
- `order.cancelled` → triggers refund logic

---



## Project Structure

/escrow-platform
  /gateway-api
  /user-service
  /order-service
  /payment-service
  /wallet-service
  /notification-service
  /dispute-service
  /docs


## Prerequisites

 -   Node.js 

 -   Typescript

 -   Docker & Docker Compose

 -   RabbitMQ 

 -    MongoDB for DBs


## Run all services

```bash

git clone https://github.com/psalmsin1759/naijaescrow.git
cd naijaescrow

```



## Auth Roles

- buyer: Can pay and confirm orders

- business: Can create orders, ship products

- admin: Business-specific admins who manage orders and users


## Notifications

-    Email: Mailtrap, SendGrid, Resend API

-    SMS: Twilio 

-    Push Notification: Firebase

Events like OrderPaid, OrderShipped, OrderCompleted, OrderCancelled trigger notifications.


## Refund & Delivery Fee Logic

If a buyer cancels after payment:

-    The shipping-service calculates the delivery fee

-   payment-service deducts the fee

-    wallet-service processes a refund of the balance


## Messaging

  - RabbitMQ is used for inter-service event messaging

  - Events: order.created, payment.successful, dispute.opened, etc.


## Object Storage

  -  Used by dispute-service to store uploaded evidence files

  -  AWS S3

## Frontend (Next.js)

-  Located in /frontend

-  Provides the web UI for users and businesses

-  Integrated with api-gateway endpoints

```bash
cd frontend
npm install
npm run dev
```

## Mobile App (Flutter)

-  Located in /mobile_app

-  Targets both Android and iOS platforms

-  Interacts with api-gateway via HTTPS

```bash
cd mobile_app
flutter pub get
flutter run
```