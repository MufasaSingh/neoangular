import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrormodalComponent } from "./errormodal.component";



@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor( private dialog: MatDialog ){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse)=>{
                let errorMsg = "An Unknown Error Occured";
                console.log(err);
                
                if(err.error.error_msg){
                    errorMsg = err.error.error_msg;
                }
                this.dialog.open(ErrormodalComponent,{data: {message: errorMsg}});
                // alert(err.error.message);
                return throwError(err);
            })
        )
    }
    
}