import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpRedirectResponse,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('api/users')
export class UserController {
  // expressjs request using nest decorator

  /**
   * @Req() for express.Req
   * @Param(key?) for req.param.key?
   * @Body(key?) for req.body.key?
   * @Query(key?) for req.query.key?
   * @Header(key?) for req.headers.key?
   * @Ip() for req.ip
   * @HostParam() for req.hosts
   * @Res() for express.Response
   */
  @Get('/hello')
  sayHello(
    @Query('first_name') first_name: string,
    @Query('last_name') last_name: string,
  ): string {
    try {
      return `Hello ${first_name} ${last_name}`;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @HttpCode() for change status code response
   * @Header() for change header response
   * @Redirect() for doing redirect. Redirect location can be changed with
   * HttpRedirectResponse return (see line 69)
   *
   * @Next() for express.NextFunction
   */

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    try {
      return {
        data: 'Hello json',
      };
    } catch (error) {
      throw new HttpException(
        `failed: ${error.message ?? null}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-response',
      statusCode: 301,
    };
  }

  @Get('/hello-async')
  async helloAsync(@Query('name') name: string): Promise<string> {
    return `Hello ${name} from hello-async path`;
  }

  // cookie
  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success Set Cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request): string {
    console.log(request.cookies['name']);
    return request.cookies['name'];
  }

  @Post()
  post(): string {
    return 'POST';
  }

  @Get('/:id')
  get(@Param('id') id: string): string {
    return `My id is ${id}`;
  }
}
