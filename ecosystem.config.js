// PYRAX Web PM2 Ecosystem Configuration
// Auto-starts Next.js app + background workers

module.exports = {
  apps: [
    // Main Next.js Application
    {
      name: "pyrax-web",
      script: "node_modules/.bin/next",
      args: "start -p 3000",
      cwd: __dirname,
      interpreter: "none",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      max_restarts: 10,
      restart_delay: 3000,
      watch: false,
      autorestart: true,
      exp_backoff_restart_delay: 100,
      max_memory_restart: "1G",
    },

    // Background Workers (all-in-one)
    {
      name: "pyrax-workers",
      script: "npx",
      args: "ts-node --compiler-options {\"module\":\"CommonJS\"} src/workers/index.ts",
      cwd: __dirname,
      interpreter: "none",
      env: {
        NODE_ENV: "production",
        REDIS_URL: "redis://localhost:6379",
      },
      max_restarts: 10,
      restart_delay: 5000,
      watch: false,
      autorestart: true,
      exp_backoff_restart_delay: 100,
    },

    // Status Worker (standalone for scaling)
    {
      name: "pyrax-status-worker",
      script: "npx",
      args: "ts-node --compiler-options {\"module\":\"CommonJS\"} src/workers/status-worker.ts",
      cwd: __dirname,
      interpreter: "none",
      instances: 1,
      env: {
        NODE_ENV: "production",
        REDIS_URL: "redis://localhost:6379",
      },
      max_restarts: 10,
      restart_delay: 5000,
      watch: false,
      autorestart: true,
      enabled: false, // Enable if running workers separately
    },

    // Email Worker (standalone for scaling)
    {
      name: "pyrax-email-worker",
      script: "npx",
      args: "ts-node --compiler-options {\"module\":\"CommonJS\"} src/workers/email-worker.ts",
      cwd: __dirname,
      interpreter: "none",
      instances: 2,
      env: {
        NODE_ENV: "production",
        REDIS_URL: "redis://localhost:6379",
      },
      max_restarts: 10,
      restart_delay: 5000,
      watch: false,
      autorestart: true,
      enabled: false, // Enable if running workers separately
    },
  ],
};
