module.exports = {
    testMatch: ["**/tests/**/*.test.js"],
    reporters: [
        "default", // Default Jest reporter
        [
            "jest-junit",
            {
                outputDirectory: "./reports/jest", // Directory to output JUnit reports
                outputName: "junit.xml", // Name of the output file
            },
        ],
    ],
  };