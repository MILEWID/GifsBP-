import { Component, OnInit ,NgZone} from '@angular/core';
import { ApiService } from '../services/ApiService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Gifs: any = [];
  submitted = false;
  gifForm: FormGroup;
  EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];
  constructor(
    private ApiService: ApiService,
    private ngZone: NgZone,
    public fb: FormBuilder) { 
      this.gifForm = this.fb.group({
        url: [''],
      });
    }

  ngOnInit(): void {
    this.readGifs();
    this.gifForm = this.fb.group({
      url: [''],
    });
  }

  readGifs() {
    this.ApiService.getGifs().subscribe((data) => {
      console.log(data);
      this.Gifs = data;
    });
  }

  onSubmit() {
    this.submitted = true;
      return this.ApiService.createGifs(this.gifForm.value).subscribe({
        complete: () => {
          alert('Gif agregado correctamente ')
        },
        error: (e) => {
          console.log(e);
        },
      });

  }

}
