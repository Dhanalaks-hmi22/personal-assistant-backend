const http = require("http");

const {
  getCurrentDate,
  formatResponse,
  add,
  subtract,
  multiply,
} = require("./utils");

// Load environment variables from .env
try {
  process.loadEnvFile();
} catch (error) {
  if (error.code !== "ENOENT") {
    throw error;
  }
}

const PORT = Number(process.env.PORT) || 3000;
const APP_NAME = process.env.APP_NAME || "Personal Assistant";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Home API
  if (req.method === "GET" && pathname === "/") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        message: `Welcome to ${APP_NAME} API!`,
      })
    );
  }

  // Health API
  else if (req.method === "GET" && pathname === "/health") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        status: "UP",
        timestamp: getCurrentDate(),
      })
    );
  }

  // About API
  else if (req.method === "GET" && pathname === "/about") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        application: APP_NAME,
        version: "1.0",
      })
    );
  }

  // Calculate API
  else if (req.method === "GET" && pathname === "/calculate") {
    const a = Number(url.searchParams.get("a"));
    const b = Number(url.searchParams.get("b"));
    const operation = url.searchParams.get("operation");

    if (
      url.searchParams.get("a") === null ||
      url.searchParams.get("b") === null ||
      url.searchParams.get("a").trim() === "" ||
      url.searchParams.get("b").trim() === "" ||
      !Number.isFinite(a) ||
      !Number.isFinite(b)
    ) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          error: "Please provide valid numbers for a and b.",
        })
      );
    } else {
      let result;

      if (operation === "add") {
        result = add(a, b);
      } else if (operation === "subtract") {
        result = subtract(a, b);
      } else if (operation === "multiply") {
        result = multiply(a, b);
      } else {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            error: "Invalid operation. Use add, subtract, or multiply.",
          })
        );
        return;
      }

      res.writeHead(200);
      res.end(
        JSON.stringify(
          formatResponse("Calculation successful", {
            a,
            b,
            operation,
            result,
          })
        )
      );
    }
  }

  // Unknown API route
  else {
    res.writeHead(404);
    res.end(
      JSON.stringify({
        error: "Route not found",
      })
    );
  }
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} server running at http://localhost:${PORT}`);
});