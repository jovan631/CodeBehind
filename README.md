Klase koje su koriscene u aplikaciji su:

grupa: Pamti se groupName i reprezentacijaUgrupi, tj. niz u koji sam smestao sve reprezentacije u okviru jedne grupe pokupljene iz groups.json fajla.

reprezentacija: Pamti se ime tima, isoCode tima i Fiba ranking. Pamte se informacije o svakom timu odnosno pobede, porazi, bodovi, primljeni kosevi, dati kosevi i kos razlika. Niz rangirani se koristi u okviru funkcije dodajIrangiraj, 
koja sluzi da sortira timove po uslovima koji su dati u zadatku. Takodje imamo i niz odigraneUtakmice, u kome ce se pamtiti sve utakmice koje su odigrane izmedju reprezentacija u grupi (odigranaUtakmica je takodje klasa).

odigranaUtakmica: Pamti se rezultat odigrne utakmicec i protivnik protiv koga je neka reprezentacija igrala.

utakmica: Pamti se ime prve i druge reprezentacije kao i rezultat. Funkcija dodavanjeInformacijaOTimovima izvrsava funkcionalnost dodavanja bodova, datih koseva, primljenih koseva, kos razlike  i pobeda u zavisnosti od toga 
da li je neka reprezentacija pobedila, izgubila ili predala utakmicu. Reprezentacija je predala utakmicu ako krajnji rezultat bude 0.

zreb: Pamte se timovi D, E , F i G u okviru sesira, koji ce sluziti za zreb fazu takmicenja. 

main: Funkcija procitajGrupe() ucitava podatke iz groups.json fajla i sve grupe su stavljene u niz grupe[]; U okviru te funkcije se poziva funkcija olimpijske igre sa grupama koje smo pokupili iz json fajla. 
olimpijskeIgre() ce odrediti grupnu fazu, takodje ce pamtiti odigrane utakmice kao i same utakmice koje su odigrane, nad kojima ce se pozvati funkcija dodavanjeInformacijaOTimovima i prikazati grupne faze u 3 kola. Nakon toga se pozivaju
funkcije sorttirajNizReprezentacijaUGrupi i zreb. Funkcija Rezultat izracunava verovatnocu ishoda rezultata neke utakmice izmedju dve reprezentacije. Najvise se uzima u obzir fiba ranking. 
sortirajNizReprezentacijaUGrupi ce sortirati reprezentacije u grupi po broju bodova i ispisati ih u konzoli. Takodje ce se tu izbaciti reprezentacije iz svake grupe koje imaju najmanji broj bodova, odnosno poslednje se u grupi.
Funkcija zreb ce odraditi funkciju dodajIrangiraj i napraviti sesire za eliminacionu fazu.  U toj funkciji ce se odigrati sve utakmice od cetvrtfinala do finala, kao i utakmica za trece mesto.
Na kraju maina se poziva funkcija procitajGrupe() koja ce zapravo pokrenuti sve sto je aplikaciji napisano. 

Pokrenuti aplikaciju kucanjem u terminalu npm start. 
