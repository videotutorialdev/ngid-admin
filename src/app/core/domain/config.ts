import { IEnvirontment } from '../interface';
import { LoggerLevelType } from '../type';
export class Config {
  public readonly ENVIRONTMENT: IEnvirontment;
  public readonly BACKEND_ADDRESS: string;
  public readonly LOGGER_LEVEL: LoggerLevelType;
}
