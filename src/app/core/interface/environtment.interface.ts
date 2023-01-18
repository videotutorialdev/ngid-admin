import { LoggerLevelType } from '../type';

export interface IEnvirontment {
  production: boolean;
  baseAddress: string;
  loggerLevel: LoggerLevelType;
}
