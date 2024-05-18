module.exports = {
  apps: [
    {
      name: "district-administration-election-backend",
      script: "npm",
      args: "start",
      interpreter: "none",
      watch: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
