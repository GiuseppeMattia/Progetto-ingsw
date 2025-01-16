// Model della domanda
export class Domanda {

  constructor(private _id: number, private _descrizione: string, private _modalitasceglitu: boolean,
              private _rispostacorretta: number, private _audio: any) {}


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get descrizione(): string {
    return this._descrizione;
  }

  set descrizione(value: string) {
    this._descrizione = value;
  }

  get modalitasceglitu(): boolean {
    return this._modalitasceglitu;
  }

  set modalitasceglitu(value: boolean) {
    this._modalitasceglitu = value;
  }

  get rispostacorretta(): number {
    return this._rispostacorretta;
  }

  set rispostacorretta(value: number) {
    this._rispostacorretta = value;
  }

  get audio(): any {
    return this._audio;
  }

  set audio(value: any) {
    this._audio = value;
  }
}
