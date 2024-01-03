import { Cron } from '@/lib'
import { SendMessageChat } from '@/utils'
import { Client } from 'discord.js'

interface Daily {
  channelID: string
  message: string
  crontime: string
}

export class Reminder {
  private dailys: Daily[] = []

  constructor(
    private readonly cron: Cron,
    private readonly client: Client<boolean>
  ) {}

  daily(): void {
    if (this.dailys.length === 0) {
      throw new Error('Adicione dailys para o reminder')
    }

    this.dailys.map((item) => {
      const cron = this.cron.New(item.crontime, () => {
        SendMessageChat(this.client, {
          channelID: item.channelID,
          message: item.message,
        })
      })

      cron.start()
    })
  }

  setDailys(dailys: Daily[]): void {
    this.dailys.push(...dailys)
  }
}
