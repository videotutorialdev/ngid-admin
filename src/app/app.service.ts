import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Config } from './core/domain';
import { IObject } from './core/interface';
import { UserModel } from './core/models/user.model';
import { GlobalService } from './core/service/global.service';
import { LoggerLevelType } from './core/type';
import { loader } from './core/utils/loader';
import { Logger } from './core/utils/logger';
import { Service } from './core/utils/service';
@Injectable()
export class AppService {
  constructor(private translate: TranslateService) {}
  public initializeApp(injector: Injector): Promise<boolean> {
    Service.injector = injector;
    const logger: Logger = new Logger(this);
    logger.loggerLevel = environment.loggerLevel;
    return new Promise(async (resolve, reject) => {
      try {
        logger.group();
        logger.debug(`[ APP ]: Start initialize application...`);
        const globalService: GlobalService =
          Service.injector.get(GlobalService);
        await this.getLocalConfig(globalService, logger);
        await this.setDefaultLanguage(globalService, logger);
        await this.getBackendConfig(globalService, logger);
        logger.debug(`[ APP ]: Initialize application complete...`);
        logger.groupEnd();
        loader.hide();
        resolve(true);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  private getLocalConfig(
    globalService: GlobalService,
    logger: Logger
  ): Promise<void> {
    logger.debug(`[ APP ]: Get Local Configuration start`);
    return new Promise((resolve) => {
      globalService.session.token = localStorage.getItem(
        globalService.constant.SESSION_ID
      );

      globalService.session.lang =
        localStorage.getItem(globalService.constant.DEFAULT_LANG_KEY) || 'en';

      const config: Config = {
        ENVIRONTMENT: environment,
        BACKEND_ADDRESS: environment.baseAddress,
        LOGGER_LEVEL: environment.loggerLevel as LoggerLevelType,
      };

      globalService.config = config;
      logger.debug(`[ APP ]: Get Local Configuration complete`);
      resolve();
    });
  }

  private setDefaultLanguage(
    globalService: GlobalService,
    logger: Logger
  ): Promise<void> {
    return new Promise((resolve) => {
      logger.debug(`[ APP ]: Set default language`);
      this.translate.setDefaultLang(globalService.session.lang);
      this.translate.onDefaultLangChange.subscribe(() => {
        const lang: IObject = {
          en: 'English',
          id: 'Indonesia',
        };
        logger.debug(
          `[ APP ]: Default lang has been set to '${
            lang[globalService.session.lang]
          }'`
        );
        resolve();
      });
    });
  }

  private getBackendConfig(
    globalService: GlobalService,
    logger: Logger
  ): Promise<void> {
    logger.debug(`[ APP ]: Get Backend Configuration start`);
    return new Promise((resolve) => {
      // if user session exists than get user profile and store into global userSession
      if (globalService.session.token) {
        logger.debug(
          `[ APP ]: Get current user session with sessioID => ${globalService.session.token}`
        );
        try {
          const userString = atob(globalService.session.token);
          const user: UserModel = JSON.parse(userString);
          globalService.session.setUser(user);
          resolve();
        } catch {
          globalService.session.destroy();
          resolve();
        }
      } else {
        logger.debug(`[ APP ]: Get Backend Configuration complete`);
        resolve();
      }
    });
  }
}
