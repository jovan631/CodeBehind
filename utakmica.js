export class Utakmica {
  constructor(Team1, Team2, Result) {
    this.Team1 = Team1;
    this.Team2 = Team2;
    this.Result1 = Result[0];
    this.Result2 = Result[1];
  }

  dodavanjeInformacijaOTimovima() {
    if (this.Result1 > this.Result2) {
      this.Team1.pobede++;
      this.Team1.bodovi = this.Team1.bodovi + 2;
      this.Team1.datiKosevi = this.Result1 + this.Team1.datiKosevi;
      this.Team1.primljeniKosevi = this.Result2 + this.Team1.primljeniKosevi;
      this.Team1.kosRazlika =
        this.Result1 - this.Result2 + this.Team1.kosRazlika;

      this.Team2.porazi++;
      this.Team2.bodovi = this.Team2.bodovi + 1;
      this.Team2.datiKosevi = this.Result2 + this.Team2.datiKosevi;
      this.Team2.primljeniKosevi = this.Result1 + this.Team2.primljeniKosevi;
      this.Team2.kosRazlika =
        this.Result2 - this.Result1 + this.Team2.kosRazlika;

      if (this.Result2 == 0) {
        this.Team2.bodovi--;
      }
    } else {
      this.Team1.porazi++;
      this.Team1.bodovi = this.Team1.bodovi + 1;
      this.Team1.datiKosevi = this.Result1 + this.Team1.datiKosevi;
      this.Team1.primljeniKosevi = this.Result2 + this.Team1.primljeniKosevi;
      this.Team1.kosRazlika =
        this.Result1 - this.Result2 + this.Team1.kosRazlika;

      this.Team2.pobede++;
      this.Team2.bodovi = 2 + this.Team2.bodovi;
      this.Team2.datiKosevi = this.Result2 + this.Team2.datiKosevi;
      this.Team2.primljeniKosevi = this.Result1 + this.Team2.primljeniKosevi;
      this.Team2.kosRazlika =
        this.Result2 - this.Result1 + this.Team2.kosRazlika;

      if (this.Result1 == 0) {
        this.Team1.bodovi--;
      }
    }
  }
}
