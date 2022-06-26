import { Component, Input } from "@angular/core";

@Component({
    selector: 'aba_lista',
    templateUrl: './aba_lista.component.html',
    styleUrls: ['./aba_lista.component.scss']
})
export class AbaListaComponent {
    @Input()
    public list: any[] = [];
     
    
}

