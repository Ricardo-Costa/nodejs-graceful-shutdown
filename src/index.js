import { createServer } from "http";
import { once } from "events";

const PORT = 3000;

function requestUtil (req) {
  return {
    extractBody: async () => JSON.parse(await once(req, "data"))
  };
}

/**
 * @param {import("http").IncomingMessage} request
 * @param {import("http").ServerResponse} response
 */
async function handler (request, response) {
  // force crash by any request
  const { message } = await requestUtil(request).extractBody();
  if (message) {
    console.error(message);
    process.exit(0);
  }

  try {
    response.writeHead(200);
    response.end(JSON.stringify());
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    response.end();
  }
}

createServer(handler)
  .listen(PORT)
  .on("listening", () => console.log(`Application start at port ${PORT}`));

class HandleErrors {
  static async mainFlow () {
    console.log("Close DB connection...");
    console.log("Create some log to AWS CloudWatch OR APM maybe....");
    console.log("Create a new process for this app if want...");
    process.exit(0);
  }

  static async event () {
    console.log("Do something with this params.");
    await HandleErrors.mainFlow(...arguments);
  }

  static async crash () {
    console.log("Do something with this params.");
    await HandleErrors.mainFlow(...arguments);
  }
}

// catch errors not in try catch statement
process.on("uncaughtException", HandleErrors.event);
process.on("uncaughtExceptionMonitor", HandleErrors.event);
process.on("unhandledRejection", HandleErrors.event);

// unexpected end of application
process.on("SIGINT", HandleErrors.crash);
process.on("SIGTERM", HandleErrors.crash);
process.on("SIGKILL", HandleErrors.crash);
// process.on("beforeExit", HandleErrors.crash);
// process.on("exit", HandleErrors.crash);
