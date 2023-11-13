import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormBaseComponent } from "../../shared/form-base.component";
import { AuthService } from "../../services/auth-service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent extends FormBaseComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  submit() {
    let valueSubmit = Object.assign({}, this.form.value);
    console.log(valueSubmit);

    // TODO: Add user to database
    this.authService.login(valueSubmit.username, valueSubmit.password).subscribe({
      next: (r) => {
        console.log(r);
      }, error: (err) => {
        console.log(err.error);
      }
    });
  }
}
