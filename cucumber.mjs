const config = {
  parallel: 2,
  formatOptions: {
    snippetInterface: "async-await",
  },
  paths: ["the-water/features/"],
  require: ["the-water/actions/**/*.ts", "the-water/hooks/*.ts"],
  requireModule: ["ts-node/register"],
  format: [
    "progress-bar",
    "html:test-results/cucumber-report.html",
    "json:test-results/cucumber-report.json",
  ],
  worldParameters: {},
  retry: 2,
  retryTagFilter: "@flaky",
};

export default config;
