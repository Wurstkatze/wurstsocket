import Logger from "../logger"
import WebSocketMessage from "../interfaces/webSocketMessageInterface"
import ClientObject from "../interfaces/clientObjectInterface"

export default function logout(logger: Logger, data: WebSocketMessage, clients: ClientObject) {
    clients[data.auth.id].isOnline = false
    logger.log('Log out complete. ID:', data.auth.id)
    return clients
}