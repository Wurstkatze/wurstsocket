export default class Logger {
    debugEnabled: boolean

    constructor(debugEnabled: boolean = false) {
        this.debugEnabled = debugEnabled
    }

    private timestamp() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `[${hours}:${minutes}:${seconds}]`;
    }

    debug(...args: any[]) {
        if (this.debugEnabled) {
            console.log(`\x1b[35m${this.timestamp()} [DEBUG]\x1b[0m`, ...args)
        }
    }

    log(...args: any[]) {
        console.log(`\x1b[36m${this.timestamp()} [LOG]\x1b[0m`, ...args)
    }

    warn(...args: any[]) {
        console.log(`\x1b[33m${this.timestamp()} [WARN]\x1b[0m`, ...args)
    }

    error(...args: any[]) {
        console.log(`\x1b[31m${this.timestamp()} [ERROR]\x1b[0m`, ...args)
    }
}

