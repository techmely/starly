export async function getAgentParser() {
  try {
    const importUaParser = await import("ua-parser-js");
    const Parser = importUaParser.default;
    const parser = new Parser();
    return parser;
  } catch (error) {
    console.error(error);
  }
}
