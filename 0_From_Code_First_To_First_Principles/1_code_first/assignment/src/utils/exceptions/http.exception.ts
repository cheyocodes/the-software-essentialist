export type HttpExceptionProps = {
    statusCode: number;
    message: string;
  };
  
  export class HttpException extends Error {
    public statusCode: number;
    public message: string;
  
    constructor(exception: HttpExceptionProps) {
      super(exception.message);
      this.statusCode = exception.statusCode;
      this.message = exception.message;
    }
  }