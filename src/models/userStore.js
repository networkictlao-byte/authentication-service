// Original code commented out as per rule
/*
// In-memory user store — replace with a real DB (e.g. MongoDB, PostgreSQL) in production
const users = [];
let idCounter = 1;

const UserStore = {
  findByEmail: (email) => users.find((u) => u.email === email),
  findById: (id) => users.find((u) => u.id === id),
  create: (data) => {
    const user = { id: idCounter++, createdAt: new Date().toISOString(), ...data };
    users.push(user);
    return user;
  },
  // Return safe user object (no password)
  sanitize: ({ password, ...user }) => user,
};

module.exports = UserStore;
*/

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../../users.json");

// In-memory user store
let users = [];
let idCounter = 1;

// Load data from file
const loadData = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf8");
      users = JSON.parse(data);
      if (users.length > 0) {
        idCounter = Math.max(...users.map((u) => u.id)) + 1;
      }
    }
  } catch (err) {
    console.error("Error loading user data:", err);
  }
};

// Save data to file
const saveData = () => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), "utf8");
  } catch (err) {
    console.error("Error saving user data:", err);
  }
};

// Initial load
loadData(); // Disabled for Vercel compatibility (Read-only filesystem)

/*
const UserStore = {
  findByEmail: (email) => users.find((u) => u.email === email),
  findById: (id) => users.find((u) => u.id === id),
  create: (data) => {
    const user = { id: idCounter++, createdAt: new Date().toISOString(), ...data };
    users.push(user);
    saveData(); // Disabled for Vercel compatibility (Read-only filesystem)
    return user;
  },
  // Return safe user object (no password)
  sanitize: ({ password, ...user }) => user,
};
*/

/*
const UserStore = {
  findByEmail: (email) => users.find((u) => u.email === email),
  findById: (id) => users.find((u) => u.id === id),
  create: (data) => {
    const user = { id: idCounter++, createdAt: new Date().toISOString(), ...data };
    users.push(user);
    saveData(); // Disabled for Vercel compatibility (Read-only filesystem)
    return user;
  },
  delete: (id) => {
    const index = users.findIndex((u) => u.id === parseInt(id));
    if (index !== -1) {
      users.splice(index, 1);
      saveData(); // Disabled for Vercel compatibility (Read-only filesystem)
      return true;
    }
    return false;
  },
  // Return safe user object (no password)
  sanitize: ({ password, ...user }) => user,
};
*/

/*
const UserStore = {
  findByEmail: (email) => users.find((u) => u.email === email),
  findById: (id) => users.find((u) => u.id === id),
  getAll: () => users,
  create: (data) => {
    const user = { id: idCounter++, createdAt: new Date().toISOString(), ...data };
    users.push(user);
    saveData(); // Disabled for Vercel compatibility (Read-only filesystem)
    return user;
  },
  delete: (id) => {
    const index = users.findIndex((u) => u.id === parseInt(id));
    if (index !== -1) {
      users.splice(index, 1);
      saveData(); // Disabled for Vercel compatibility (Read-only filesystem)
      return true;
    }
    return false;
  },
  // Return safe user object (no password)
  sanitize: ({ password, ...user }) => user,
};
*/

const UserStore = {
  findByEmail: (email) => users.find((u) => u.email === email),
  findById: (id) => users.find((u) => u.id === parseInt(id)),
  getAll: () => users,
  create: (data) => {
    const user = { id: idCounter++, createdAt: new Date().toISOString(), ...data };
    users.push(user);
    saveData(); // Disabled for Vercel compatibility (Read-only filesystem)
    return user;
  },
  delete: (id) => {
    const index = users.findIndex((u) => u.id === parseInt(id));
    if (index !== -1) {
      users.splice(index, 1);
      saveData(); // Disabled for Vercel compatibility (Read-only filesystem)
      return true;
    }
    return false;
  },
  // Return safe user object (no password)
  sanitize: ({ password, ...user }) => user,
};




module.exports = UserStore;

