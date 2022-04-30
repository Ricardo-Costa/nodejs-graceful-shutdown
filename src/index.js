import { createServer } from "http"

async function handler(request, response) {
  try {
    response.writeHead(200);
    response.end(JSON.stringify());
  } catch (error) {
    
  }
}