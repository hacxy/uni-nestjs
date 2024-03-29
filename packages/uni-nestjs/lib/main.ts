import { NestFactory } from '@nestjs/core';
import { registerSwaggerModule } from 'lib/swagger/registerSwaggerModule';
import { Bootstrap } from './types';
import { DEFAULT_PORT } from './constants';
import { printPath } from './utils';
import { handleUniModule } from 'lib/module';

export * from './constants';
export * from './decorators';
export * from './exceptions';
export * from './guard';
export * from './interceptor';
export * from './swagger';
export * from './module';

export const bootstrap: Bootstrap = async (AppModule, options = {}) => {
  const { swaggerOptions, appOptions } = options;

  const UniAppModule = handleUniModule(AppModule, options);
  const app = await NestFactory.create(UniAppModule, appOptions);

  // app listen before
  options.beforeAppListen?.(app);

  // 注册swagger
  registerSwaggerModule(app, swaggerOptions);

  const port =
    options.appOptions?.port || Number(process.env.PORT) || DEFAULT_PORT;
  await app.listen(port);
  printPath(port);
};
