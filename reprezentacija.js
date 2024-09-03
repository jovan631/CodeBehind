export class Reprezentacija {
  constructor(Team, ISOCode, FIBARanking) {
    this.Team = Team;
    this.ISOCode = ISOCode;
    this.FIBARanking = FIBARanking;
    this.odigraneUtakmice = [];
    this.pobede = 0;
    this.porazi = 0;
    this.bodovi = 0;
    this.primljeniKosevi = 0;
    this.datiKosevi = 0;
    this.kosRazlika = 0;
    this.rangirani = [];
  }

  dodajIRangiraj(grupe) {
    const prvoplasirani = [];
    const drugoplasirani = [];
    const treceplasirani = [];

    grupe.forEach((grupa) => {
      if (grupa.reprezentacijeUGrupi.length >= 1)
        prvoplasirani.push(grupa.reprezentacijeUGrupi[0]);
      if (grupa.reprezentacijeUGrupi.length >= 2)
        drugoplasirani.push(grupa.reprezentacijeUGrupi[1]);
      if (grupa.reprezentacijeUGrupi.length >= 3)
        treceplasirani.push(grupa.reprezentacijeUGrupi[2]);
    });

    const sortirajTimove = (a, b) => {
      if (b.bodovi !== a.bodovi) return b.bodovi - a.bodovi;
      if (b.kosRazlika !== a.kosRazlika) return b.kosRazlika - a.kosRazlika;
      return b.datiKosevi - a.datiKosevi;
    };

    prvoplasirani.sort(sortirajTimove);
    drugoplasirani.sort(sortirajTimove);
    treceplasirani.sort(sortirajTimove);

    this.rangirani = [...prvoplasirani, ...drugoplasirani, ...treceplasirani];
  }
}
