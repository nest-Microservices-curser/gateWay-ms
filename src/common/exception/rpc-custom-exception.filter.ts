
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCumtomExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const rpcError = exception.getError();
        if (rpcError.toString().includes('Empty response')) {
            response.status(500).json({
                statusCode: 500,
                message: rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1)
            });

        }

        if (typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError) {
            response.status(rpcError.status).json({
                statusCode: rpcError.status,
                message: rpcError.message
            });
        }

        response.status(500).json({
            statusCode: 500,
            message: 'Internal server error'
        });


    }
}
