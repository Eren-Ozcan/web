import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

const dataDir = path.join(process.cwd(), 'server', 'data');
const contentFile = path.join(dataDir, 'content.json');
const enFile = path.join(dataDir, 'en.json');
const trFile = path.join(dataDir, 'tr.json');

app.use(cors());
app.use(express.json());

// Utility to load JSON data from file
function loadJson(file, fallback) {
  try {
    const text = fs.readFileSync(file, 'utf8');
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

function saveJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

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
    tempered: {
      label: 'feature_tempered_glass',
      multiplier: 1.25,
      products: ['glass']
    },
    colored: {
      label: 'feature_colored',
      multiplier: 1.15,
      products: ['glass', 'pvc']
    },
    double: {
      label: 'feature_double_glazing',
      multiplier: 1.35,
      products: ['glass']
    }
  }
};

app.get('/api/pricing', (req, res) => {
  res.json(pricing);
});

// Content management endpoints
app.get('/api/content', (req, res) => {
  const data = loadJson(contentFile, {});
  res.json(data);
});

app.post('/api/content', (req, res) => {
  try {
    saveJson(contentFile, req.body);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'save_failed' });
  }
});

app.get('/api/translations', (req, res) => {
  const en = loadJson(enFile, {});
  const tr = loadJson(trFile, {});
  res.json({ en, tr });
});

app.post('/api/translations', (req, res) => {
  try {
    const { en, tr } = req.body || {};
    if (en) saveJson(enFile, en);
    if (tr) saveJson(trFile, tr);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'save_failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend çalışıyor → http://localhost:${PORT}`);
});
