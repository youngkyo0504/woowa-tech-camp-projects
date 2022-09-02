import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

export function UseAuthGuard() {
  return applyDecorators(UseGuards(AuthGuard));
}
