import WebSocket from "ws"
import Logger from "../logger"
import WebSocketMessage from "../interfaces/webSocketMessageInterface"
import ClientObject from "../interfaces/clientObjectInterface"

export default function login(logger: Logger, ws: WebSocket, data: WebSocketMessage, clients: ClientObject) {
    // Change state of existing client or create a new client
    try {
        // Set cient online status to true
        clients[data.auth.id].isOnline = true
    } catch (error) {
        // Add client to clients object
        clients[data.auth.id] = { auth: data.auth, isActive: false, isOnline: true }
    }
    // Confirm login success
    ws.send(JSON.stringify({ code: 200 }))
    logger.log('Log in complete. ID:', data.auth.id)
    return clients
}