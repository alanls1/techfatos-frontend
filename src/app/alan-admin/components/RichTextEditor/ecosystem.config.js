module.exports = {
  apps: [
    {
      name: "next-app",
      script: "npm",
      args: "start",
      cwd: "/var/www/tech-working",
      env: {
        NODE_ENV: "production",
      },
      post_update: ["npm install", "npm run build"],
    },
  ],
};
