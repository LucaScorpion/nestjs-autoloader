import { AutoloadModule } from '../src';
import { TestController } from './module/test.controller';
import { TestProvider } from './module/test.provider';
import { SubdirController } from './module/subdir/subdir.controller';
import { SubdirProvider } from './module/subdir/subdir.provider';
import path from 'path';

describe('AutoloadModule', () => {
  it('loads controllers and providers', () => {
    @AutoloadModule(path.join(__dirname, 'module'))
    class TestModule {}

    // The way to check if items are properly loaded, is to check the class metadata.
    // The `@Module` decorator set each passed object property as a metadata property.

    const controllers = Reflect.getOwnMetadata('controllers', TestModule);
    expect(controllers).toStrictEqual([TestController, SubdirController]);

    const providers = Reflect.getOwnMetadata('providers', TestModule);
    expect(providers).toStrictEqual([TestProvider, SubdirProvider]);
  });
});
