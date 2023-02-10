# NestJS Autoloader

[![Build](https://github.com/LucaScorpion/nestjs-autoloader/actions/workflows/build.yml/badge.svg)](https://github.com/LucaScorpion/nestjs-autoloader/actions/workflows/build.yml)
[![NPM version](https://img.shields.io/npm/v/nestjs-autoloader)](https://www.npmjs.com/package/nestjs-autoloader)
[![NPM bundle size](https://img.shields.io/bundlephobia/min/nestjs-autoloader)](https://www.npmjs.com/package/nestjs-autoloader)

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
  controllers: [AuthController],
  providers: [AuthService, AdminGuard, UserMiddleware, AdminService],
  imports: [TypeOrmModule.forFeature([Admin])],
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

## Nested Module Directories

The autoloader is designed to work with nested module directories.
For example:

```
parent/
├── parent.module.ts
├── parent.service.ts
└── sub/
    ├── sub.module.ts
    └── sub.service.ts
```

This will load the `parent.service.ts` for the `parent` module,
but not the `sub.service.ts`.
The autoloader recognises nested modules by looking at `*.module.ts` files.
If a directory contains a file with that name,
it will exclude this directory from autoloading for the containing module.
