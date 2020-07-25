import { Injectable } from '@angular/core';
import { GoogleResponse } from 'src/models/interfaces/google-response.interface';


@Injectable()
export class GoogleLogin {

    _loginResponse: GoogleResponse = {
        accessToken: 'ya29.a0AfH6SMB4_AV27Qxkwj4ucSsex2ARMJPSDtab_38D8U2BieI6xPpWp64KxkcOr2cyoT4U2gdfxaAZRsME4X_qkT8vDkhy38uT3F46vqgfP4nEFEBWc2ss4Lr9dx1UnFNbBHJHrlgkqINESPrQZxXxW7roc5sJkqz4_giH',
        displayName: 'David Vivanco Miquis',
        email: 'vivancomiquis@gmail.com',
        expires: 1593879289,
        expires_in: 3449,
        familyName: 'Vivanco Miquis',
        givenName: 'David',
        userId: '114201849668428294198',
        imageUrl:'https://lh3.googleusercontent.com/a-/AOh14GiN6tgdNmEYXGyyr_QFJQ2phLwgBfk_r7J6W6uTtA'
    };

    constructor() {
    }


    public set loginResponse(loginResponse: GoogleResponse) {
        this._loginResponse = loginResponse;
    }


    public get loginResponse(): GoogleResponse {
        return this._loginResponse;
    }


}

