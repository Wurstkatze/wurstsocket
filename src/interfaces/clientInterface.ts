export default interface Client {
    auth: {
        id: number
        label?: string
    },
    isActive: boolean
    isOnline: boolean
}