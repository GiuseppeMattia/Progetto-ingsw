// Model della risposta
export class Risposta {

  constructor(private _id: number, private _descrizione: string, private _modalitasceglitu: boolean) {}


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
}
