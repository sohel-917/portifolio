import express from "express";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "shaik_sohel_super_secret_jwt_key_2026";
const FALLBACK_DB_PATH = path.join(process.cwd(), "db_fallback.json");

app.use(express.json());

// Enable CORS for testing
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// JSON Fallback Database Structure
interface FallbackData {
  users: any[];
  projects: any[];
  contacts: any[];
}

const DEFAULT_PROJECTS = [
  {
    id: "proj_1",
    title: "Type Master",
    description: "An interactive, beautiful typing practice application designed to calculate real-time typing speed (WPM) and accuracy, and visualize performance improvements dynamically.",
    longDescription: "Type Master is a heavy-duty typing tutor featuring progress tracking, multiple difficulty levels, live charts for accuracy and speed metrics, custom paragraphs, and responsive layout. Created to help developers and students boost their typing accuracy and speed over time.",
    category: "Web Application",
    technologies: ["React.js", "Tailwind CSS", "TypeScript", "Motion", "LocalStorage"],
    githubUrl: "https://github.com/sohel-917/type-master.git",
    liveUrl: "https://typetext2.vercel.app/",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600",
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "proj_2",
    title: "Personalized Financial Behaviour Analyzer",
    description: "An AI-powered fintech application that parses monthly spend statements, identifies category-wise anomalies, detects overspending, and provides custom recommendations.",
    longDescription: "This advanced fintech application integrates behavioral financial models with AI-driven analytics. Users can enter transaction sets, visual dashboards compute budget health scores, detect risky behavior patterns, and receive high-impact recommendations to improve their credit rating.",
    category: "Artificial Intelligence & Fintech",
    technologies: ["React.js", "Node.js", "Express.js", "Mongoose", "Tailwind CSS", "Recharts"],
    githubUrl: "https://github.com/sohel-917/behaviour-analyzer.git",
    liveUrl: "https://behaviour-analyzer.vercel.app/",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=600",
    featured: true,
    createdAt: new Date().toISOString()
  }
];

