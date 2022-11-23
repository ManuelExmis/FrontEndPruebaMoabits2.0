import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user';
import { MessageService, ConfirmationService } from 'primeng/api'
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class UserComponent implements OnInit {

  public loading: boolean = false;

  usuarios: User[] = []
  rolls: any[] = [];
  showModal: boolean = false;
  isEditing: boolean = false
  public userForm = this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    date_of_birth: [new Date(), [Validators.required]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.maxLength(500)]],
    email: ['', [Validators.required, Validators.email]],
    login: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    password: [''],
    rol_id: [null, [Validators.required]],
  })

  constructor(
    public usersService: UsersService,
    public messageService: MessageService,
    public router: Router,
    public formBuilder: FormBuilder,
    public confirmationService: ConfirmationService
  ){}

  ngOnInit(): void {
    this.cargarUsuarios()
    this.cargarRoles()
  }

  cargarRoles() {
    this.usersService.getRolls()
    .subscribe({
      next: (response) => {

        this.rolls = response.map((item: any) => {
          return {
            name: item.name,
            code: item.id
          }
        });

      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error loading rolls',
          detail: error.message
        })
        console.log('error: ', error)
      }
    })
  }

  cargarUsuarios() {
    this.loading = true;
    this.usersService.getUsuarios()
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.usuarios = response;

        },
        error: (error) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading users',
            detail: error.message
          })
          console.log('error: ', error)
        }
      })
  }

  addUser() {
    this.isEditing = false
    this.userForm.reset()
    this.showModal = true
  }

  editUser(user: any) {
    //console.log('usereidt: ', user)
    this.userForm.reset()
    this.isEditing = true
    let date = new Date(user.date_of_birth)
    this.userForm.setValue({
      id: user.id,
      name: user.name,
      date_of_birth: date,
      phone: user.phone,
      address: user.address,
      email: user.email,
      login: user.login,
      password: '',
      rol_id: this.rolls.find(rol => rol.code == user.rol_id)
    })
    this.showModal = true;
  }

  deleteUser(id: Number) {
    this.loading = true
    this.usersService.deleteUser(id)
      .subscribe({
        next: (response) => {
          this.loading = false;
          console.log('resposne ok: ', response)

          this.cargarUsuarios()
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'the user was deleted'
          })

        },
        error: (error) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error deleting user',
            detail: error.message
          })
          console.log('error: ', error)
        }
      })
  }

  questionDeleteUser(id: Number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteUser(id)
      },
      reject: () => {}
  });
  }

  logOut() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }

  saveUser() {
    console.log('userForm: ', this.userForm)
    let rol: any = this.userForm.value.rol_id
    console.log('data put: ', {...this.userForm.value, rol_id: rol.code })
    //return

    if (this.userForm.valid) {
      this.loading = true;
      if (this.isEditing) {
        this.usersService.updateUser({...this.userForm.value, rol_id: rol.code })
        .subscribe({
          next: (response) => {

            console.log('resposne ok: ', response)
            this.loading = false;
            this.cargarUsuarios()
            this.showModal = false
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'the user was updated'
            })

          },
          error: (error) => {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading users',
              detail: error.message
            })
            console.log('error: ', error)
          }
        })
      } else {
        this.usersService.addUser({...this.userForm.value, rol_id: rol.code })
        .subscribe({
          next: (response) => {
            this.loading = false;
            console.log('resposne ok: ', response)

            this.cargarUsuarios()
            this.showModal = false
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'the user was updated'
            })

          },
          error: (error) => {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error loading users',
              detail: error.message
            })
            console.log('error: ', error)
          }
        })
      }
    }
    else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid',
        detail: 'Datos invalidos'
      })
    }
  }

  cancel() {
    this.showModal = false;
  }

}
