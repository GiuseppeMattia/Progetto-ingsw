import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Domanda} from '../models/domanda.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-sceglitu',
  imports: [CommonModule],
  templateUrl: './sceglitu.component.html',
  styleUrl: './sceglitu.component.css'
})
export class SceglituComponent implements OnInit{

  protected domande: Domanda[];
  protected audioUrl : any;

  constructor(private api: ApiService){
    this.domande = [];
  };

  fromByteToAudio(byte: string){
    let byteCharacters = atob(byte); // Trasforma da Base64 ad ASCII
    let byteArray = new Uint8Array(byteCharacters.length);

    // Memcpy alla crapigna perché Typescript non lo ha
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    // Blob: dato usato per rappresentare immagini, video, audio, ecc.
    return new Blob([byteArray], { type: 'audio/mp3' });
  }

  ngOnInit() {
    let d = this.api.questions();
    d.subscribe(questions => {
      this.domande = questions;

      let audioBlob = this.fromByteToAudio(this.domande[0].audio)

      // Crea un URL temporaneo per il Blob
      this.audioUrl = URL.createObjectURL(audioBlob);
    })
  }


}
