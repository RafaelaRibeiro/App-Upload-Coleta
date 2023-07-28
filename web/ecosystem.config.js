module.exports = {
  apps: [
    {
      name: 'web',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
