import { Logger, Module, ModuleMetadata, Provider, Type } from '@nestjs/common';
import { FunctionLocator } from '@luca_scorpion/function-locator';
import * as path from 'path';
import * as fs from 'fs/promises';
import {
  CONTROLLER_WATERMARK,
  INJECTABLE_WATERMARK,
} from '@nestjs/common/constants';

const loc = new FunctionLocator();

const logger = new Logger('AutoloadModule');

export function AutoloadModule(metadata: ModuleMetadata): ClassDecorator {
  return (target) => {
    loadFiles(target).then((loaded) => {
      const combinedMeta: ModuleMetadata = {
        ...metadata,
        controllers: [...metadata.controllers, ...loaded.controllers],
        providers: [...metadata.providers, ...loaded.providers],
      };
      Module(combinedMeta)(target);
    });
  };
}

interface LoadResult {
  controllers: Type[];
  providers: Provider[];
}

async function loadFiles(target: Function): Promise<LoadResult> {
  const file = await loc.locate(target);
  const dir = path.resolve(file, '..');

  const allFiles = await fs.readdir(dir);
  const checkFiles = allFiles
    .filter(
      (f) => (f.endsWith('.js') || f.endsWith('.ts')) && !f.endsWith('.d.ts')
    )
    .map((f) => `${dir}/${f}`);

  const result: LoadResult = {
    controllers: [],
    providers: [],
  };

  for (const file of checkFiles) {
    logger.verbose(`Autoloading file: ${file}`);
    const reqVals = Object.values(require(file));

    for (const check of reqVals) {
      if (typeof check === 'function') {
        const controller = checkController(check);
        if (controller) {
          result.controllers.push(controller);
        }

        const provider = checkProvider(check);
        if (provider) {
          result.providers.push(provider);
        }
      }
    }
  }

  return result;
}

function checkController(fn: Function): Type | undefined {
  if (Reflect.hasMetadata(CONTROLLER_WATERMARK, fn)) {
    logger.verbose(`Found controller: ${fn.name}`);
    return fn as Type;
  }
}

function checkProvider(fn: Function): Provider | undefined {
  if (Reflect.hasMetadata(INJECTABLE_WATERMARK, fn)) {
    logger.verbose(`Found provider: ${fn.name}`);
    return fn as Type;
  }
}
