export class News {
    date = '';
    title = '';
    content = '';
    picture = '';
    docs: any[] = [];
    public constructor() {
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; // months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        this.date = day + '/' + month + '/' + year;

    }
}
