import WebSocket from "ws"
import Ajv, { JSONSchemaType } from "ajv"
import Logger from "./logger"
import WebSocketMessageSchema from "../schemas/web_socket_message.json"
import WebSocketMessage from "./interfaces/webSocketMessageInterface"
import ClientObject from "./interfaces/clientObjectInterface"
import Client from "./interfaces/clientInterface"
import login from "./actions/login"
import logout from "./actions/logout"
import changeActivity from "./actions/changeActivity"
import unknownAction from "./actions/unknownAction"

const schema: JSONSchemaType<WebSocketMessage> = WebSocketMessageSchema as unknown as JSONSchemaType<WebSocketMessage>
const validate = new Ajv().compile(schema)

const logger = new Logger(true)

const wss = new WebSocket.Server({ port: 3000 })
let wsArray: WebSocket[] = []
let clients: ClientObject = {}

logger.log('Server started.')
wss.on('connection', (ws: WebSocket) => {
    logger.log('Client connected')
    // Push ws connection to wsArray
    wsArray.push(ws)

    ws.on('message', (message: any) => {
        try {
            // Convert string to Json
            const data = JSON.parse(message)
            // Validate data with Ajv
            if (validate(data)) {
                // Valid message, performing action
                if (data.action === "login") {
                    clients = login(logger, ws, data, clients)
                    return
                }
                if (data.action === "logout") {
                    clients = logout(logger, data, clients)
                    return
                }
                if (data.action === "changeActivity") {
                    clients = changeActivity(logger, ws, data, clients)
                    return
                }
                unknownAction(logger, ws, data)
            } else {
                // Not a valid message (missing property, unknown property etc.)
                ws.send(JSON.stringify({ code: 400, message: validate.errors![0].message }))
                return
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                ws.send(JSON.stringify({ code: 400, message: "Invalid json" }))
                return
            }
            logger.error('Unexpected Error:', error)
            ws.send(JSON.stringify({ code: 500, message: "Internal Server Error" }))
        }
    })

    ws.on('close', () => {
        logger.log('Client disconnected')
        // Remove ws connection from wsArray
        wsArray.forEach((webSocket, index) => {
            if (webSocket === ws) {
                wsArray.splice(index)
            }
        })
    })
})