import { GlobalService } from '../service/global.service';
import { LoggerLevelType } from '../type';
import { Service } from './service';

export class Logger {
  public loggerLevel: LoggerLevelType;
  private instanceName: string;
  private static isGroup: boolean;
  private static groups: Array<any>;
  constructor(classInstance: any) {
    this.instanceName = classInstance.__proto__
      ? classInstance.__proto__.constructor.name
      : classInstance.name || classInstance;
    this.loggerLevel =
      (Service.injector &&
        Service.injector.get(GlobalService).config &&
        (Service.injector.get(GlobalService).config
          .LOGGER_LEVEL as LoggerLevelType)) ||
      'OFF';
  }

  public debug(...args: any[]): void {
    const background = '#747474';
    const color = '#ffffff';
    this.writeLog(args, 'DEBUG', background, color);
  }

  public info(...args: any[]): void {
    const background = '#99ff99';
    const color = 'green';
    this.writeLog(args, 'INFO', background, color);
  }

  public warn(...args: any[]): void {
    const background = '#ffff99';
    const color = 'orange';
    this.writeLog(args, 'WARN', background, color);
  }

  public error(...args: any[]): void {
    const background = 'red';
    const color = 'white';
    this.writeLog(args, 'ERROR', background, color);
  }

  public fatal(...args: any[]): void {
    const background = 'red';
    const color = '#ffffff';
    this.writeLog(args, 'FATAL', background, color);
  }

  public log(...args: any[]): void {
    const background = '#747474';
    const color = '#ffffff';
    this.writeLog(args, 'ALL', background, color);
  }

  public group(): void {
    Logger.isGroup = true;
    Logger.groups = [];
  }

  public groupEnd(): void {
    Logger.isGroup = false;
    Logger.groups = [];
    console.groupEnd();
  }

  private writeLog(...args: any[]): void {
    if (this.isShowLog(args[1])) {
      if ((Logger.isGroup && Logger.groups.length === 0) || !Logger.isGroup) {
        console.group(
          '%c' + args[1] + '%c- ' + this.instanceName,
          `background-color: ${args[2]}; color: ${args[3]}; font-weight: bold; padding: 0.11rem 1rem 0.11rem 0.44rem; border-radius: 0.22rem`,
          'font-weight: bold;'
        );
        if (Logger.isGroup) {
          Logger.groups.push(args);
        }
      }
      console.log(...args[0]);

      if ((Logger.isGroup && Logger.groups.length === 0) || !Logger.isGroup) {
        console.groupEnd();
      }
    }
  }

  private isShowLog(level: LoggerLevelType): Boolean {
    const logLevelList: LoggerLevelType[] = [
      'ALL',
      'DEBUG',
      'INFO',
      'WARN',
      'ERROR',
      'FATAL',
      'OFF',
    ];
    const indexOfLevel = logLevelList.indexOf(level);
    const indexOfLogLevel = logLevelList.indexOf(this.loggerLevel);
    return (
      (indexOfLevel >= indexOfLogLevel && level !== 'OFF') ||
      this.loggerLevel === 'ALL'
    );
  }
}
