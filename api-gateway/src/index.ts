import express, { Request, Response, NextFunction }  from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'naijaescrowsecret';

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // 100 requests per windowMs
});
app.use(limiter);


function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      (req as any).user = decoded;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}


const services = {
  user: process.env.USER_SERVICE_URL || 'http://localhost:3001',
  order: process.env.ORDER_SERVICE_URL || 'http://localhost:3002',
  payment: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3003',
  wallet: process.env.WALLET_SERVICE_URL || 'http://localhost:3004',
  notification: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005',
  dispute: process.env.DISPUTE_SERVICE_URL || 'http://localhost:3006',
};

app.use('/api/users', proxy(services.user));
app.use('/api/orders', authenticateJWT, proxy(services.order));
app.use('/api/payments', authenticateJWT, proxy(services.payment));
app.use('/api/wallets', authenticateJWT, proxy(services.wallet));
app.use('/api/notifications', authenticateJWT, proxy(services.notification));
app.use('/api/dispute', authenticateJWT, proxy(services.dispute));

app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
});
