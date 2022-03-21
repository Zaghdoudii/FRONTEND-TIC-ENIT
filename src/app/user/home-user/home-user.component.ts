import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Candidacy } from '../models/candidacy.model';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {
  offers1 = [];
  offers = [];
  companiesId = [];
  companiesInfo = [];

  idOffer = '';
  contentOffer = '';
  docs = [];
  noDocs = true;

  erreur1 = false;

  selectedFile: File;

  form: FormGroup;
  fileData: string;
  size = '';
  selectedDoc: Document = new Document();
  status = [];
  selectedFiles = [];

  title = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      file: new FormControl(null),
    });
    this.getOffers();
  }
  getOffers() {

    const reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    this.http.get('https://backend-ticenit.herokuapp.com/offers' , { headers: reqHeader }).subscribe((data: any) => {
      console.log(data);
      this.offers1 = data;
      this.getCompaniesInfo();
    },
    (err: HttpErrorResponse) => {
    console.log(err);
    });
  }

  getPictureCompany(i: number) {
    let url = '../../../assets/img/companyprofil.png';
    if (this.companiesInfo[i].logo !== undefined && this.companiesInfo[i].logo !== '') {
      url = this.companiesInfo[i].logo;
    }
    return url;
  }

  getCompaniesInfo() {
    this.offers1.forEach(elt => {
      this.companiesId.push(elt.companyid);
    });
    console.log(this.companiesId);
    const reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    this.http.post('https://backend-ticenit.herokuapp.com/student/companiesinfo' , { companies : this.companiesId}, { headers: reqHeader }).subscribe((data: any) => {
      this.companiesInfo = data;
      this.offers = this.offers1;
      console.log(data);
    },
    (err: HttpErrorResponse) => {
    console.log(err);
    });
  }

  public togglePopup() {
    document.getElementById('popup-1').classList.toggle('active');
  }

  onFileChanged(event) {
    this.selectedFiles = (event.target).files;
    console.log(this.selectedFiles);
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.status.push({
        id : this.selectedFiles[i].size + 300 + '',
        status : 0,
        name : this.selectedFiles[i].name,
      });
    }
    this.noDocs = false;
  }

  postCandidacy(cand: Candidacy) {
    console.log(cand);
    const reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    this.http.post('https://backend-ticenit.herokuapp.com/student/apply/' + this.idOffer, cand , { headers: reqHeader }).subscribe((data: any) => {
     // console.log(data);

    this.contentOffer = '';

    // this.getOffers();
   },
   (err: HttpErrorResponse) => {
    // console.log(err);
   });
  }

  addCandidacy() {
    if ( this.contentOffer == '') {
      this.erreur1 = true;
    } else {
      const cand = new Candidacy();
      cand.body = this.contentOffer;

      if (this.noDocs) {
        this.postCandidacy(cand);
      } else {

        let name = '';
        let nb = 0;
        for (let i = 0; i < this.selectedFiles.length; i++) {
          this.selectedFile = this.selectedFiles[i];
          this.size = Math.round(this.selectedFile.size / 1024) + ' Ko';
          this.title = this.selectedFile.name;
          name = this.selectedFiles[i].name;


          const file = this.selectedFile;
          this.form.patchValue({ file: file });
          const reader = new FileReader();

          reader.onload = () => {
          this.fileData = reader.result as string;
          };

          reader.readAsDataURL(file);

          const type = this.selectedFile.name.split('.')[this.selectedFile.name.split('.').length - 1];
          const fData = new FormData();
          const doc = new Document();

          fData.append('name', this.form.value.name);
          fData.append('file',  this.selectedFile, this.selectedFile.name);
          // console.log(fData);
          this.http.post('https://backend-ticenit.herokuapp.com/admin/newsdoc?type=' + type, fData , {reportProgress : true, observe : 'events'}).subscribe((event: any) => {
          if (event.type === HttpEventType.UploadProgress )  {
            for (let j = 0; j < this.status.length; j++) {
              console.log(event)
              if (eval(this.status[j].id) < event.total + 100 && eval(this.status[j].id) > event.total - 100 && this.status[j].status < 100) {
              if (this.status[j].status < Math.round(event.loaded / event.total * 100)) {
                this.status[j].status = Math.round(event.loaded / event.total * 100) ;
                break;
              }

              }
            }
          } else if (event.type === HttpEventType.Response) {
            cand.docs.push({link : event.body.link, name : event.body.name});
            console.log(event);
            nb++;
            if (nb === this.status.length) {// c'est fini
              this.selectedFiles = [];
              this.status = [];
              this.title = '';
              this.postCandidacy(cand);
              this.togglePopup();
            }
          }
          },
          (err: HttpErrorResponse) => {
          console.log(err);
          });

          this.form.reset();
          this.fileData = null;
        }


      }

    }



  }


}
