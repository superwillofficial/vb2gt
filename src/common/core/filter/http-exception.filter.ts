import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ReturnCode } from '../../const';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionRes: any = exception.getResponse();
    
    // 设置错误信息
    const message = exceptionRes.message
      ? `${exceptionRes.message[0]}`
      : `${exceptionRes}`;
    const errorResponse = {
      data: {},
      msg: message,
      code: ReturnCode.fail,
    };

    // 设置返回的状态码, 请求头, 发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utr-8');
    response.send(errorResponse);
  }
}
