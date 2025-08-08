const http = require("http");
const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "server_logs.txt");

const server = http.createServer((req, res) => {
	const logEntry = `
==== Incoming Request ====
Time        : ${new Date().toISOString()}
URL         : ${req.url}
Method      : ${req.method}
Headers     : ${JSON.stringify(req.headers, null, 2)}
===========================

`;

	// Print to console (optional)
	console.log(logEntry);

	// Append the log to the file
	fs.appendFile(logFilePath, logEntry, (err) => {
		if (err) {
			console.error("Error writing to log file:", err);
		}
	});

	// Basic response
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("Request logged.\n");
});

server.listen(8000, () => {
	console.log("Server is listening on port 8000");
});
