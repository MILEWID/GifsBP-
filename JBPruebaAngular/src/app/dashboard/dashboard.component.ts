import { Component, OnInit ,NgZone} from '@angular/core';
import { ApiService } from '../services/ApiService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Gif, DataGif } from '../../models/model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Gifs: any = [];
  submitted = false;
  gifForm: FormGroup;

  constructor(
    private ApiService: ApiService,
    private ngZone: NgZone,
    public fb: FormBuilder
    ) { 
      this.mainForm();
      this.gifForm = fb.group({});
    }

  ngOnInit(): void {
    this.readGifs();
    this.mainForm();
  }

  mainForm() {
    this.gifForm = this.fb.group({
      url: "",
      author_id: 2001,
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
          alert('no se ha podido agregar')
          console.log(e);
        },
      });

  }

  eliminar(id: number) {
    if (window.confirm('Esta seguro que desea eliminar?')) {
        const prueba:DataGif= this.ApiService.getGifData.find((item) => item.id === id)!;
        this.ApiService.deleteGif(prueba);
      }
    }
  }

