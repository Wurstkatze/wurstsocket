export default interface WebSocketMessage {
    auth: {
        id: number
        label?: string
    },
    action: string
    active?: boolean
}