import { StatusBar as StatusBarApi, Msg as MsgAPi } from 'jumpfm-api'

class Msg implements MsgAPi {
    readonly divMsg: HTMLDivElement = document.createElement('div')

    constructor() {
        this.divMsg.className = 'msg'
    }

    setType = (type: "info" | "warn" | "err") => {
        this.divMsg.setAttribute('type', type)
        return this
    }

    setText = (txt: string) => {
        this.divMsg.textContent = txt
        return this
    }

    setTooltip = (txt: string) => {
        this.divMsg.setAttribute('data-title', txt)
        return this
    }

    setClearTimeout = (timeout: number) => {
        setTimeout(() => this.setText(''), timeout)
        return this
    }

    setAttr = (name: string, b: boolean) => {
        if (b)
            this.divMsg.setAttribute(name, '')
        else
            this.divMsg.removeAttribute(name)

        return this
    }
}

export class StatusBar implements StatusBarApi {
    private readonly divMsgs: HTMLDivElement
    = document.getElementById('statusbar-msgs') as HTMLDivElement

    private readonly msgs: { [name: string]: Msg } = {}

    msg = (name: string): MsgAPi => {
        if (this.msgs[name]) return this.msgs[name]
        const msg = new Msg()
        this.msgs[name] = msg
        this.divMsgs.appendChild(msg.divMsg)
        return msg
    }

    clear = (name: string) => {
        const msg = this.msgs[name]
        if (!msg) return
        msg.setText('')
    }
}