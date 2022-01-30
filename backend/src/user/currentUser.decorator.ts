import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { CurrentUserPipe } from './CurrentUser.pipe';

const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().headers.authorization;
});


export const CurrentUser = (additionalOptions?: any) => GetUser(additionalOptions, CurrentUserPipe)