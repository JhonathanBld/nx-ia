const { withModuleFederationPlugin } = require('@nx/webpack');

module.exports = withModuleFederationPlugin({
  name: 'shell',
  remotes: ['dashboard'],
  shared: {
    '@angular/core': { singleton: true, strictVersion: true },
    '@angular/common': { singleton: true, strictVersion: true },
    '@angular/router': { singleton: true, strictVersion: true },
  },
}); 