import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy-loaded Gemini AI Helper
let aiInstance: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY is not configured in the system variables.');
    }
    aiInstance = new GoogleGenAI({ apiKey: key });
  }
  return aiInstance;
}

// Fullstack API routes first
app.post('/api/concierge', async (req, res) => {
  try {
    const { prompt, language = 'en', booking } = req.body;

    // Direct lazy-loading instance fetch
    const ai = getAI();

    const systemPrompt = `You are the quiet advisor and master grand concierge AI for SASALLE, a boutique ultra-luxury hotel sanctuary tucked alongside pristine sandstone ridges on Batam island, Indonesia, inspired by Aman resorts, Bulgari hotels, and French architectural precision.
Your voice is highly sophisticated, poised, objective, and deeply respectful. Avoid normal conversational filler, exclamation marks, or promotional sales hype (such as "Certainly!", "I'm delighted to help you!", or emojis). Write with the editorial cadence of a high-end luxury design journal.

Current reservation context logged into the terminal:
- Reservation Reference: ${booking ? booking.id : 'Lounge walkthrough walkthrough'}
- Residential Room Sanctuary: ${booking ? booking.roomName : 'Lobby hearth'}
- Target Convection Temp: ${booking ? booking.preferences.roomTemp + '°C' : 'unadjusted'}
- Pre-Arrival Pantry Selection: ${booking ? booking.preferences.preArrivalPantry.join(', ') : 'default organic water'}
- Port Shuttle Lounge: ${booking && booking.preferences.airportTransfer.enabled ? booking.preferences.airportTransfer.vehiclePref + ' S-Class/Vellfire dispatching' : 'none requested'}

Address the guest inquiry directly in their chosen language (${language}) or English if unstated. Seamlessly weave real luxury materials (and Batam-specific elements like hand-fired emerald Hijau Nyonya glazed wall tiles, clay breeze block stair towers, dark riverbed basalt, fine ivory linens) into recommendations on experiences.
Guide them carefully towards our tailored spa experiences (The Stone Bathing Ritual with Indonesian basalt blocks, the Hijau Nyonya Clay Wrap), or culinary manifestations at The Brick & Iron kitchen fires (Phase I: Earth, Phase II: Metal, Phase III: Glass). Keep responses under 180 words for luxury conciseness.`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 400,
        temperature: 0.3,
      }
    });

    res.json({ reply: response.text });
  } catch (err: any) {
    console.warn('[Fullstack Log] Gemini error or undefined key:', err.message);
    // Silent failover to ultra-lux offline advisor
    res.json({
      reply: "Your request is synchronized directly into the Sasalle stone ledger. I am organizing assistance with the physical house butlers shortly. Comfort remains absolute."
    });
  }
});

// Mounting Vite Development Middleware or Production serving
async function mountViteMiddleware() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('[Dev mode] Vite middleware registered securely on port 3000');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('[Prod mode] Serving compiled client static indices from /dist');
  }
}

mountViteMiddleware().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Sasalle Hospitality Operating System] active at http://0.0.0.0:${PORT}`);
  });
});
