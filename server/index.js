import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD_HASH =
  process.env.ADMIN_PASSWORD_HASH ||
  crypto.createHash('sha256').update('password123').digest('hex');
const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';

app.use(cors());
app.use(express.json());

function verifyToken(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  const hash = crypto.createHash('sha256').update(password || '').digest('hex');
  if (email !== ADMIN_EMAIL || hash !== ADMIN_PASSWORD_HASH) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/api/admin/check', verifyToken, (req, res) => {
  res.json({ ok: true });
});
app.get('/', (req, res) => {
  res.send('Sunucu çalışıyor ✅');
});

// Example projects data
const projects = [
  {
    id: 1,
    title: 'Modern Villa',
    description: 'Large scale glass installation',
    image: '/images/project1.jpg',
    highlight: true
  },
  {
    id: 2,
    title: 'Office Center',
    description: 'PVC window replacement',
    image: '/images/project2.jpg',
    highlight: true
  },
  {
    id: 3,
    title: 'Shopping Mall',
    description: 'Curtain wall facade',
    image: '/images/project3.jpg',
    highlight: false
  }
];

app.get('/api/projects', (req, res) => {
  const { highlight } = req.query;
  if (highlight === 'true') {
    return res.json(projects.filter((p) => p.highlight));
  }
  res.json(projects);
});

// Example pricing configuration
const pricing = {
  products: {
    glass: { basePrice: 650 },
    pvc: { basePrice: 950 },
    balcony: { basePrice: 1200 }
  },
  features: {
    tempered: { label: 'Tempered Glass', multiplier: 1.25, products: ['glass'] },
    colored: { label: 'Colored', multiplier: 1.15, products: ['glass', 'pvc'] },
    double: { label: 'Double Glazing', multiplier: 1.35, products: ['glass'] }
  }
};

app.get('/api/pricing', (req, res) => {
  res.json(pricing);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend çalışıyor → http://localhost:${PORT}`);
});
