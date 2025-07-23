const { ModuleFederationPlugin } = require('webpack').container;
const { withModuleFederationPlugin } = require('@nx/webpack');

module.exports = withModuleFederationPlugin({
  name: 'dashboard',
  filename: 'remoteEntry.js',
  exposes: {
    './Module': './apps/dashboard/src/app/app.module.ts',
  },
  shared: {
    '@angular/core': { singleton: true, strictVersion: true },
    '@angular/common': { singleton: true, strictVersion: true },
    '@angular/router': { singleton: true, strictVersion: true },
  },
}); 