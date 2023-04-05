import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../auth/models/jwt-payload.model';
import { ReqHeaders } from '../auth/models/req-headers.model';
import { log } from 'console';

export const getCurrentUser = async (
  headers: ReqHeaders,
  jwtService: JwtService,
) => {
  const authHeader = headers.authorization;
  const accessToken = authHeader.slice(7);
  const decodedToken = jwtService.decode(accessToken) as TokenPayload;
  log(decodedToken);
  return decodedToken;
};