// Helper to manage JSON DB fallback
function getFallbackDb(): FallbackData {
  const targetPassword = "Sohel@9177";
  if (!fs.existsSync(FALLBACK_DB_PATH)) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(targetPassword, salt);
    const initialData: FallbackData = {
      users: [
        {
          id: "u_1",
          email: "sks510805@gmail.com",
          password: hashedPassword,
          name: "Shaik Sohel",
        }
      ],
      projects: DEFAULT_PROJECTS,
      contacts: []
    };
    fs.writeFileSync(FALLBACK_DB_PATH, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  try {
    const data: FallbackData = JSON.parse(fs.readFileSync(FALLBACK_DB_PATH, "utf-8"));
    let updated = false;
    if (data.users && data.users.length > 0) {
      data.users.forEach(u => {
        if (u.email === "sks510805@gmail.com") {
          const isCorrect = bcrypt.compareSync(targetPassword, u.password);
          if (!isCorrect) {
            const salt = bcrypt.genSaltSync(10);
            u.password = bcrypt.hashSync(targetPassword, salt);
            updated = true;
          }
        }
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(targetPassword, salt);
      data.users = [
        {
          id: "u_1",
          email: "sks510805@gmail.com",
          password: hashedPassword,
          name: "Shaik Sohel",
        }
      ];
      updated = true;
    }
    if (updated) {
      fs.writeFileSync(FALLBACK_DB_PATH, JSON.stringify(data, null, 2));
    }
    return data;
  } catch (error) {
    console.error("Error reading fallback JSON database. Rebuilding.", error);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(targetPassword, salt);
    const initialData: FallbackData = {
      users: [
        {
          id: "u_1",
          email: "sks510805@gmail.com",
          password: hashedPassword,
          name: "Shaik Sohel",
        }
      ],
      projects: DEFAULT_PROJECTS,
      contacts: []
    };
    fs.writeFileSync(FALLBACK_DB_PATH, JSON.stringify(initialData, null, 2));
    return initialData;
  }
}

function saveFallbackDb(data: FallbackData) {
  fs.writeFileSync(FALLBACK_DB_PATH, JSON.stringify(data, null, 2));
}

// MongoDB Connection attempt with strict fallback checks
let isMongoConnected = false;
const MONGODB_URI = process.env.MONGODB_URI;

// Define Mongoose Schemas if connected
let UserMode: any = null;
let ProjectModel: any = null;
let ContactModel: any = null;

if (MONGODB_URI) {
  console.log("Attempting to connect to MongoDB Atlas...");
  try {
    // Prevent unhandled background error events from crashing Node process
    mongoose.connection.on("error", err => {
      console.error("Mongoose connection background error event:", err.message);
      isMongoConnected = false;
      // Close any active connection attempts to halt background retry loops
      mongoose.disconnect().catch(() => {});
    });

    mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 // Fast failing (5s timeout) instead of 30s hang
    })
      .then(() => {
        console.log("MongoDB Atlas connected successfully!");
        isMongoConnected = true;

        // Define MongoDB Schemas
        const userSchema = new mongoose.Schema({
          email: { type: String, required: true, unique: true },
          password: { type: String, required: true },
          name: { type: String, required: true }
        });

        const projectSchema = new mongoose.Schema({
          title: { type: String, required: true },
          description: { type: String, required: true },
          longDescription: String,
          category: { type: String, required: true },
          technologies: [String],
          githubUrl: String,
          liveUrl: String,
          imageUrl: String,
          featured: { type: Boolean, default: false },
          createdAt: { type: Date, default: Date.now }
        });

        const contactSchema = new mongoose.Schema({
          name: { type: String, required: true },
          email: { type: String, required: true },
          subject: { type: String, required: true },
          message: { type: String, required: true },
          createdAt: { type: Date, default: Date.now }
        });

        UserMode = mongoose.models.User || mongoose.model("User", userSchema, "users");
        ProjectModel = mongoose.models.Project || mongoose.model("Project", projectSchema, "projects");
        ContactModel = mongoose.models.Contact || mongoose.model("Contact", contactSchema, "contacts");

        // Auto-seed admin user and default projects if collection empty
        seedMongoDatabase();
      })
      .catch(err => {
        console.error("MongoDB Connection Promise Rejected. Reverting to JSON disk fallback.", err.message);
        isMongoConnected = false;
        // Explicitly disconnect to stop any background driver retries
        mongoose.disconnect().catch(() => {});
        getFallbackDb(); // Initialize JSON DB fallback
      });
  } catch (syncErr: any) {
    console.error("Synchronous error during MongoDB setup / URL parsing. Reverting to JSON disk fallback:", syncErr.message);
    isMongoConnected = false;
    mongoose.disconnect().catch(() => {});
    getFallbackDb(); // Initialize JSON DB fallback
  }
} else {
  console.log("No MONGODB_URI found in environment. Reverting to JSON disk fallback.");
  getFallbackDb(); // Initialize JSON DB fallback
}

// Function to auto-seed MongoDB standard collections
async function seedMongoDatabase() {
  try {
    const salt = bcrypt.genSaltSync(10);
    const targetPasswordHash = bcrypt.hashSync("Sohel@9177", salt);

    const existingUser = await UserMode.findOne({ email: "sks510805@gmail.com" });
    if (!existingUser) {
      await UserMode.create({
        email: "sks510805@gmail.com",
        password: targetPasswordHash,
        name: "Shaik Sohel"
      });
      console.log("Admin user seeded to MongoDB with updated credentials.");
    } else {
      const isCorrect = bcrypt.compareSync("Sohel@9177", existingUser.password);
      if (!isCorrect) {
        existingUser.password = targetPasswordHash;
        await existingUser.save();
        console.log("Existing Admin user credentials upgraded in MongoDB.");
      }
    }

    const projectCount = await ProjectModel.countDocuments();
    if (projectCount === 0) {
      await ProjectModel.insertMany(DEFAULT_PROJECTS.map(p => {
        const { id, ...rest } = p;
        return rest;
      }));
      console.log("Demo projects seeded to MongoDB.");
    }
  } catch (err) {
    console.error("Error seeding MongoDB:", err);
  }
}

// Authentication Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access Denied: No Token Provided" });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: "Invalid or Expired Token" });
    req.user = user;
    next();
  });
};

/* ==========================================
   REST APIs
   ========================================== */

// Auth API Status Info
app.get("/api/db-status", (req, res) => {
  res.json({
    status: "online",
    databaseType: isMongoConnected ? "MongoDB Atlas" : "JSON disk fallback (server-level file system persistence)",
    authRequirement: "sh510805 Admin JWT Authentication (Email: sks510805@gmail.com)"
  });
});

