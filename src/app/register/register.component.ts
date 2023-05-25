import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HTTPResponse} from "../../shared/service/knife.service";
import {UserResponse} from "../../shared/model/user-response";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector:"app-register",
  templateUrl:"register.component.html",
  styleUrls:["register.component.scss"]
})

export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  availableUsername:boolean=true;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router:Router,
              private auth:AuthService) {
  }


  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      passwordGroup: this.fb.group({password: '', confirmPassword: ''},
        {validators: [RegisterComponent.passwordValidator]})
    })

  }

  static passwordValidator({value: {password, confirmPassword}}: FormGroup): null | { passwordNotMatch: string } {
    return password === confirmPassword ? null : {passwordNotMatch: 'Check your passwords'};

  }


  onSubmit() {
    console.log(this.registerForm.value);
    if(this.registerForm.valid)
    {

      this.http.post<UserResponse>(`${environment.APL_URL}/users`, {
        username: this.registerForm.value.username,
        password: this.registerForm.value.passwordGroup.password
      }).subscribe({next:next=>{(next.success)?this.router.navigateByUrl("/home"):this.availableUsername=false;},
      error:()=>{this.availableUsername=false;}});
    }

  }
}
