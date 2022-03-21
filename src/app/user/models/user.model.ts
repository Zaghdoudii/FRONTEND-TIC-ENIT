export class User {
    firstname = '';
    lastname = '';
    email = '';
    password: string;
    country = '';
    city = '';
    address = '';
    type: string;
    workAt = '';
    class: string;
    linkedin = '';
    picture: string ;
    phone  = '';
    aboutme = '';
    promotion: string;
    constructor(type: string) {
        this.type = type;

    }
}

