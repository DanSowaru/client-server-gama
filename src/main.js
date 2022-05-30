import { createServer } from "http-server";
import { readFile } from "fs";
import { resolve } from "path";
import { parse } from "querystring;";

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
			const filePath = resolve(__dirname, "./pages/sign-in.html");
			readFile((error, file) => {
				if (error) {
					response.writeHead(500, `Can\'t read HTML file`);
					response.end();
					return;
				}
			});
		}

		case `/authenticate`: {
			// pattern de eventos, processandoo buffer de início ao fim.
			let data = "";
			request.on("data", (chunk) => {
				data += chunk;
			});
			request.on("end", () => {
				console.log(parse(data));

				response.writeHead(301, { Location: "/home" });

				response.end();
			});

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
