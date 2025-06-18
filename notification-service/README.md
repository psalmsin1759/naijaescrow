#  Notification Service – NaijaEscrow Platform

The **Notification Service** is a Node.js microservice written in TypeScript that consumes messages from RabbitMQ queues and dispatches notifications via Email, SMS, and Push.

It supports pluggable providers for email and SMS using abstract classes, allowing you to switch providers via environment variables.

### Features

- Listens to RabbitMQ queues:

    - email_notification

    - sms_notification

    - push_notification

- Sends:

    - Emails via configurable providers (e.g., MailTrap, SendGrid)

    - SMS via configurable providers (Twilio)

    - Push notifications (placeholder or implement your own)

- Swappable providers using abstract interface classes

- TypeScript-first codebase



### Tech Stack

-  Node.js + TypeScript

- RabbitMQ

- Nodemailer / MailTrap / SendGrid (Email Providers)

- Twilio / Termii (SMS Providers)


### Directory structure

```text
src/
├── interfaces/                   # Abstract interfaces for email/sms providers
│   ├── EmailProviderInterface.ts
│   └── SmsProviderInterface.ts
├── providers/                   # Implementations of providers
│   ├── email/
│   │   ├── MailTrapProvider.ts
│   │   └── SendGridProvider.ts
│   └── sms/
│       ├── TermiiProvider.ts
│       └── TwilioProvider.ts
├── services/                   # Logic for sending notifications
│   ├── emailService.ts
│   ├── smsService.ts
│   └── pushNotificationService.ts
├── templates/                  # HTML email templates
│   └── emailTemplate.html
├── config/                     # Config files (queue setup, env loaders)
└── index.ts                   # Entry point for RabbitMQ consumer
```

###  Configuration

```bash
PORT=4000
RABBITMQ_URL=amqp://localhost
EMAIL_PROVIDER=mailtrap          
SMS_PROVIDER=twilio             


MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USERNAME=your_username
MAILTRAP_PASSWORD=your_password
EMAIL_USER=noreply@example.com


SENDGRID_API_KEY=your_sendgrid_key

```


### How It Works


-  The service connects to RabbitMQ and listens to 3 queues:

    - email_notification

    - sms_notification

    - push_notification

- Each queue has a handler:

    - Email: Loads an HTML template and sends an email via the selected provider.

    - SMS: Sends a text message via the selected SMS provider.

    - Push: Placeholder for sending push notifications.

    Message format in queue:

```bash
{
  "data": {
    "to": "samson@example.com",
    "subject": "Welcome to Crowdfundr",
    "body": "Hello, thanks for signing up."
  }
}

```

![System Design](/docs/screenshots/emailtemplate.png)



### Switching Providers
- Email

- Set EMAIL_PROVIDER in .env to:

    - mailtrap — Uses MailTrap SMTP

    -  sendgrid — Uses SendGrid API

- SMS

- Set SMS_PROVIDER in .env to:

    - termii — Uses Termii API

    - twilio — Uses Twilio API

Each provider implements its respective interface, and the service dynamically loads the correct one based on the environment variable.


### Running the Service
```bash
npm install
npm run dev

```

### Queue Setup (RabbitMQ)

You can publish test messages using any RabbitMQ publisher or amqplib in Node.js.

Queue: email_notification

```bash
{
  "data": {
    "to": "user@example.com",
    "subject": "Account Verified",
    "body": "Your account has been successfully verified."
  }
}

```

![System Design](/docs/screenshots/rabbitmqsc.png)


### Build for Production

```bash
npm run build
npm start

```