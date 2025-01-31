import chalk from 'chalk' // 서버에서 컬러 출력
import util from 'util' // 서버에서 객체 출력 시 활용

import { AppEnvs } from '@/shared/config/env'

export class Logger {
  private show: boolean
  private isServer: boolean

  constructor() {
    this.show = AppEnvs.showLogger
    this.isServer = typeof window === 'undefined'
  }

  static get(): Logger {
    return new Logger()
  }

  setEnabled(enabled: boolean): this {
    this.show = enabled
    return this
  }

  private getKSTTime(): string {
    return new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date())
  }

  private log(
    level: string,
    message: any,
    color: string,
    tag?: string,
    onlyServer?: boolean,
  ): this {
    if (!this.show) return this

    const time = this.getKSTTime()
    const tagString = tag ? `[${tag}]` : ''

    if (this.isServer) {
      // 서버 환경: chalk 적용
      const chalkColor = this.getChalkColor(level)
      console.log(
        chalkColor(`[${time}] ${tagString} [${level.toUpperCase()}]:`),
        onlyServer
          ? util.inspect(message, { colors: true, depth: 5 })
          : message,
      )
    } else {
      // 브라우저 환경: CSS 적용
      console.log(
        `%c[${time}] ${tagString} [${level.toUpperCase()}]:`,
        `color: ${color}; font-weight: bold;`,
        message,
      )
    }

    return this
  }

  private getChalkColor(level: string) {
    switch (level) {
      case 'info':
        return chalk.blue
      case 'warn':
        return chalk.yellow
      case 'error':
        return chalk.red
      case 'debug':
        return chalk.green
      default:
        return chalk.white
    }
  }

  info(message: any, tag?: string, onlyServer?: boolean): this {
    return this.log('info', message, '#3498db', tag, onlyServer) // 파란색
  }

  warn(message: any, tag?: string, onlyServer?: boolean): this {
    return this.log('warn', message, '#f39c12', tag, onlyServer) // 주황색
  }

  error(message: any, tag?: string, onlyServer?: boolean): this {
    return this.log('error', message, '#e74c3c', tag, onlyServer) // 빨간색
  }

  debug(message: any, tag?: string, onlyServer?: boolean): this {
    return this.log('debug', message, '#2ecc71', tag, onlyServer) // 초록색
  }

  groupStart(label: string, collapsed: boolean = false): this {
    if (!this.show) return this

    if (this.isServer) {
      console.log(chalk.magenta(`--- GROUP: ${label} ---`))
    } else {
      collapsed ? console.groupCollapsed(label) : console.group(label)
    }

    return this
  }

  groupEnd(): this {
    if (!this.show) return this

    if (this.isServer) {
      console.log(chalk.magenta(`--- GROUP END ---`))
    } else {
      console.groupEnd()
    }

    return this
  }

  time(label: string): this {
    if (!this.show) return this

    console.time(label)
    return this
  }

  timeEnd(label: string): this {
    if (!this.show) return this

    console.timeEnd(label)
    return this
  }

  clear(): this {
    if (!this.show) return this

    console.clear()
    return this
  }
}
