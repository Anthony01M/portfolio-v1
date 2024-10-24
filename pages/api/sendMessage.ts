/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';
import axios from 'axios';

let requestCount = 0;
const windowMs = 60 * 1000;
const maxRequests = 50;
let resetTime = Date.now() + windowMs;

const resetRequestCount = () => {
  requestCount = 0;
  resetTime = Date.now() + windowMs;
};

const generateUniqueId = () => {
  return Math.floor(100 + Math.random() * 900).toString();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (Date.now() > resetTime) {
    resetRequestCount();
  }

  if (requestCount >= maxRequests) {
    return res.status(429).json({ success: false, error: 'Too many requests, please try again later.' });
  }

  requestCount++;

  if (req.method === 'POST') {
    const { name, email, reason, exactReason, message } = req.body;

    if (!name || !email || !reason || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields.' });
    }

    if (name.length > 125) {
      return res.status(400).json({ success: false, error: 'Name exceeds 125 characters limit.' });
    }

    if (email.length > 250) {
      return res.status(400).json({ success: false, error: 'Email exceeds 250 characters limit.' });
    }

    if (reason.length > 50) {
      return res.status(400).json({ success: false, error: 'Reason exceeds 50 characters limit.' });
    }

    if (exactReason.length > 250) {
      return res.status(400).json({ success: false, error: 'Exact Reason exceeds 250 characters limit.' });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      return res.status(500).json({ success: false, error: 'Webhook URL is not configured.' });
    }

    try {
      const uniqueId = generateUniqueId();
      const fileName = `message-${uniqueId}.txt`;
      const fileContent = message;

      const formData = new FormData();
      formData.append('file', Buffer.from(fileContent, 'utf-8'), fileName);
      formData.append('payload_json', JSON.stringify({
        content: `**Name**: ${name}\n**Email**: ${email}\n**Reason**: ${reason}\n${exactReason ? `**Exact Reason**: ${exactReason}\n` : ''}`,
      }));

      const response = await axios.post(webhookUrl, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      if (response.status !== 200) {
        throw new Error(`Failed to send message: ${response.statusText} - ${response.data}`);
      }

      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("Error sending message to Discord:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}