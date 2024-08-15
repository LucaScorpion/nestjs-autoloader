import { Logger, Module, ModuleMetadata, Provider, Type } from '@nestjs/common';
import {
  CONTROLLER_WATERMARK,
  INJECTABLE_WATERMARK,
} from '@nestjs/common/constants';
import { combine } from './combine';
import { listFiles } from './listFiles';
import { isScript } from './isScript';

const logger = new Logger('AutoloadModule');

export function AutoloadModule(
  dirName: string,
  metadata?: ModuleMetadata
): ClassDecorator {
  return (target) => {
    log(`Autoloading module: ${dirName}`);
    const loaded = loadScripts(dirName);
    const combinedMeta: ModuleMetadata = {
      ...metadata,
      controllers: combine(metadata?.controllers, loaded.controllers),
      providers: combine(metadata?.providers, loaded.providers),
    };
    Module(combinedMeta)(target);
  };
}

interface LoadResult {
  controllers: Type[];
  providers: Provider[];
}

function loadScripts(dirName: string): LoadResult {
  const scripts = listFiles(dirName).filter(isScript);

  const result: LoadResult = {
    controllers: [],
    providers: [],
  };

  for (const script of scripts) {
    log(`Autoloading file: ${script}`);

    // Here we have to use require, to get the exports into a variable.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const reqVals = Object.values(require(script));

    for (const check of reqVals) {
      if (typeof check === 'function') {
        if (isController(check)) {
          log(`Found controller: ${check.name}`);
          result.controllers.push(check);
        }

        if (isProvider(check)) {
          log(`Found provider: ${check.name}`);
          result.providers.push(check);
        }
      }
    }
  }

  return result;
}

function log(message: string): void {
  if (Logger.isLevelEnabled('verbose')) {
    logger.verbose(message);
  }
}

// For both of these functions,
// we specifically want to use the Object type because it accepts almost anything.

// eslint-disable-next-line @typescript-eslint/ban-types
function isController(fn: Object): fn is Type {
  return Reflect.hasMetadata(CONTROLLER_WATERMARK, fn);
}

// eslint-disable-next-line @typescript-eslint/ban-types
function isProvider(fn: Object): fn is Provider {
  return Reflect.hasMetadata(INJECTABLE_WATERMARK, fn);
}
