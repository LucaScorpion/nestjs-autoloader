import { AutoloadModule } from '../src';
import { TestController } from './test.controller';
import { TestProvider } from './test.provider';
import { SubdirController } from './subdir/subdir.controller';
import { SubdirProvider } from './subdir/subdir.provider';

describe('AutoloadModule', () => {
  it('loads controllers and providers', () => {
    @AutoloadModule(__dirname)
    class TestModule {}

    // The way to check if items are properly loaded, is to check the class metadata.
    // The `@Module` decorator set each passed object property as a metadata property.

    const controllers = Reflect.getOwnMetadata('controllers', TestModule);
    expect(controllers).toStrictEqual([TestController, SubdirController]);

    const providers = Reflect.getOwnMetadata('providers', TestModule);
    expect(providers).toStrictEqual([TestProvider, SubdirProvider]);
  });
});
