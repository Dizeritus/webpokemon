export class Card {
    id;
    nome;
    type;
    image;
    text;

    constructor(id: number, nome: string, type: string, text: string, image: string) {
        this.id = id;
        this.nome = nome;
        this.type = type;
        this.text = text;
        this.image = image;
    }
}