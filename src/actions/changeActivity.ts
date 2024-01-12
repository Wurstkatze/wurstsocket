import WebSocket from "ws"
import Logger from "../logger"
import WebSocketMessage from "../interfaces/webSocketMessageInterface"
import ClientObject from "../interfaces/clientObjectInterface"

export default function changeActivity(logger: Logger, ws: WebSocket, data: WebSocketMessage, clients: ClientObject) {
    if (data.active !== undefined) {
        clients[data.auth.id].isActive = data.active
    } else {
        logger.debug("data.active is undefined")
        ws.send(JSON.stringify({ code: 400, message: "'active' (boolean) is required" }))
    }
    return clients
}