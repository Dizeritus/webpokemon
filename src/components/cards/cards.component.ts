import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from 'src/model/card';
import { DomSanitizer } from '@angular/platform-browser';
import { CardService } from 'src/services/cards.service';

@Component({
    selector: 'cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
    public cards: Card[] = [];
    public list: any[] = [];
    public selectedCard!: Card;
    errorMessage = '';
    mostrarDeck = false;
    loadingDeck = false;
    loadingList = false;
    showModal = false;
    hasError = false;
    constructor(private http: HttpClient, private sanitizer: DomSanitizer, private cardService: CardService) {

    }


    
    openCards(posicoes: number[]) {
        if (posicoes.length < 1) this.getCards();

        let pos = posicoes[0];

        this.cardService.insertCard(this.list[pos]).subscribe({
            next: data => {
                posicoes = posicoes.filter((v, i) => i > 0);
                if (posicoes.length < 1) { 
                    this.getCards(); 
                }
                else this.openCards(posicoes);
            },
            error: err => {
                console.log(err)
                this.hasError = true;
                this.showModal = false;
                this.errorMessage = "Erro ao adicionar carta!";
                return false;
            },
            complete: () => {
                console.log("Complete");
                return true;
            }
        });
    }

    openCardPack() {
        let posicoes: number[] = [];
        for (let index = 0; index < 5; index++) {
            let pos = Math.floor(Math.random() * (249 - 0 + 1) + 0);
            posicoes.push(pos);
        }
        this.openCards(posicoes);
    }

    removeModal() {
        this.showModal = false;
    }

    safeSrc(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }


    ngOnInit() {
        this.getCards();
        this.getListOfCards();
    }

    getListOfCards() {
        this.loadingList = true;
        this.cardService.getCardsFromList().subscribe({
            next: data => {
                if (data == null) {
                    return;
                }
                this.list = [];
                (data as any).data.forEach((c: any) => {
                    let card: Card;
                    card = new Card(c['id'], c['name'], c['types'][0], c['text'], c['images'].large);
                    this.list.push(card);
                });
                this.loadingList = false;
            },
            error: err => {
                console.log(err)
                this.loadingList = false;
                return;
            },
            complete: () => {
                console.log("Complete")
            }
        });
    }

    getCards() {
        this.cardService.getCards().subscribe({
            next: data => {
                if (data == null) {
                    return;
                }
                this.cards = [];
                (data as any).forEach((c: any) => {
                    let card: Card;
                    card = new Card(c['ID'], c['NOME'], c['TYPE'], c['TEXT'], c['IMAGE']);
                    this.cards.push(card);
                });
            },
            error: err => {
                console.log(err)
                return;
            },
            complete: () => {
                console.log("Complete")
            }
        });
    }

    changeMenu(show: boolean) {
        if (show) {
            this.getListOfCards();
        } else {
            this.getCards();
        }
        this.mostrarDeck = show;
    }

    selectCard(card: Card) {
        this.selectedCard = card;
        this.showModal = true;
    }
    deleteAll() {
        this.cardService.deleteCard(undefined).subscribe({
            next: data => {
                this.showModal = false;
                this.getCards();
            }, error: err => {
                console.log(err)
                this.hasError = true;
                this.showModal = false;
                this.errorMessage = "Erro ao deletar carta!";
            },
            complete: () => {
                console.log("Complete")
            }
        });
    }
    deleteCard(card: Card) {
        this.cardService.deleteCard(card.id).subscribe({
            next: data => {
                this.showModal = false;
                this.getCards();
            }, error: err => {
                console.log(err)
                this.hasError = true;
                this.showModal = false;
                this.errorMessage = "Erro ao deletar carta!";
            },
            complete: () => {
                console.log("Complete")
            }
        });
    }

    adicionarCard() {
        this.cardService.insertCard(this.selectedCard).subscribe({
            next: data => {
                this.showModal = false;
            },
            error: err => {
                console.log(err)
                this.hasError = true;
                this.showModal = false;
                this.errorMessage = "Erro ao adicionar carta!";
            },
            complete: () => {
                console.log("Complete")
            }
        });
    }

}