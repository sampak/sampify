import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserPipe } from './CurrentUser.pipe';

const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().headers.authorization;
});

export const CurrentUser = (additionalOptions?: any) =>
  GetUser(additionalOptions, CurrentUserPipe);
