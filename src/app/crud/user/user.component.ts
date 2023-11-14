import { Validators } from "@angular/forms";
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { FormBaseComponent } from "../../shared/form-base.component";
import { FormBuilder } from "@angular/forms";
import { FormValidators } from "../../shared/form-validators";
import { ApiService } from "../../services/api-service.service";
import { AuthService } from "../../services/auth-service.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent extends FormBaseComponent implements OnInit {
  userData: any;

  itsMine = true;
  header = "Minha conta";
  user: any;
  id! : number; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    super();
    
    
  }

  getById(id : number) {
    return this.apiService.requestFromApi(`user/getById/${id}`).toPromise();
  }

  async ngOnInit() {
    

    this.createForm();
    this.getLoggedUser();

    let id = this.activatedRoute.snapshot.params["id"]
    
    if (id && Number.isInteger(+id) && id > 0) {
      this.user = await this.getById(id);
      console.log(this.user);
      this.id = this.user.id;
      this.header = this.userData.email === this.user.email ? "Minha conta" : this.user.name;
      this.itsMine = this.userData.email === this.user.email;
      this.populateForm(this.user);
    } else {
      this.populateForm(this.userData);
      this.id = this.userData.id;
    }

    console.log(this.userData);
  }

  private createForm() {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      dateBirth: [new Date(), [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, FormValidators.passwordValidator]],
      confirm: ["", [Validators.required, FormValidators.equalsTo("password")]],
    });
  }

  getLoggedUser(): void {
    this.userData = this.authService.getUserData();
  }

  populateForm(form : any): void {
    if (form) {
      this.form.patchValue({
        name: form.name,
        email: form.email,
        dateBirth: form.dateBirth.substring(0,10)
      });
    }
  }

  override submit(): void {
    const form = this.form.value;
    

    this.apiService.updateApi("user/update", {...form, id: this.id}).subscribe({
      next: (data) => {
        console.log(data);

        if (this.itsMine) {
          setTimeout(() => {
            this.authService.logout("É necessário fazer login novamente para atualizar os dados");
          }, 100);
        }

        if (data) {
          this.form.reset();
        }
      },
    });
  }
}
