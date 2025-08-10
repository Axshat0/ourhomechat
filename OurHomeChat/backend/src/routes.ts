import type { Express } from "express";
import { storage } from "./storage.js";
import { insertUserSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express): void {
  const ALLOWED_USERS = ['akshu', 'paru'];

  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const { username } = insertUserSchema.parse(req.body);
      
      if (!ALLOWED_USERS.includes(username)) {
        return res.status(403).json({ 
          message: "Access denied. This is a private chat for akshu and paru only." 
        });
      }

      let user = await storage.getUserByUsername(username);
      if (!user) {
        user = await storage.createUser({ username });
      }

      res.json({ user });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid username" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all messages
  app.get("/api/messages", async (_req, res) => {
    try {
      const messages = await storage.getAllMessages();
      res.json({ messages });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Send message
  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      
      if (!ALLOWED_USERS.includes(messageData.sender)) {
        return res.status(403).json({ message: "Unauthorized sender" });
      }

      const message = await storage.createMessage(messageData);
      res.json({ message });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid message data" });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Delete all messages
  app.delete("/api/messages", async (_req, res) => {
    try {
      await storage.deleteAllMessages();
      res.json({ message: "All messages deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete messages" });
    }
  });

}
