module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    return this.addAddonToProject({
      name: 'liquid-fire',
      version: '0.33.0',
    });
  },
};
