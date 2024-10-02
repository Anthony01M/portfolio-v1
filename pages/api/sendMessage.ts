/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
import { createReadStream, writeFileSync, statSync, unlinkSync } from 'fs';
import { join } from 'path';
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

    const webhookUrl = "https://canary.discord.com/api/webhooks/1291044991522836632/WdFjBXZ1mAD_P5RpGckwov7B6p2SmqYzdqWfSNkSX4qGaacFAxNeri6R19q6xqD9KATh";

    try {
      const uniqueId = generateUniqueId();
      const filePath = join(process.cwd(), `message-${uniqueId}.txt`);
      writeFileSync(filePath, message);

      const fileSize = statSync(filePath).size;
      if (fileSize > 8 * 1024 * 1024) {
        throw new Error('File size exceeds 8MB limit.');
      }

      const formData = new FormData();
      formData.append('file', createReadStream(filePath), `message.txt`);
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

      unlinkSync(filePath);

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
