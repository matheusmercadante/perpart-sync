import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];
    const validApiKey = this.configService.get('SYNC_API_KEY');

    if (!apiKey) {
      throw new UnauthorizedException('API Key obrigatória. Forneça o header X-API-Key.');
    }

    if (apiKey !== validApiKey) {
      throw new UnauthorizedException('API Key inválida.');
    }

    return true;
  }
}