// POST: Admin Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    let user: any = null;

    if (isMongoConnected) {
      user = await UserMode.findOne({ email: email.toLowerCase() });
    } else {
      const db = getFallbackDb();
      user = db.users.find(u => u.email === email.toLowerCase());
    }

    if (!user) {
      return res.status(401).json({ error: "Access denied. Credentials mismatch." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Access denied. Credentials mismatch." });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id || user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user._id || user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET: All projects
app.get("/api/projects", async (req, res) => {
  try {
    if (isMongoConnected) {
      const projects = await ProjectModel.find().sort({ createdAt: -1 });
      res.json(projects);
    } else {
      const db = getFallbackDb();
      // Sort in-memory projects descending
      const sorted = [...db.projects].sort((a, b) => {
        return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime();
      });
      res.json(sorted);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Create a Project (Admin Required)
app.post("/api/projects", authenticateToken, async (req, res) => {
  try {
    const { title, description, longDescription, category, technologies, githubUrl, liveUrl, imageUrl, featured } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ error: "Title, description and category are required fields." });
    }

    const projectData = {
      title,
      description,
      longDescription: longDescription || description,
      category,
      technologies: Array.isArray(technologies) ? technologies : technologies ? technologies.split(",").map((t: string) => t.trim()) : [],
      githubUrl: githubUrl || "",
      liveUrl: liveUrl || "",
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
      featured: featured === true || featured === "true",
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected) {
      const newProject = await ProjectModel.create(projectData);
      res.status(201).json(newProject);
    } else {
      const db = getFallbackDb();
      const id = "proj_" + Date.now();
      const newProject = { id, ...projectData };
      db.projects.push(newProject);
      saveFallbackDb(db);
      res.status(201).json(newProject);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update a Project (Admin Required)
app.put("/api/projects/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, longDescription, category, technologies, githubUrl, liveUrl, imageUrl, featured } = req.body;

    if (isMongoConnected) {
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        id,
        {
          title,
          description,
          longDescription,
          category,
          technologies: Array.isArray(technologies) ? technologies : technologies ? technologies.split(",").map((t: string) => t.trim()) : [],
          githubUrl,
          liveUrl,
          imageUrl,
          featured: featured === true || featured === "true"
        },
        { new: true }
      );
      if (!updatedProject) return res.status(404).json({ error: "Project not found" });
      res.json(updatedProject);
    } else {
      const db = getFallbackDb();
      const index = db.projects.findIndex(p => p.id === id || p._id === id);
      if (index === -1) return res.status(404).json({ error: "Project not found in fallback storage" });

      const currentProj = db.projects[index];
      const updatedProject = {
        ...currentProj,
        title: title !== undefined ? title : currentProj.title,
        description: description !== undefined ? description : currentProj.description,
        longDescription: longDescription !== undefined ? longDescription : currentProj.longDescription,
        category: category !== undefined ? category : currentProj.category,
        technologies: technologies !== undefined ? (Array.isArray(technologies) ? technologies : technologies.split(",").map((t: string) => t.trim())) : currentProj.technologies,
        githubUrl: githubUrl !== undefined ? githubUrl : currentProj.githubUrl,
        liveUrl: liveUrl !== undefined ? liveUrl : currentProj.liveUrl,
        imageUrl: imageUrl !== undefined ? imageUrl : currentProj.imageUrl,
        featured: featured !== undefined ? (featured === true || featured === "true") : currentProj.featured,
      };

      db.projects[index] = updatedProject;
      saveFallbackDb(db);
      res.json(updatedProject);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete a Project (Admin Required)
app.delete("/api/projects/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      const deletedProject = await ProjectModel.findByIdAndDelete(id);
      if (!deletedProject) return res.status(404).json({ error: "Project not found" });
      res.json({ message: "Project successfully deleted from MongoDB", deletedProject });
    } else {
      const db = getFallbackDb();
      const initialCount = db.projects.length;
      db.projects = db.projects.filter(p => p.id !== id && p._id !== id);
      if (db.projects.length === initialCount) {
        return res.status(404).json({ error: "Project not found in fallback" });
      }
      saveFallbackDb(db);
      res.json({ message: "Project successfully deleted from fallback storage" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Save contact inquiry message
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required. Please check inputs." });
    }

    const contactData = {
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString()
    };

    let savedContact: any = null;
    let savedMode = "Local Disk";

    // Always store to local JSON fallback database first to guarantee persistence
    const db = getFallbackDb();
    const id = "con_" + Date.now();
    const localContact = { id, ...contactData };
    db.contacts.push(localContact);
    saveFallbackDb(db);
    savedContact = localContact;

    // If MongoDB is connected, also mirror to Atlas
    if (isMongoConnected) {
      try {
        const mongoContact = await ContactModel.create(contactData);
        savedContact = mongoContact;
        savedMode = "MongoDB & Local Disk";
      } catch (mongoErr: any) {
        console.error("Failed primary mirror of contact to MongoDB, kept in local fallback:", mongoErr);
      }
    }

    res.status(201).json({
      message: "Your inquiry has been submitted and securely logged in the administrator inquiry records.",
      contact: savedContact
    });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET: All contact inquiries (Admin Required)
app.get("/api/contact", authenticateToken, async (req, res) => {
  try {
    const db = getFallbackDb();
    let allContacts = [...(db.contacts || [])];

    if (isMongoConnected) {
      try {
        const mongoContacts = await ContactModel.find().lean();
        
        // Deduplicate based on name, email, and message to avoid copying identical double-written elements
        const existingKeys = new Set(allContacts.map(c => `${c.name}_${c.email}_${c.message}`));
        
        for (const mc of mongoContacts) {
          const key = `${mc.name}_${mc.email}_${mc.message}`;
          if (!existingKeys.has(key)) {
            allContacts.push({
              id: mc._id.toString(),
              name: mc.name,
              email: mc.email,
              subject: mc.subject,
              message: mc.message,
              createdAt: mc.createdAt instanceof Date 
                ? mc.createdAt.toISOString() 
                : (mc.createdAt ? new Date(mc.createdAt).toISOString() : new Date().toISOString())
            });
            existingKeys.add(key);
          }
        }
      } catch (mongoErr: any) {
        console.error("Failed to query contacts from MongoDB, reading from JSON fallback:", mongoErr);
      }
    }

    // Sort contacts by createdAt date in descending order
    const sorted = allContacts.sort((a, b) => {
      return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime();
    });

    res.json(sorted);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete a hybrid contact inquiry or log entry (Admin Required)
app.delete("/api/contact/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve local fallback DB first to look up contact's details for MongoDB deleted-by-fields correlation
    const db = getFallbackDb();
    const localContact = (db.contacts || []).find(c => c.id === id || c._id === id);

    let deletedFromMongo = false;
    if (isMongoConnected) {
      // 1. Try deleting by ID directly, but only if it matches standard 24-char ObjectId hex format
      // to avoid Mongoose CastErrors when a user inputs a local fallback id (e.g., con_174...)
      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      if (isValidObjectId) {
        try {
          const deletedContact = await ContactModel.findByIdAndDelete(id);
          if (deletedContact) {
            deletedFromMongo = true;
          }
        } catch (mongoErr: any) {
          console.error("MongoDB direct contact deletion failed:", mongoErr.message);
        }
      }

      // 2. If it hasn't been deleted yet (or was selected as a local "con_..." ID), matching details
      if (!deletedFromMongo && localContact) {
        try {
          const deletedResult = await ContactModel.deleteMany({
            name: localContact.name,
            email: localContact.email,
            message: localContact.message
          });
          if (deletedResult.deletedCount > 0) {
            deletedFromMongo = true;
          }
        } catch (mongoErr: any) {
          console.error("MongoDB contact fields-matching deletion failed:", mongoErr.message);
        }
      }
    }

    // Always clean up fallback db list (to ensure perfect synchronization of deletions)
    const initialCount = (db.contacts || []).length;
    db.contacts = (db.contacts || []).filter(c => c.id !== id && c._id !== id);
    const deletedFromFallback = db.contacts.length < initialCount;
    
    if (deletedFromFallback) {
      saveFallbackDb(db);
    }

    if (!deletedFromMongo && !deletedFromFallback) {
      return res.status(404).json({ error: "Contact inquiry log not found in active collections." });
    }

    res.json({ 
      success: true, 
      message: "Contact inquiry successfully deleted.",
      deletedFromMongo,
      deletedFromFallback
    });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* ==========================================
   VITE & STATIC ASSET INGRESS SERVERS
   ========================================== */

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Vite middleware mode in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Static production build directories
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`=================================================`);
    console.log(`Portfilio Server is operational on Port : ${PORT}`);
    console.log(`Development API Ingress Status: Active`);
    console.log(`Default login user: sks510805@gmail.com`);
    console.log(`=================================================`);
  });
}

startServer();
