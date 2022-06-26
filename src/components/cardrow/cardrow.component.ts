import { Component, Input } from "@angular/core";
import { Card } from "src/model/card";

@Component({
    selector: 'cardrow',
    templateUrl: './cardrow.component.html',
    styleUrls: ['./cardrow.component.scss']
})
export class CardrowComponent {
    
    @Input()
    card!: Card;

}