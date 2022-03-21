export class Post {
    public date: string;
    public userName: string;
    constructor(public topic: string, public title: string, public description: string, public body: string) {
        const dateObj = new Date();
        const month = dateObj.getUTCMonth() + 1; // months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        this.date = day + '/' + month + '/' + year;

        this.userName = localStorage.getItem('name');
    }
}
