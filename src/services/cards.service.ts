import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Card } from "src/model/card";

@Injectable()
export class CardService {

    constructor(private http: HttpClient) { }
    getCardsFromList() {
        return this.http.get('https://api.pokemontcg.io/v2/cards/');
    }

    getCards(): Observable<Object> {
        return this.http.get('http://127.0.0.1:3000/card');
    }

    deleteCard(id?: number) {
        if (id != null) return this.http.delete(`http://127.0.0.1:3000/card/${id}`);
        return this.http.delete(`http://127.0.0.1:3000/card`);
    }

    insertCard(card: Card) {
        return this.http.put(`http://127.0.0.1:3000/card`, card);
    }

    updateCard(card: Card) {
        this.http.post(`http://127.0.0.1:3000/card`, card).subscribe({
            next: data => {
                console.log(data);
                return true;
            },
            error: err => {
                console.log(err)
                return false;
            },
            complete: () => {
                console.log("Complete")
            }
        });
    }

}