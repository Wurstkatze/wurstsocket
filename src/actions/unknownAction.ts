import WebSocket from "ws"
import Logger from "../logger"
import WebSocketMessage from "../interfaces/webSocketMessageInterface"

export default function unknownAction(logger: Logger, ws: WebSocket, data: WebSocketMessage) {
    logger.warn('Unknown action:', data.action)
    ws.send(JSON.stringify({ code: 404, message: 'Unknown Action' }))
    return
}