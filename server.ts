import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Endpoint: AI Symptom analysis
app.post('/api/symptom-analysis', async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms || typeof symptoms !== 'string') {
       res.status(400).json({ error: 'Symptoms string is required.' });
       return;
    }

    const availableSpecialties = [
      'Kardiyoloji',
      'Dermatoloji',
      'Nöroloji',
      'Ortopedi ve Travmatoloji',
      'Göz Hastalıkları',
      'Kulak Burun Boğaz (KBB)',
      'Çocuk Sağlığı ve Hastalıkları',
      'İç Hastalıkları (Dahiliye)',
      'Genel Cerrahi',
      'Kadın Hastalıkları ve Doğum',
      'Üroloji',
      'Plastik, Rekonstrüktif ve Estetik Cerrahi',
      'Fiziksel Tıp ve Rehabilitasyon',
      'Göğüs Hastalıkları',
      'Ruh Sağlığı ve Hastalıkları (Psikiyatri)',
      'Tıbbi Onkoloji',
      'Beyin ve Sinir Cerrahisi (Nöroşirürji)',
      'Gastroenteroloji'
    ];

    const prompt = `Analiz edilecek hasta şikayeti: "${symptoms}"

Lütfen hastanın belirttiği belirtileri değerlendirip, gitmesi gereken en uygun tıbbi uzmanlık alanını belirle.
Uzmanlık alanı mutlaka şu listeden birebir eşleşen bir eleman olmalıdır: ${JSON.stringify(availableSpecialties)}. Birebir eşleşmiyorsa en yakın olanı seç.

Semptom analizi sonucunu şu JSON şemasına uygun olarak üret:
{
  "branch": "Seçilen Uzmanlık Alanı",
  "explanation": "Detaylı Türkçe semptom analizi ve neden bu branşa yönlendirildiği bilgisi.",
  "precaution": "Yedek önleyici tedbirler, erken uyarılar veya yapılması/yapılmaması gerekenler. Bu analiz tıbbi tanı yerine geçmez uyarısını da içermeli.",
  "matchedKeywords": ["semptom1", "semptom2", "belirti3"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            branch: {
              type: Type.STRING,
              description: 'The recommended specialty branch, strictly matched to one of the provided options'
            },
            explanation: {
              type: Type.STRING,
              description: 'Explanation in Turkish about why this branch was suggested and what is evaluated'
            },
            precaution: {
              type: Type.STRING,
              description: 'Precautions and medical disclaimer in Turkish'
            },
            matchedKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Keywords and signals detected in patient description'
            }
          },
          required: ['branch', 'explanation', 'precaution', 'matchedKeywords']
        }
      }
    });

    const resultText = response.text || '{}';
    const parsedData = JSON.parse(resultText);
    res.json(parsedData);
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: 'Yapay zeka analiz servislerinde bir hata meydana geldi.',
      details: error.message
    });
  }
});

// Vite Middleware for Asset Handling & SPA Fallback
const isProduction = process.env.NODE_ENV === 'production';

async function bootstrap() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CareTrust fullstack server listening on http://0.0.0.0:${PORT}`);
  });
}

bootstrap();
