export class AuthModel {
   public message: string;
   public isError: boolean;

   constructor(errorMessage: string, isError: boolean) {
     this.message = errorMessage;
     this.isError = isError;
   }
}
