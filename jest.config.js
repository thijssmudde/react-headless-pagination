module.exports = {
  verbose: true,
  collectCoverageFrom: ["src/**/*.tsx", "!src/**/index.tsx"],
  snapshotResolver: "./jest.snapshotResolver.js",
  coverageReporters: ["text", "text-summary", "cobertura"],
};
