import { createServer } from "http-server";
import { readFile } from "fs";

// Roteamento de requisições
const server = createServer((request, response) => {
	switch (request.utl) {
		case "/status": {
			response.writeHead(200, { "Content-Type": "application/json" });
			response.write(
				JSON.stringify({
					status: "ok",
				})
			);
			response.end();
			return;
		}

		case `/sign-in`: {
			readFile((error, file) => {
				if (error) {
					response.writeHead(500, `Can\'t read HTML file`);
				}
			});
		}

		case `/authenticate`: {
			break;
		}

		default: {
			response.writeHead(404, "Service not found");
			response.end();
		}
	}
});

// process === objeto global do node
// env === variavel de ambiente
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || `127.0.0.1`;

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server is listening at http://${HOSTNAME}:${PORT}`);
});
