import { readFile } from 'fs/promises';
import { Grupa } from './grupa.js';
import { Reprezentacija } from './reprezentacija.js';
import { Utakmica } from './utakmica.js';
import { odigranaUtakmica } from './odigranaUtakmica.js';
import { Zreb } from './zreb.js';


  async function procitajGrupe() { //Glavna funkcija koja cita podatke iz json fajla
    try {
      
      const data = await readFile('groups.json', 'utf8');
  
      const jsonData = JSON.parse(data);
  
      const grupe = [];
      
      for (const key in jsonData) { //Iterira kroz grupe A B C .. u jsonData
        const reprezentacijeG=[];
        if (Object.hasOwnProperty.call(jsonData, key)) {
          const teamList = jsonData[key];
          
          const instances = teamList.map(data =>
            new Reprezentacija(data.Team, data.ISOCode, data.FIBARanking)
          );
          reprezentacijeG.push(...instances);
          const g= new Grupa(key,reprezentacijeG);
          grupe.push(g);
        }
      }
      
      olimpijskeIgre(grupe);
      
  
    } 
    catch (error) {
      console.error('Error reading the file:', error);
    }
  }
  

  function olimpijskeIgre(grupe) //Funkcija u kojoj se radi kompletna funkcionalnost aplikacije
  {
   
    for ( let i=1; i<4; i++) //For petlja za iteraciju kroz kola svih grupa!
    {

      console.log("Grupna faza - kolo " + i);
      console.log("\n");
      grupe.forEach(g => {

         const utakmiceGrupneFaze=[];
        console.log("    Grupa " + g.groupName)
        
       
        //For petlja mora se napravi za iteraciju za reprezentacije utakmice tj svaka sa svakom mora da igra
        
        var r1= Rezultat(g.reprezentacijeUGrupi[0].FIBARanking, g.reprezentacijeUGrupi[i].FIBARanking); //rezultat za utakmicu i za odigranu utakmicu OU1
         var r11=[r1[1],r1[0]]; //Rezultat za utakmicu i za odigranu utakmicu OU1, tj okrenuli smo rezultat 

        const U1=new Utakmica(g.reprezentacijeUGrupi[0],g.reprezentacijeUGrupi[i], r1);

         const OU11=new odigranaUtakmica(g.reprezentacijeUGrupi[i],r1);// Clan u reprezentacijigrupi[0] igrao sa clanom od i
         const OU12=new odigranaUtakmica(g.reprezentacijeUGrupi[0],r11); // Clan u reprezentacijigrupi[i] igrao sa clanom od 0

         g.reprezentacijeUGrupi[0].odigraneUtakmice.push(OU11);
         g.reprezentacijeUGrupi[i].odigraneUtakmice.push(OU12);

        if (i==1)
        {
          var r2= Rezultat(g.reprezentacijeUGrupi[2].FIBARanking,g.reprezentacijeUGrupi[3].FIBARanking);
           var r22=[r2[1],r2[0]];

         var U2=new Utakmica(g.reprezentacijeUGrupi[2],g.reprezentacijeUGrupi[3],r2);

         const OU21=new odigranaUtakmica(g.reprezentacijeUGrupi[3],r2);
         const OU22=new odigranaUtakmica(g.reprezentacijeUGrupi[2],r22);

          g.reprezentacijeUGrupi[2].odigraneUtakmice.push(OU21);
          g.reprezentacijeUGrupi[3].odigraneUtakmice.push(OU22);

        }

        if (i==2)
        {
          var r3=Rezultat(g.reprezentacijeUGrupi[1].FIBARanking,g.reprezentacijeUGrupi[3].FIBARanking);
          var r33=[r3[1],r3[0]];

          var U2=new Utakmica(g.reprezentacijeUGrupi[1],g.reprezentacijeUGrupi[3],r3);
          
           const OU31=new odigranaUtakmica(g.reprezentacijeUGrupi[3],r3);
           const OU32=new odigranaUtakmica(g.reprezentacijeUGrupi[1],r33);

          g.reprezentacijeUGrupi[1].odigraneUtakmice.push(OU31);
          g.reprezentacijeUGrupi[3].odigraneUtakmice.push(OU32);

        }

        if (i==3)
        {
          var r4=Rezultat(g.reprezentacijeUGrupi[1].FIBARanking,g.reprezentacijeUGrupi[2].FIBARanking)
          var r44=[r4[1],r4[0]];

          var U2=new Utakmica(g.reprezentacijeUGrupi[1],g.reprezentacijeUGrupi[2],r4);

          const OU41=new odigranaUtakmica(g.reprezentacijeUGrupi[2],r4);
          const OU42=new odigranaUtakmica(g.reprezentacijeUGrupi[1],r44);

          g.reprezentacijeUGrupi[1].odigraneUtakmice.push(OU41);
          g.reprezentacijeUGrupi[2].odigraneUtakmice.push(OU42);
        }

        utakmiceGrupneFaze.push(U1,U2);
        utakmiceGrupneFaze.forEach(e =>
          {
            console.log("       " +e.Team1.Team + " - " + e.Team2.Team + " "+"("+ e.Result1 + " : " + e.Result2+")");
            e.dodavanjeInformacijaOTimovima()
           
          }
        );

        console.log("\n");
    });
    console.log("\n");
    
  }

  sortirajNizReprezentacijaUGrupi(grupe);
  zreb(grupe);
  }



  function Rezultat(rang1,rang2)
  {
    function sansaZaPobedu(rangA, rangB)
    {
      const razlikaRanga= rangB - rangA;
      const osnovaVerovatnoce= 50;
      const promena= 0.05;
      const verovatnocaTimaA= osnovaVerovatnoce + razlikaRanga*promena;
      const krajnjaVerovatnocaTimaA= Math.max(0,Math.min(100,verovatnocaTimaA));
      const krajnjaVerovatnocaTimaB=100-krajnjaVerovatnocaTimaA;

      return{
        pobedaTima1: krajnjaVerovatnocaTimaA,
        pobedaTima2: krajnjaVerovatnocaTimaB
      };
    }

    const verovatnocaPobede = sansaZaPobedu(rang1, rang2);

    const random = Math.random() * 100;
    let pobednik;

    if(random<=verovatnocaPobede.pobedaTima1)
    {
      pobednik="Team 1";
    }
    else
    {
      pobednik="Team 2";
    }

    let rezultatTima1, rezultatTima2;

    if(pobednik=="Team 1")
    {
      rezultatTima1=Math.floor(Math.random() * 20) +80;
      rezultatTima2=Math.floor(Math.random()*rezultatTima1);
    }
    else
    {
      rezultatTima2 = Math.floor(Math.random()*20) + 80;
      rezultatTima1=Math.floor(Math.random()*rezultatTima2);
    }

    return[rezultatTima1,rezultatTima2];

  }


  function sortirajNizReprezentacijaUGrupi(grupe)
  {
      //Proveravanje pravila grupne faze

        grupe.forEach(g => { 
          g.reprezentacijeUGrupi.sort((a, b) => {
            // Prvo sortiraj po bodovima u opadajucem redosledu
            if (b.bodovi !== a.bodovi) {
              return b.bodovi - a.bodovi;
            }
      
            // Ako dva tima imaju isti broj bodova, koristi funkciju pronadjiBoljeg
            const timoviSaIstimPoenima = g.reprezentacijeUGrupi.filter(team => team.bodovi === a.bodovi);
      
            if (timoviSaIstimPoenima.length === 3) {
              // Ako su tri tima sa istim brojem bodova, koristi razliku u poenima izmedju njih
              const razlikaUPoenimaA = a.razlikaPoena(timoviSaIstimPoenima);
              const razlikaUPoenimaB = b.razlikaPoena(timoviSaIstimPoenima);
              if (razlikaUPoenimaA !== razlikaUPoenimaB) {
                return razlikaUPoenimaB - razlikaUPoenimaA; // Sortiraj po razlici u poenima u opadajucem redosledu
              }
            }
      
            // Ako su bodovi jednaki i nema formiranja kruga
            if (a.pronadjiBoljeg(b)) {
                  return 1;
                } else {
                  return -1;
                }
          });
        });
   

    console.log("Konacan plasman u grupama: ")
    console.log("\n");
    grupe.forEach(e=>
    {
      console.log("    Grupa "+ e.groupName + " (Ime - pobede/porazi/bodovi/postignuti kosevi/primljeni kosevi/kos razlika)::");
      console.log("\n");
      for(let i=0;i<4;i++)
      {
        console.log("       "+(i+1)+". " + e.reprezentacijeUGrupi[i].Team + "  " + e.reprezentacijeUGrupi[i].pobede + " / " + e.reprezentacijeUGrupi[i].porazi 
          + " / " + e.reprezentacijeUGrupi[i].bodovi + " / " + e.reprezentacijeUGrupi[i].datiKosevi + " / " + e.reprezentacijeUGrupi[i].primljeniKosevi + " / " 
          + e.reprezentacijeUGrupi[i].kosRazlika);
      }
      console.log("\n");
    });
    
// Prolazimo kroz svaku grupu
for (let groupIndex = 0; groupIndex < grupe.length; groupIndex++) {
  const grupa = grupe[groupIndex];

  // Proveravamo da li postoje reprezentacije u grupi
  if (grupa.reprezentacijeUGrupi.length > 0) {
    // Uklanjamo poslednju reprezentaciju iz niza
    const izbacenaReprezentacija = grupa.reprezentacijeUGrupi.pop();
    console.log( "Izbacujemo reprezentaciju " +izbacenaReprezentacija.Team + " iz grupe " + grupa.groupName +" sa " +izbacenaReprezentacija.bodovi +" boda");
  }
}

console.log("\n");
  
  }

  
  function zreb(grupe)
  {
    let preostaleReprezentacije = [];

      // Prolazimo kroz svaku grupu da prikupimo preostale reprezentacije
      for (let grupa of grupe) 
        {
      preostaleReprezentacije = preostaleReprezentacije.concat(grupa.reprezentacijeUGrupi);
        }

    
    let reprezentacija = new Reprezentacija();

    // Dodajemo 8 najboljih reprezentacija u rangirani niz
    reprezentacija.dodajIRangiraj(grupe);

    
    let sesir=new Zreb();
    sesir.sesiri.D.push(reprezentacija.rangirani[0], reprezentacija.rangirani[1]); // Timovi sa rangom 1 i 2
    sesir.sesiri.E.push(reprezentacija.rangirani[2], reprezentacija.rangirani[3]); // Timovi sa rangom 3 i 4
    sesir.sesiri.F.push(reprezentacija.rangirani[4], reprezentacija.rangirani[5]); // Timovi sa rangom 5 i 6
    sesir.sesiri.G.push(reprezentacija.rangirani[6], reprezentacija.rangirani[7]); // Timovi sa rangom 7 i 8

    console.log("Sesiri: ");
    console.log("    Sesir D");
    sesir.sesiri.D.forEach(team => console.log("       " + team.Team));
    console.log("    Sesir E");
    sesir.sesiri.E.forEach(team => console.log("       " + team.Team));
    console.log("    Sesir F");
    sesir.sesiri.F.forEach(team => console.log("       " + team.Team));
    console.log("    Sesir G");
    sesir.sesiri.G.forEach(team => console.log("       " + team.Team));

    // Funkcija za nasumicno biranje tima iz sesira
  function nasumicnoOdaberiTim(sesir) 
  {
  const randomIndex = Math.floor(Math.random() * sesir.length);
  return sesir.splice(randomIndex, 1)[0]; // Uklanja i vraca nasumicno odabran tim
  }

// Parovi cetvrtfinala
let paroviCetvrtfinala = [];

// Biramo nasumicne parove iz sesira
while (sesir.sesiri.D.length > 0 && sesir.sesiri.G.length > 0) {
  const timD = nasumicnoOdaberiTim(sesir.sesiri.D);
  const timG = nasumicnoOdaberiTim(sesir.sesiri.G);
  paroviCetvrtfinala.push({ timD, timG }); 
  
}

while (sesir.sesiri.E.length > 0 && sesir.sesiri.F.length > 0) {
  const timE = nasumicnoOdaberiTim(sesir.sesiri.E);
  const timF = nasumicnoOdaberiTim(sesir.sesiri.F);
  paroviCetvrtfinala.push({ timE, timF }); 
  

}


console.log("\n");
console.log("Eliminaciona faza:");


// Prikazivanje parova cetvrtfinala
paroviCetvrtfinala.forEach((par, index) => {
    // Proveravamo prisustvo timova pre nego što ih prikažemo
    if (par.timD && par.timG) {
        
        console.log("    "+par.timD.Team + " - " + par.timG.Team);
    }
    if (par.timE && par.timF) {
      console.log("    "+ par.timE.Team + " - " + par.timF.Team);
    }
});
console.log("\n");

//Cetvrtfinale

// Prolazak kroz sve parove i kreiranje utakmica
const utakmiceCetvrtfinala = paroviCetvrtfinala.map(par => {
  let tim1, tim2, rezultat;
  
  // Proveravamo koja grupa parova je u pitanju
  if (par.timD && par.timG) {
    tim1 = par.timD;
    tim2 = par.timG;
  } else if (par.timE && par.timF) {
    tim1 = par.timE;
    tim2 = par.timF;
  }
  
  // Generisemo rezultat za par timova
  rezultat = Rezultat(tim1.FIBARanking, tim2.FIBARanking);
  
  // Kreiramo novu utakmicu
  return new Utakmica(tim1, tim2, rezultat);
});

// Ispisujemo rezultate utakmica
console.log("Cetvrtfinale:" );
utakmiceCetvrtfinala.forEach((utakmica) => {
  console.log("    "+utakmica.Team1.Team+" - " +utakmica.Team2.Team + " ("+utakmica.Result1 + ": " +utakmica.Result2+")" );
});
console.log("\n");

//Polufinale

// Određivanje pobednika četvrtfinala
const pobedniciCetvrtfinala = utakmiceCetvrtfinala.map(utakmica => {
  return utakmica.Result1 > utakmica.Result2 ? utakmica.Team1 : utakmica.Team2;
});

// Organizovanje polufinalnih utakmica
const utakmicePolufinala = [];
if (pobedniciCetvrtfinala.length >= 4) {
  // Sparivanje prvog i drugog pobednika, trećeg i četvrtog
  utakmicePolufinala.push(new Utakmica(pobedniciCetvrtfinala[0], pobedniciCetvrtfinala[1], Rezultat(pobedniciCetvrtfinala[0].FIBARanking, pobedniciCetvrtfinala[1].FIBARanking)));
  utakmicePolufinala.push(new Utakmica(pobedniciCetvrtfinala[2], pobedniciCetvrtfinala[3], Rezultat(pobedniciCetvrtfinala[2].FIBARanking, pobedniciCetvrtfinala[3].FIBARanking)));
}

// Ispisivanje rezultata polufinalnih utakmica
console.log("Polufinale:");
utakmicePolufinala.forEach((utakmica) => {
  console.log("    "+utakmica.Team1.Team+" - " +utakmica.Team2.Team + " ("+utakmica.Result1 + ": " +utakmica.Result2+")" );
});
console.log("\n");

//Trece mesto

// Odredjivanje gubitnika polufinalnih utakmica
const gubitniciPolufinala = utakmicePolufinala.map(utakmica => {
  let gubitnik;

  if (utakmica.Result1 < utakmica.Result2) {
    gubitnik = utakmica.Team1;
  } else {
    gubitnik = utakmica.Team2;
  }

  return gubitnik;
});

// Organizovanje utakmice za trece mesto
let utakmicaZaTreceMesto;
if (gubitniciPolufinala.length >= 2) {
  utakmicaZaTreceMesto = new Utakmica(gubitniciPolufinala[0], gubitniciPolufinala[1], Rezultat(gubitniciPolufinala[0].FIBARanking, gubitniciPolufinala[1].FIBARanking));
}

// Ispisivanje rezultata utakmice za treće mesto
console.log("Utakmica za treće mesto:");
console.log("    " + utakmicaZaTreceMesto.Team1.Team + " - " + utakmicaZaTreceMesto.Team2.Team + " (" + utakmicaZaTreceMesto.Result1 + ": " + utakmicaZaTreceMesto.Result2 + ")");
console.log("\n");

//Finale

// Odredjivanje pobednika polufinalnih utakmica
const pobedniciPolufinala = utakmicePolufinala.map(utakmica => {

  let pobednik;

if (utakmica.Result1 > utakmica.Result2) {
    pobednik = utakmica.Team1;
} else {
    pobednik = utakmica.Team2;
}

return pobednik;
});

// Organizovanje finalne utakmice
let finalnaUtakmica;
if (pobedniciPolufinala.length >= 2)
   {
  finalnaUtakmica = new Utakmica(pobedniciPolufinala[0], pobedniciPolufinala[1], Rezultat(pobedniciPolufinala[0].FIBARanking, pobedniciPolufinala[1].FIBARanking));
}

// Ispisivanje rezultata finalne utakmice
console.log("Finale:");
console.log("    " + finalnaUtakmica.Team1.Team + " - " + finalnaUtakmica.Team2.Team + " (" + finalnaUtakmica.Result1 + ": " + finalnaUtakmica.Result2 + ")");
console.log("\n");

// Prikazivanje medalja
console.log("\n Medalje:");

// Prikaz zlatne i srebrne medalje
if (finalnaUtakmica)
   {
  let zlatnaMedalja, srebrnaMedalja;

  if (finalnaUtakmica.Result1 > finalnaUtakmica.Result2) {
      zlatnaMedalja = finalnaUtakmica.Team1;
      srebrnaMedalja = finalnaUtakmica.Team2;
  } else {
      zlatnaMedalja = finalnaUtakmica.Team2;
      srebrnaMedalja = finalnaUtakmica.Team1;
  }
    
    console.log("    1.  " + zlatnaMedalja.Team);
    console.log("    2.  " + srebrnaMedalja.Team);
}

// Prikaz bronzane medalje
if (utakmicaZaTreceMesto) 
  {
  let bronzanaMedalja;

  if (utakmicaZaTreceMesto.Result1 > utakmicaZaTreceMesto.Result2) {
      bronzanaMedalja = utakmicaZaTreceMesto.Team1;
  } else {
      bronzanaMedalja = utakmicaZaTreceMesto.Team2;
  }
  console.log("    3.  " + bronzanaMedalja.Team);
}
console.log("\n");

}

procitajGrupe()

