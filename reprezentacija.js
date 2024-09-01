export class Reprezentacija

{
    constructor(Team, ISOCode, FIBARanking)
    {
        this.Team=Team;
        this.ISOCode=ISOCode;
        this.FIBARanking=FIBARanking;
        this.odigraneUtakmice=[];
        this.pobede=0;
        this.porazi=0;
        this.bodovi=0;
        this.primljeniKosevi=0;
        this.datiKosevi=0;
        this.kosRazlika=0;
        this.rangirani=[];
    }   

  

  // Funkcija za dodavanje i rangiranje timova iz grupa
dodajIRangiraj(grupe) {

  // Formiramo liste za prvoplasirane, drugoplasirane i treceplasirane timove iz svih grupa
  const prvoplasirani = [];
  const drugoplasirani = [];
  const treceplasirani = [];

  // Prolazimo kroz svaku grupu i dodajemo prvoplasirane, drugoplasirane i treceplasirane timove u odgovarajuce liste
  grupe.forEach(grupa => {
    if (grupa.reprezentacijeUGrupi.length >= 1) prvoplasirani.push(grupa.reprezentacijeUGrupi[0]);
    if (grupa.reprezentacijeUGrupi.length >= 2) drugoplasirani.push(grupa.reprezentacijeUGrupi[1]);
    if (grupa.reprezentacijeUGrupi.length >= 3) treceplasirani.push(grupa.reprezentacijeUGrupi[2]);
  });

  // Funkcija za sortiranje timova prema bodovima, kos razlici, i broju postignutih koseva
  const sortirajTimove = (a, b) => {
    if 
    (b.bodovi !== a.bodovi) 
    return b.bodovi - a.bodovi;
    if 
    (b.kosRazlika !== a.kosRazlika) 
    return b.kosRazlika - a.kosRazlika;
    return b.kosevi - a.kosevi;
  };

  // Sortiramo timove unutar svake kategorije
  prvoplasirani.sort(sortirajTimove);
  drugoplasirani.sort(sortirajTimove);
  treceplasirani.sort(sortirajTimove);

  // Kombinujemo rangirane timove u konacan niz rangiranih timova
  this.rangirani = prvoplasirani.concat(drugoplasirani).concat(treceplasirani);

 
}

  pronadjiBoljeg(Tim) {
    const utakmica = this.odigraneUtakmice.find(utakmica => Tim === utakmica.Opponent);
    if (utakmica) {
     
      return utakmica.Result2 > utakmica.Result1;
    }
   
    return false;
  }
    
}




