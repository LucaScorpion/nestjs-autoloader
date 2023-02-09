# NestJS Autoloader

Simplify your NestJS modules by automatically loading providers and controllers.

# Installation

```shell
npm i nestjs-autoloader
```

# Usage

```typescript
import { AutoloadModule } from 'nestjs-autoloader';

@AutoloadModule(__dirname)
export class YourModule {}
```

The first argument of the `AutoloadModule` decorator should always be `__dirname`,
this is the directory it will read and load files from.
The second argument is optional, and is the same as for a normal `Module`.
Here you can specify imports, additional providers, etc.
For example:

```typescript
import { AutoloadModule } from 'nestjs-autoloader';

@AutoloadModule(__dirname, {
  imports: [OtherModule],
  providers: [NonAutoloadedProvider]
})
export class YourModule {}
```

## Example

Before:

```typescript
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AuthController],
  providers: [AuthService, AdminGuard, UserMiddleware, AdminService],
  exports: [AuthService],
})
export class AuthModule {}
```

After:

```typescript
import { AutoloadModule } from 'nestjs-autoloader';

@AutoloadModule(__dirname, {
  imports: [TypeOrmModule.forFeature([Admin])],
  exports: [AuthService],
})
export class AuthModule {}
```
