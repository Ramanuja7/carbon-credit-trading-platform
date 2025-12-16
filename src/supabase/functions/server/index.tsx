import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1a42b77c/health", (c) => {
  return c.json({ status: "ok" });
});

// ============ AUTH ROUTES ============

// Sign up endpoint
app.post("/make-server-1a42b77c/signup", async (c) => {
  try {
    const { email, password, name, userType } = await c.req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, userType },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });
    
    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }
    
    // Store user profile in KV store
    await kv.set(`user:${email}`, {
      name,
      email,
      userType,
      createdAt: new Date().toISOString()
    });
    
    // Initialize empty data structures
    await kv.set(`portfolio:${email}`, []);
    await kv.set(`transactions:${email}`, []);
    
    return c.json({ 
      success: true,
      user: { name, email, userType }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Failed to create account' }, 500);
  }
});

// Sign in endpoint - get user data
app.post("/make-server-1a42b77c/signin", async (c) => {
  try {
    const { email } = await c.req.json();
    
    // Get user profile from KV store
    const userProfile = await kv.get(`user:${email}`);
    
    if (!userProfile) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    return c.json({ user: userProfile });
  } catch (error) {
    console.error('Signin error:', error);
    return c.json({ error: 'Failed to sign in' }, 500);
  }
});

// ============ USER DATA ROUTES ============

// Get user's full data (portfolio, transactions, sell orders)
app.get("/make-server-1a42b77c/user-data/:email", async (c) => {
  try {
    const email = c.req.param('email');
    
    const portfolio = await kv.get(`portfolio:${email}`) || [];
    const transactions = await kv.get(`transactions:${email}`) || [];
    const allSellOrders = await kv.get('sellOrders:all') || [];
    
    return c.json({
      portfolio,
      transactions,
      sellOrders: allSellOrders
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return c.json({ error: 'Failed to fetch user data' }, 500);
  }
});

// ============ PORTFOLIO ROUTES ============

// Update portfolio
app.post("/make-server-1a42b77c/portfolio/:email", async (c) => {
  try {
    const email = c.req.param('email');
    const portfolio = await c.req.json();
    
    await kv.set(`portfolio:${email}`, portfolio);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    return c.json({ error: 'Failed to update portfolio' }, 500);
  }
});

// ============ TRANSACTION ROUTES ============

// Add transaction
app.post("/make-server-1a42b77c/transactions/:email", async (c) => {
  try {
    const email = c.req.param('email');
    const newTransaction = await c.req.json();
    
    const transactions = await kv.get(`transactions:${email}`) || [];
    const updatedTransactions = [newTransaction, ...transactions];
    
    await kv.set(`transactions:${email}`, updatedTransactions);
    
    return c.json({ success: true, transactions: updatedTransactions });
  } catch (error) {
    console.error('Error adding transaction:', error);
    return c.json({ error: 'Failed to add transaction' }, 500);
  }
});

// ============ SELL ORDER ROUTES ============

// Get all sell orders
app.get("/make-server-1a42b77c/sell-orders", async (c) => {
  try {
    const sellOrders = await kv.get('sellOrders:all') || [];
    return c.json({ sellOrders });
  } catch (error) {
    console.error('Error fetching sell orders:', error);
    return c.json({ error: 'Failed to fetch sell orders' }, 500);
  }
});

// Create sell order
app.post("/make-server-1a42b77c/sell-orders", async (c) => {
  try {
    const newOrder = await c.req.json();
    
    const sellOrders = await kv.get('sellOrders:all') || [];
    const updatedOrders = [newOrder, ...sellOrders];
    
    await kv.set('sellOrders:all', updatedOrders);
    
    return c.json({ success: true, sellOrders: updatedOrders });
  } catch (error) {
    console.error('Error creating sell order:', error);
    return c.json({ error: 'Failed to create sell order' }, 500);
  }
});

// Update sell orders (for cancellation or filling)
app.put("/make-server-1a42b77c/sell-orders", async (c) => {
  try {
    const updatedOrders = await c.req.json();
    
    await kv.set('sellOrders:all', updatedOrders);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error updating sell orders:', error);
    return c.json({ error: 'Failed to update sell orders' }, 500);
  }
});

Deno.serve(app.fetch);