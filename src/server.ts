import { createServer, Server } from "http";
import { AddressInfo } from "net";
import app from "./app";

const normalizePort = (val: string) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

export const server: Server = createServer(app);
server.listen(port);
server.on("listening", () => {
    console.log(
        `Server is listening for requests on port ${(server.address() as AddressInfo).port}`
    );
});
