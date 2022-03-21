export class Candidacy {
    idStudent: string;
    date: string;
    namecreator: string;
    body: string;
    docs: any[] = [];
    constructor() {
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; // months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        this.date = day + '/' + month + '/' + year;
        this.namecreator = localStorage.getItem('name');

        this.idStudent = localStorage.getItem('user_id');
    }


}
