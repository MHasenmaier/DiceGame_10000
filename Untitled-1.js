/*********************************************************/
/** ******** BEGINN VARIABLEN INITIALISSIERUNG ******** **/
/*********************************************************/
/* +++ KONSTANTEN +++ */
// Anzahl der Würfel
const ANZAHL_WURFEL = 5;

/* +++ VARIABLEN +++ */
// Klickcounter
var clickcounter = 0;

// Wurde gewürfelt?
var gewurfelt_b = false;

// Rundenzähler - Variable
var runde = 0;

// Zugspieler für Zuweisung der Punkte
var spielerAmZug = 1;

// Spielernummer
var spieler_button_nr = 0;

// ID-Zuweisungen
var wurfel1 = document.getElementById('wurfel1');
var wurfel2 = document.getElementById('wurfel2');
var wurfel3 = document.getElementById('wurfel3');
var wurfel4 = document.getElementById('wurfel4');
var wurfel5 = document.getElementById('wurfel5');

var wurfel1alt = document.getElementById("wurfel1alt");
var wurfel2alt = document.getElementById("wurfel2alt");
var wurfel3alt = document.getElementById("wurfel3alt");
var wurfel4alt = document.getElementById("wurfel4alt");
var wurfel5alt = document.getElementById("wurfel5alt");

var wurfel_satz1_alt = document.getElementById("wurfel_satz1_alt");
var wurfel_satz2_alt = document.getElementById("wurfel_satz2_alt");
var wurfel_satz3_alt = document.getElementById("wurfel_satz3_alt");
var wurfel_satz4_alt = document.getElementById("wurfel_satz4_alt");
var wurfel_satz5_alt = document.getElementById("wurfel_satz5_alt");

// Punktestände der Spieler
var punkteSpielerEins = document.getElementById("punkteSpielerEins").innerHTML;
var punkteSpielerZwei = document.getElementById("punkteSpielerZwei").innerHTML;
var punkteSpielerDrei = document.getElementById("punkteSpielerDrei").innerHTML;
var punkteSpielerVier = document.getElementById("punkteSpielerVier").innerHTML;

// Aktueller Punktestand ("grüne Box")
var punkteAktuell = document.getElementById("punkteAktuell").innerHTML;

// temporäre Punkte (zum Übertrag)
var punkteTransfer = 0;

// Boolean für freie Würfel
var wurfel1_b = true;
var wurfel2_b = true;
var wurfel3_b = true;
var wurfel4_b = true;
var wurfel5_b = true;

// Boolean ob Würfel gesetzt werden können
var wurfel1_setzen_b = true;
var wurfel2_setzen_b = true;
var wurfel3_setzen_b = true;
var wurfel4_setzen_b = true;
var wurfel5_setzen_b = true;

// Variable um würfel identifizieren zu können
var wurfel_nummer_pasch = 0;

// Variable für den Wurfel, der gesetzt werden soll
var wurfel_nummer_wurfelEvent = 0;
var wurfel_nummer_einzelwurfelPruf = 0;
var wurfel_nummer_strasse = 0;

// Boolean ob Spieler Zugende erreicht hat
var spielerZugEnde_b = false;

//Array für Würfelwert auf dem Tisch (Button.value)
var wurfel_array = [0];
var pasch_array = [0]; //sortiert

//Variable für den Wert des Paschwürfels
var pasch_wurfel = 7; //7, da bei nichtgesetzte Würfel auch mit 0 im Array stehen.

//Kontrollvariable, um die Punkte für einen Pasch nur einmal zu zählen
var pasch_punkte_kontrolle = 0;

//Kontrollvariable für Würfelsetzen bei Pasch mit mehr als 3 Würfeln
var pasch_setzen_pruf = 0;

//Prüfvariablen
var pasch_pruf_b = false; //Boolean ob ein Pasch auf dem Tisch liegt
var strasse_pruf_b = false; //Boolean ob eine Straße auf dem Tisch liegt
var spielEnde_pruf_b = false; // Boolean ob das Spiel zu Ende ist

//Boolean ob der Würfel 1 oder 5 zeigt
var wurfel_default_setzen_b = false;

//Array für Punkteauswertung
var punkte_array = [0];

//Counter für Punkteübertrag
var punkte_counter = 0;

//Boolean für Punkteauswertung bei Päschen
var pasch_punkte_b = true;

// Punkte auf dem Tisch (0er Linie)
var wurfelWertAufDemTisch = 0;

// sonstige Variable
var x = 0;

// reset Funktionskontrolle
var reset_b = false;

/*********************************************************/
/** ********* ENDE VARIABLEN INITIALISSIERUNG ********* **/
/*********************************************************/


/*********************************************************/
/** **************** BEGINN SPIELABLAUF *************** **/
/*********************************************************/

/* *** Würfeln - Runde beginnen *** */
function wurfeln() {
    console.log(" --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ");
    console.log("Aufrufkontrolle: wurfeln()");
    clickcounter++; //Klicks zählen
    runde++; //Runde hochzählen

    if (spielEnde_pruf_b == true) {
        console.log("!! SPIEL IST ZU ENDE !!");
        return 0;
    }

    console.log("   Funktionskontrolle: gewurfelt_b = " + gewurfelt_b + " und sollte false sein.");

    if (gewurfelt_b == false) { // Würfeln 



        if (runde < 3) {
            document.getElementById("buttonaktion").value = "Stehen lassen";
            console.log("if (runde < 3) => wurfeln erfolgreich");
        }

        if (runde == 3) {
            document.getElementById("buttonaktion").value = "Punkte zählen";
            console.log("if (runde == 3) => wurfeln erfolgreich");
        }

        wurfelBereitPrufWurfeln();
        tischSort();
        strassePruf();
        paschPruf();
        gewurfelt_b = true;
    } else { // Stehen Lassen
        stehenLassen();
    }
    console.log("");
    console.log("Funktionsende: wurfeln() in der Runde: " + runde + " von Spieler: " + spielerAmZug);
    console.log(" --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ");
}

// Würfel prüfen und würfeln - ohne return
function wurfelBereitPrufWurfeln() {
    console.log("");
    console.log("Aufrufkontrolle: wurfelBereitPrufWurfeln()");
    for (let i = 0; i < ANZAHL_WURFEL; i++) {
        wurfel_array[i] = randomValue();
        console.log("   O wurfel_array(orginal)[" + i + "] = " + wurfel_array[i]);
        pasch_array[i] = wurfel_array[i];
        console.log("   X pasch_array [" + i + "] (Würfelnummer: " + (i + 1) + " ): = " + pasch_array[i]);
    }
    console.log("");


    if (wurfel1_b == true) {
        wurfel1.value = wurfel_array[0];
        console.log("   Funktionskontrolle: wurfelBereitPrufWurfeln() wurfel1_b = " + wurfel1_b);
    } else {
        console.log("   FEHLER: wurfelBereitPrufWurfeln() wurfel1_b = " + wurfel1_b);
    }

    if (wurfel2_b == true) {
        wurfel2.value = wurfel_array[1];
        console.log("   Funktionskontrolle: wurfelBereitPrufWurfeln() wurfel2_b = " + wurfel2_b);
    } else {
        console.log("   FEHLER: wurfelBereitPrufWurfeln() wurfel2_b = " + wurfel2_b);
    }

    if (wurfel3_b == true) {
        wurfel3.value = wurfel_array[2];
        console.log("   Funktionskontrolle: wurfelBereitPrufWurfeln() wurfel3_b = " + wurfel3_b);
    } else {
        console.log("   FEHLER: wurfelBereitPrufWurfeln() wurfel3_b = " + wurfel3_b);
    }

    if (wurfel4_b == true) {
        wurfel4.value = wurfel_array[3];
        console.log("   Funktionskontrolle: wurfelBereitPrufWurfeln() wurfel4_b = " + wurfel4_b);
    } else {
        console.log("   FEHLER: wurfelBereitPrufWurfeln() wurfel4_b = " + wurfel4_b);
    }

    if (wurfel5_b == true) {
        wurfel5.value = wurfel_array[4];
        console.log("   Funktionskontrolle: wurfelBereitPrufWurfeln() wurfel5_b = " + wurfel5_b);
    } else {
        console.log("   FEHLER: wurfelBereitPrufWurfeln() wurfel5_b = " + wurfel5_b);
    }

    console.log("Funktionsende: wurfelBereitPrufWurfeln()");
    console.log("");
}

// Tisch sortrieren - ohne return
function tischSort() {
    console.log("");
    console.log("Aufrufkontrolle: function tischSort()");

    pasch_array.sort();

    console.log("   Funktionskontrolle: function tischSort()");
    for (let i = 0; i < ANZAHL_WURFEL; i++) {
        console.log("       Pasch_Array (sortiert) " + i + ": = " + pasch_array[i]);
    }
    console.log("Funktionsende: function tischSort()");
    console.log("");
}

// Auf Pasch prüfen - true bei Pasch
function paschPruf() {

    console.log("Aufrufkontrolle: function paschPruf()");

    for (let i = 0; i <= 2; i++) {
        if (pasch_array[i] == pasch_array[i + 2]) {

            console.log("   Funktionskontrolle: paschPruf liefert folgenden Wert: " + pasch_array[i]);
            if (isNaN(pasch_array[i]) == true) {
                console.log(" **  pasch_wurfel ist NaN");
                console.log(" **  paschPruf() verlassen");
                return false;
            }
            pasch_wurfel = pasch_array[i];

            console.log("   Funktionskontrolle: pasch_wurfel == " + pasch_wurfel);
            console.log(" ### Es ist ein Pasch!");
            pasch_pruf_b = true;
            console.log("Funktionsende: paschPruf() mit TRUE");
            return true;
        }
    }

    console.log(" XX XX XX  Es ist KEIN Pasch! XX XX XX");
    console.log("Funktionsende: paschPruf() mit FALSE");
    return false;
}

// Auf Straße prüfen - true bei Straße
function strassePruf() {
    console.log("Aufrufkontrolle: function strassePruf()");
    let strasse_pruf_summe = 1;

    for (let i = 0; i < ANZAHL_WURFEL; i++) {
        console.log("   Funktionskontrolle: strassePruf() Schleife-Nr.: " + i);
        if ((pasch_array[i] + 1) == pasch_array[i + 1]) {
            //Für jede Übereinstimmung wird die Prüfsumme um 1 hochgezählt
            strasse_pruf_summe++;
            console.log("   strassePruf: " + strasse_pruf_summe);
        }
    }

    // Ist es eine Straße? Dann true
    if (strasse_pruf_summe == ANZAHL_WURFEL) {
        console.log(" ### Es ist eine Straße!");
        strasse_pruf_b = true;
        console.log("   Boolean Änderung: strasse_pruf_b = " + strasse_pruf_b + " sollte TRUE sein");
        console.log("Funktionsende: strassePruf() mit TRUE");
        return true;
    }

    console.log(" XX XX XX  Es ist KEINE Straße! XX XX XX");
    console.log("Funktionsende: strassePruf() mit FALSE");
    return false;
}

//Straße - true wenn bei strasse würfel gesetzt
function strasse(wurfel_nummer_strasse) {

    console.log("Aufrufkontrolle: function strasse(" + wurfel_nummer_strasse + ")");

    if (wurfel_nummer_strasse == 0) {
        console.log("FEHLER: strasse(" + wurfel_nummer_strasse + ") liefer FALSE, da wurfel_nummer_strasse == 0 => FEHLER in einzelwurfelPruf()");
        return false;
    }

    if (strasse_pruf_b == true) {
        wurfelSetzen(wurfel_nummer_strasse);
        console.log("   Funktionskontrolle: function strasse(" + wurfel_nummer_strasse + ") liefert den Wert: strasse_pruf_b == " + strasse_pruf_b);
        console.log("Funktionsende: strasse() mit TRUE");
        return true;
    } else {
        console.log("Funktionsende: strasse(" + strasse_pruf_b + ") mit FALSE, sollte aber TRUE sein");
        return false;
    }
}

// Pasch - true wenn bei pasch würfel gesetzt
function pasch(wurfel_nummer_pasch) {

    console.log("Aufrufkontrolle: function pasch ( Würfel-Nummer: " + wurfel_nummer_pasch + " . Pasch ist bei: " + pasch_wurfel + " )");

    if (pasch_setzen_pruf < 3) { // < 3, da max 3 Würfel im Pasch sind

        console.log("   Funktionskontrolle: pasch_array[wurfel_nummer_pasch] = " + pasch_array[((wurfel_nummer_pasch) - 1)]);

        wurfelSetzen(wurfel_nummer_pasch);
        pasch_setzen_pruf++;

        console.log("   Funktionskontrolle: Würfel-Nummer: " + wurfel_nummer_pasch + " gehört zu einem Pasch!");
        console.log("   Funktionskontrolle: Dies ist der " + pasch_setzen_pruf + ". Würfel eines Pasches.");
        console.log("Funktionsende: pasch(" + wurfel_nummer_pasch + ") mit TRUE");
        return true;
    } else {
        console.log("   Funktionskontrolle: pasch(" + wurfel_nummer_pasch + "): pasch_wurfel = " + pasch_wurfel);
        console.log("   Funktionskontrolle: pasch(" + wurfel_nummer_pasch + "): pasch_pruf_b = " + pasch_pruf_b);
        console.log("   Funktionskontrolle: pasch(" + wurfel_nummer_pasch + "): pasch_setzen_pruf = " + pasch_setzen_pruf);
        console.log("Funktionsende: pasch(" + wurfel_nummer_pasch + ") mit FALSE");
        return false;
    }
}

// Button "Stehen Lassen / Punkte zählen" -> "Würfeln" - ohne return
function stehenLassen() {

    console.log("");
    console.log("Aufrufkontrolle: function stehenLassen ()");

    wertLetzterZuVorletzter();
    wurfel_value_copy();

    gewurfelt_b = false;
    console.log("   Boolean-Änderung: gewurfelt_b => " + gewurfelt_b + " und sollte FALSE sein");

    switch (true) {

        case ((runde == 3 || anzahlGesetzerWurfel() == 5) & spielerZugEnde_b == false):
            document.getElementById("buttonaktion").value = "Punkte zählen";
            console.log("   Funktionskontrolle: Punkteauszählen runde: " + runde);
            console.log("   case ((runde == 3 || anzahlGesetzerWurfel() == 5) & spielerZugEnde_b == false) => Punktezählen erfolgreich");
            spielerZugEnde_b = true;
            document.getElementById("punkteAktuell").innerHTML = punkteAuswertung();
            punkteUbertrag(spielerAmZug);
            break;

        case (runde == 2):
            document.getElementById("buttonaktion").value = "Letzte Runde";
            console.log("   Funktionskontrolle: stehenLassen() case (runde == 2) in Runde: " + runde);
            break;

        case (runde < 2):
            document.getElementById("buttonaktion").value = "Würfeln";
            console.log("   Funktionskontrolle: stehenLassen() in Runde: " + runde);
            strasse_pruf_b = false;
            console.log("   Boolean Änderung: strasse_pruf_b = " + strasse_pruf_b + " in stehenLassen() case runde < 2");
            break;

        default:
            console.log("   FEHLER: stehenLassen() - SWITCH ist im DEFAULT gelandet. SWITCH(Runde-Nr.: " + runde + " )");
    }
}

// Würfel prüfen, ob sie frei sind und ob gewürfelt wurde -> Return = Würfelnummer (1-5), 0 bei FALSE
function einzelwurfelPruf(wurfel_nummer_einzelwurfelPruf) {

    console.log("");
    console.log("Aufrufkontrolle: function einzelwurfelPruf ( " + wurfel_nummer_einzelwurfelPruf + " )");
    console.log("   Funktionskontrolle: gewurfelt_b = " + gewurfelt_b + " sollte TRUE sein");

    if (gewurfelt_b == true) {
        console.log("   Boolean Prüfen:");
        console.log("   wurfel1_b hat den Wert: " + wurfel1_b + ".");
        console.log("   wurfel2_b hat den Wert: " + wurfel2_b + ".");
        console.log("   wurfel3_b hat den Wert: " + wurfel3_b + ".");
        console.log("   wurfel4_b hat den Wert: " + wurfel4_b + ".");
        console.log("   wurfel5_b hat den Wert: " + wurfel5_b + ".");

        switch (wurfel_nummer_einzelwurfelPruf) {
            case (1):
                console.log("   Funktionskontrolle: einzelwurfelPruf (" + wurfel_nummer_einzelwurfelPruf + ") ist im case(" + wurfel_nummer_einzelwurfelPruf + ")");
                if (wurfel1_b == true) {
                    console.log("   Funktionskontrolle: einzelwurfelPruf (" + wurfel_nummer_einzelwurfelPruf + ") ist in if (wurfel" + wurfel_nummer_einzelwurfelPruf + "_b == true)");
                    console.log("Funktionsende: einzelwurfelPruf() wird mit RETURN = " + wurfel_nummer_einzelwurfelPruf + " beendet");
                    return 1;
                }
                break;

            case (2):
                console.log("   Funktionskontrolle: einzelwurfelPruf (" + wurfel_nummer_einzelwurfelPruf + ") ist im case(" + wurfel_nummer_einzelwurfelPruf + ")");
                if (wurfel2_b == true) {
                    console.log("   Funktionskontrolle: einzelwurfelPruf (" + wurfel_nummer_einzelwurfelPruf + ") ist in if (wurfel" + wurfel_nummer_einzelwurfelPruf + "_b == true)");
                    console.log("Funktionsende: einzelwurfelPruf() wird mit RETURN = " + wurfel_nummer_einzelwurfelPruf + " beendet");
                    return 2;
                }
                break;

            case (3):
                console.log("   Funktionskontrolle: einzelwurfelPruf (" + wurfel_nummer_einzelwurfelPruf + ") ist im case(" + wurfel_nummer_einzelwurfelPruf + ")");
                if (wurfel3_b == true) {
                    console.log("   Funktionskontrolle: einzelwurfelPruf (" + wurfel_nummer_einzelwurfelPruf + ") ist in if (wurfel" + wurfel_nummer_einzelwurfelPruf + "_b == true)");
                    console.log("Funktionsende: einzelwurfelPruf() wird mit RETURN = " + wurfel_nummer_einzelwurfelPruf + " beendet");
                    return 3;
                }
                break;

            case (4):
                console.log("   Funktionskontrolle: einzelwurfelPruf (" + wurfel_nummer_einzelwurfelPruf + ") ist im case(" + wurfel_nummer_einzelwurfelPruf + ")");
                if (wurfel4_b == true) {
                    console.log("   Funktionskontrolle: einzelwurfelPruf (" + wurfel_nummer_einzelwurfelPruf + ") ist in if (wurfel" + wurfel_nummer_einzelwurfelPruf + "_b == true)");
                    console.log("Funktionsende: einzelwurfelPruf() wird mit RETURN = " + wurfel_nummer_einzelwurfelPruf + " beendet");
                    return 4;
                }
                break;

            case (5):
                console.log("   Funktionskontrolle: einzelwurfelPruf (" + wurfel_nummer_einzelwurfelPruf + ") ist im case(" + wurfel_nummer_einzelwurfelPruf + ")");
                if (wurfel5_b == true) {
                    console.log("   Funktionskontrolle: einzelwurfelPruf (" + wurfel_nummer_einzelwurfelPruf + ") ist in if (wurfel" + wurfel_nummer_einzelwurfelPruf + "_b == true)");
                    console.log("Funktionsende: einzelwurfelPruf() wird mit RETURN = " + wurfel_nummer_einzelwurfelPruf + " beendet");
                    return 5;
                }
                break;

            default:

                console.log("   FEHLER: einzelwurfelPruf (" + wurfel_nummer_einzelwurfelPruf + ") ist im DEFAULT gelandet: wurfel_nummer_einzelwurfelPruf = " + wurfel_nummer_einzelwurfelPruf + " => case (" + wurfel_nummer_einzelwurfelPruf + ") und wurfel" + wurfel_nummer_einzelwurfelPruf + "_b ist " + wurfel1_b + ", sollte TRUE sein");
                console.log("");
                console.log("   Boolean Prüfen:");
                console.log("   XX wurfel1_b hat den Wert: " + wurfel1_b + ".");
                console.log("   XX wurfel2_b hat den Wert: " + wurfel2_b + ".");
                console.log("   XX wurfel3_b hat den Wert: " + wurfel3_b + ".");
                console.log("   XX wurfel4_b hat den Wert: " + wurfel4_b + ".");
                console.log("   XX wurfel5_b hat den Wert: " + wurfel5_b + ".");
                console.log("Funktionsende: einzelwurfelPruf (" + wurfel_nummer_einzelwurfelPruf + ") wird mit RETURN = 0 beendet");
                return 0;
        }

        console.log("   FEHLER Würfel-Nummer: " + wurfel_nummer_einzelwurfelPruf + " konnte NICHT GESETZT werden!");
        console.log("   XX wurfel1_b hat den Wert: " + wurfel1_b);
        console.log("   XX wurfel2_b hat den Wert: " + wurfel2_b);
        console.log("   XX wurfel3_b hat den Wert: " + wurfel3_b);
        console.log("   XX wurfel4_b hat den Wert: " + wurfel4_b);
        console.log("   XX wurfel5_b hat den Wert: " + wurfel5_b);
    } else {
        console.log("   FEHLER: einzelwurfelPruf (" + wurfel_nummer_einzelwurfelPruf + ") ist im ELSE gelandet");
    }

    console.log("   FEHLER: gewurfelt_b ist " + gewurfelt_b + ", sollte TRUE sein => return = 0");
    console.log("Funktionsende: einzelwurfelPruf(" + wurfel_nummer_einzelwurfelPruf + ") wird mit RETURN = 0 beendet");
    return 0;
}

// Würfelwerte setzen wenn Pasch, Straße, 1 oder 5
function wurfelEvent(wurfel_nummer_wurfelEvent) {

    console.log("");
    console.log("Aufrufkontrolle: function wurfelEvent( " + wurfel_nummer_wurfelEvent + " )");
    // Sind die Würfel frei und wurde gewürfelt?
    let wurfel_event_temp = einzelwurfelPruf(wurfel_nummer_wurfelEvent);

    let wurfel_wert = wurfel_array[(wurfel_event_temp) - 1];


    if (wurfel_event_temp > 0) {
        // 1. Straße
        if (strasse_pruf_b == true) {
            if (strasse(wurfel_event_temp) == true) {
                console.log("Funktionsende: wurfelEvent(" + wurfel_nummer_wurfelEvent + ") mit strasse_pruf_b == " + strasse_pruf_b + ", sollte TRUE sein");
                return true;
            }
        } else {
            switch (true) {
                // 2. Pasch
                case (pasch_pruf_b == true && wurfel_wert == pasch_wurfel && pasch_punkte_kontrolle < 3):
                    console.log("  Funktionskontrolle: wurfelEvent(" + wurfel_nummer_wurfelEvent + ") ist im CASE (PASCH) gelandet");
                    pasch(wurfel_event_temp);
                    console.log("Funktionsende wurfelEvent(" + wurfel_nummer_wurfelEvent + ") mit TRUE");
                    pasch_punkte_kontrolle++;
                    return true;
                    // 1er und 5er
                case ((wurfel_wert == 1) || (wurfel_wert == 5)):
                    console.log("  Funktionskontrolle: wurfelEvent( Würfel-Nr.: " + wurfel_nummer_wurfelEvent + " mit dem Würfelwert: " + wurfel_wert + ") ist im CASE (1 && 5) gelandet");
                    wurfelSetzen(wurfel_event_temp);
                    console.log("Funktionsende wurfelEvent(" + wurfel_nummer_wurfelEvent + ") mit TRUE");
                    return true;
                default:
                    console.log("  FEHLER: wurfelEvent( Würfel-Nr.: " + wurfel_nummer_wurfelEvent + " mit dem Würfelwert: " + wurfel_wert + ") ist im DEFAULT gelandet");
                    console.log("Funktionsende wurfelEvent(" + wurfel_nummer_wurfelEvent + ") mit FALSE");
                    return false;
            }
        }
    } else {
        console.log("   FEHLER: wurfel_event_temp = " + wurfel_event_temp);
        console.log("Funktionsende: function wurfelEvent( " + wurfel_nummer_wurfelEvent + " ) RETURN = FALSE");
        return false;
    }
}

// Das Programm "setzt" den Würfel, bzw. markiert ihn als "gesetzt"
function wurfelSetzen(wurfel_nummer_wurfelSetzen) {
    console.log("Aufrufkontrolle: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ")");

    switch (wurfel_nummer_wurfelSetzen) {
        case (1):
            console.log("   Funktionskontrolle: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") ist in case (" + wurfel_nummer_wurfelSetzen + ")");
            if (wurfel1_setzen_b == true && wurfel1_b == true) {
                console.log("   Funktionskontrolle: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") hat wurfel" + wurfel_nummer_wurfelSetzen + "_setzen_b = true. Würfel " + wurfel_nummer_wurfelSetzen + " sollte gesetzt werden.");
                wurfel1alt.innerHTML = wurfel1.value;
                wurfel1_b = false;
                wurfel1_setzen_b = false;
                console.log("Funktionsende: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") RETURN = TRUE");
                return true;
            }

        case (2):
            console.log("   Funktionskontrolle: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") ist in case (" + wurfel_nummer_wurfelSetzen + ")");
            if (wurfel2_setzen_b == true && wurfel2_b == true) {
                console.log("   Funktionskontrolle: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") hat wurfel" + wurfel_nummer_wurfelSetzen + "_setzen_b = true. Würfel " + wurfel_nummer_wurfelSetzen + " sollte gesetzt werden.");
                wurfel2alt.innerHTML = wurfel2.value;
                wurfel2_b = false;
                wurfel2_setzen_b = false;
                console.log("Funktionsende: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") RETURN = TRUE");
                return true;
            }

        case (3):
            console.log("   Funktionskontrolle: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") ist in case (" + wurfel_nummer_wurfelSetzen + ")");
            if (wurfel3_setzen_b == true && wurfel3_b == true) {
                console.log("   Funktionskontrolle: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") hat wurfel" + wurfel_nummer_wurfelSetzen + "_setzen_b = true. Würfel " + wurfel_nummer_wurfelSetzen + " sollte gesetzt werden.");
                wurfel3alt.innerHTML = wurfel3.value;
                wurfel3_b = false;
                wurfel3_setzen_b = false;
                console.log("Funktionsende: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") RETURN = TRUE");
                return true;
            }

        case (4):
            console.log("   Funktionskontrolle: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") ist in case (" + wurfel_nummer_wurfelSetzen + ")");
            if (wurfel4_setzen_b == true && wurfel4_b == true) {
                console.log("   Funktionskontrolle: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") hat wurfel" + wurfel_nummer_wurfelSetzen + "_setzen_b = true. Würfel " + wurfel_nummer_wurfelSetzen + " sollte gesetzt werden.");
                wurfel4alt.innerHTML = wurfel4.value;
                wurfel4_b = false;
                wurfel4_setzen_b = false;
                console.log("Funktionsende: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") RETURN = TRUE");
                return true;
            }

        case (5):
            console.log("   Funktionskontrolle: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") ist in case (" + wurfel_nummer_wurfelSetzen + ")");
            if (wurfel5_setzen_b == true && wurfel5_b == true) {
                console.log("   Funktionskontrolle: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") hat wurfel" + wurfel_nummer_wurfelSetzen + "_setzen_b = true. Würfel " + wurfel_nummer_wurfelSetzen + " sollte gesetzt werden.");
                wurfel5alt.innerHTML = wurfel5.value;
                wurfel5_b = false;
                wurfel5_setzen_b = false;
                console.log("Funktionsende: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") RETURN = TRUE");
                return true;
            }

        default:
            console.log("   FEHLER: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") ist im DEFAULT gelandet");
            console.log("Funktionsende: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") RETURN = FALSE");
            return false;

    }
    console.log("   FEHLER: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") wurfel" + wurfel_nummer_wurfelSetzen + "_setzen_b = FALSE");
    console.log("Funktionsende: wurfelSetzen(" + wurfel_nummer_wurfelSetzen + ") RETURN = FALSE");
    return false;
}

// Würfelwert kopieren - von SETZEN (- Linie) auf den TISCH (0er Linie)
function wurfel_value_copy() {
    console.log("Aufrufkontrolle: function wurfel_value_copy ()");
    if (wurfel1alt.innerHTML != "-") {
        wurfel1.value = "X";
        wurfel1_setzen_b = false;
    }

    if (wurfel2alt.innerHTML != "-") {
        wurfel2.value = "X";
        wurfel2_setzen_b = false;
    }

    if (wurfel3alt.innerHTML != "-") {
        wurfel3.value = "X";
        wurfel3_setzen_b = false;
    }

    if (wurfel4alt.innerHTML != "-") {
        wurfel4.value = "X";
        wurfel4_setzen_b = false;
    }

    if (wurfel5alt.innerHTML != "-") {
        wurfel5.value = "X";
        wurfel5_setzen_b = false;
    }
    console.log("Funktionsende: function wurfel_value_copy ()");
}

// "Werte letzte Runde" werden zu "Werte vorletzte Runde"
function wertLetzterZuVorletzter() {
    console.log("Aufrufkontrolle: function wertLetzterZuVorletzter()  ");

    let tisch_array = [0]; //alle auf dem Tisch befindlichen Würfel NACH wurfelSetzen()

    for (let i = 0; i < 5; i++) {
        switch (i) {
            case (0):
                tisch_array[i] = wurfel1alt.innerHTML;
                break;
            case (1):
                tisch_array[i] = wurfel2alt.innerHTML;
                break;
            case (2):
                tisch_array[i] = wurfel3alt.innerHTML;
                break;
            case (3):
                tisch_array[i] = wurfel4alt.innerHTML;
                break;
            case (4):
                tisch_array[i] = wurfel5alt.innerHTML;
                break;
            default:
                console.log(" FEHLER: wertLetzterZuVorletzter() ist bei i = " + i + "im DEFAULT gelandet");
        }
    }

    tisch_array.sort();

    for (let i = 0; i <= 2; i++) {
        if (tisch_array[i] == tisch_array[i + 2]) {
            console.log("   Funktionskontrolle: wertLetzterZuVorletzter (sortiert): " + tisch_array[i] + " => das ist ein Pasch");
            if (isNaN(tisch_array[i]) == false && pasch_punkte_b == true) {
                pasch_punkte_kontrolle = tisch_array[i];
                pasch_punkte_b = false;
                console.log("   Boolean Änderung: pasch_punkte_b = FALSE");
            } else if (isNaN(tisch_array[i]) != false) {
                console.log("   Funktionskontrolle: tisch_array[" + i + "] ist NaN");
            }
        }
    }

    //Ergebnis Würfel 1
    if (wurfel1_b == false && wurfel1_setzen_b == false && wurfel1alt.innerHTML != "X") {
        wurfel_satz1_alt.innerHTML = wurfel1alt.innerHTML;
        wurfel1alt.innerHTML = "X";

        console.log("   Funktionskontrolle: Wert von Tischplatz '1' übertragen");
    }

    //Ergebnis Würfel 2
    if (wurfel2_b == false && wurfel2_setzen_b == false && wurfel2alt.innerHTML != "X") {
        wurfel_satz2_alt.innerHTML = wurfel2alt.innerHTML;
        wurfel2alt.innerHTML = "X";

        console.log("   Funktionskontrolle: Wert von Tischplatz '2' übertragen");
    }

    //Ergebnis Würfel 3
    if (wurfel3_b == false && wurfel3_setzen_b == false && wurfel3alt.innerHTML != "X") {
        wurfel_satz3_alt.innerHTML = wurfel3alt.innerHTML;
        wurfel3alt.innerHTML = "X";

        console.log("   Funktionskontrolle: Wert von Tischplatz '3' übertragen");
    }

    //Ergebnis Würfel 4
    if (wurfel4_b == false && wurfel4_setzen_b == false && wurfel4alt.innerHTML != "X") {
        wurfel_satz4_alt.innerHTML = wurfel4alt.innerHTML;
        wurfel4alt.innerHTML = "X";

        console.log("   Funktionskontrolle: Wert von Tischplatz '4' übertragen");
    }

    //Ergebnis Würfel 5
    if (wurfel5_b == false && wurfel5_setzen_b == false && wurfel5alt.innerHTML != "X") {
        wurfel_satz5_alt.innerHTML = wurfel5alt.innerHTML;
        wurfel5alt.innerHTML = "X";

        console.log("   Funktionskontrolle: Wert von Tischplatz '5' übertragen");
    }
}

/* *** Punktezählung *** */
function punkteAuswertung() {

    console.log("Aufrufkontrolle: function punkteAuswertung()");
    let wert = 0;
    let pasch_array_punkteAuswertung_copy = [0, 0, 0, 0, 0]; //Speichert die Punkte
    let x = 0;

    // Straße Punkte 
    if (strasse_pruf_b == true) {
        punkte_array[0] = 2000;
        punkte_array[1] = 0;
        punkte_array[2] = 0;
        punkte_array[3] = 0;
        punkte_array[4] = 0;
        return 0;
    }

    // Punkte Array "füttern" mit SatzX_alt - Werten
    for (let i = 0; i < ANZAHL_WURFEL; i++) {
        switch (i) {
            case 0:
                punkte_array[i] = wurfel_satz1_alt.innerHTML;
                pasch_array_punkteAuswertung_copy[i] = punkteWerte(punkte_array[i]);
                break;
            case 1:
                punkte_array[i] = wurfel_satz2_alt.innerHTML;
                pasch_array_punkteAuswertung_copy[i] = punkteWerte(punkte_array[i]);
                break;
            case 2:
                punkte_array[i] = wurfel_satz3_alt.innerHTML;
                pasch_array_punkteAuswertung_copy[i] = punkteWerte(punkte_array[i]);
                break;
            case 3:
                punkte_array[i] = wurfel_satz4_alt.innerHTML;
                pasch_array_punkteAuswertung_copy[i] = punkteWerte(punkte_array[i]);
                break;
            case 4:
                punkte_array[i] = wurfel_satz5_alt.innerHTML;
                pasch_array_punkteAuswertung_copy[i] = punkteWerte(punkte_array[i]);
                break;
            default:
                console.log("FEHLER: punkteAuswertung() ist im DEFAULT gelandet - FOR-Schleife prüfen!! - Punkte Array 'füttern' mit SatzX_alt - Werten");
        }
    }

    //Punkte für Päsche einteilen bzw korrigieren
    pasch_array_punkteAuswertung_copy.sort();

    if (pasch_wurfel < 7 & pasch_wurfel > 0) {
        console.log("   Funktionskontrolle punkteAuswertung(): if (pasch_wurfel < 7 & pasch_wurfel > 0) pasch_wurfel: " + pasch_wurfel);
        for (let j = 0; j < ANZAHL_WURFEL; j++) {
            if (pasch_array_punkteAuswertung_copy[j] == pasch_array_punkteAuswertung_copy[j + 4] & (isNaN(pasch_array_punkteAuswertung_copy[j + 4]) == false)) {
                return 10000;
            } else if (pasch_array_punkteAuswertung_copy[j] == pasch_array_punkteAuswertung_copy[j + 2]) {
                pasch_array_punkteAuswertung_copy[j + 1] = 0;
                pasch_array_punkteAuswertung_copy[j + 2] = 0;
                if (pasch_array_punkteAuswertung_copy[j + 3] == 1) {
                    pasch_array_punkteAuswertung_copy[j + 3] = 100;
                } else if (pasch_array_punkteAuswertung_copy[j + 3] == 5) {
                    pasch_array_punkteAuswertung_copy[j + 3] = 50;
                }
            }

            console.log("   Funktionskontrolle: pasch_array_punkteAuswertung_copy[" + j + "] = " + pasch_array_punkteAuswertung_copy);
        }
    }
    //Punktekummulierung
    for (let k = 0; k < ANZAHL_WURFEL; k++) {
        wert += pasch_array_punkteAuswertung_copy[k];
        console.log("   Funktionskontrolle: function punkteAuswertung >>Punktekummulierung<< wert = " + wert);
    }

    //"Veröffentlichung" der Punkte
    console.log("Funktionsende: function punkteAuswertung() >>'Veröffentlichung' der Punkte<< mit dem Ergebnis:" + wert);

    return wert;
}

// Anzahl der gesetzten Würfel prüfen - return Anzahl der gesetzten Würfel
function anzahlGesetzerWurfel() {
    console.log("Aufrufkontrolle: function anzahlGesetzerWurfel()");
    let anzahlWurfel = 0;

    if (wurfel_satz1_alt.innerHTML != 0) {
        anzahlWurfel++;
        console.log("   Funktionskontrolle: anzahlGesetzerWurfel() mit anzahlWurfel: " + anzahlWurfel + " bei wurfel_satz1_alt");
    }

    if (wurfel_satz2_alt.innerHTML != 0) {
        anzahlWurfel++;
        console.log("   Funktionskontrolle: anzahlGesetzerWurfel() mit anzahlWurfel: " + anzahlWurfel + " bei wurfel_satz2_alt");
    }

    if (wurfel_satz3_alt.innerHTML != 0) {
        anzahlWurfel++;
        console.log("   Funktionskontrolle: anzahlGesetzerWurfel() mit anzahlWurfel: " + anzahlWurfel + " bei wurfel_satz3_alt");
    }

    if (wurfel_satz4_alt.innerHTML != 0) {
        anzahlWurfel++;
        console.log("   Funktionskontrolle: anzahlGesetzerWurfel() mit anzahlWurfel: " + anzahlWurfel + " bei wurfel_satz4_alt");
    }

    if (wurfel_satz5_alt.innerHTML != 0) {
        anzahlWurfel++;
        console.log("   Funktionskontrolle: anzahlGesetzerWurfel() mit anzahlWurfel: " + anzahlWurfel + " bei wurfel_satz5_alt");
    }

    console.log("Funktionsende: anzahlGesetzerWurfel() mit RETURN = anzahlWurfel: " + anzahlWurfel);
    return anzahlWurfel;
}

// Würfelzahl [1-6] generieren
function randomValue() {
    return (((Math.random() * 10).toFixed(0) % 6) + 1);
}

// Punkte pro Würfel - return = Punkte für den Würfel
function punkteWerte(wurfelWertAufDemTisch) {
    console.log("Aufrufkontrolle: punkteWerte(" + wurfelWertAufDemTisch + ")");
    if (wurfelWertAufDemTisch == pasch_wurfel & wurfelWertAufDemTisch != 1) {
        console.log("   Funktionskontrolle: (Pasch [2-6]) return = " + (pasch_wurfel * 100));
        console.log("Funktionsende:  punkteWerte(" + wurfelWertAufDemTisch + ")");
        return (pasch_wurfel * 100);
    } else if (pasch_wurfel == (1 & wurfelWertAufDemTisch)) {
        console.log("   Funktionskontrolle: (Pasch [1] return = 1000");
        console.log("Funktionsende:  punkteWerte(" + wurfelWertAufDemTisch + ")");
        return 1000;
    } else if (wurfelWertAufDemTisch != pasch_wurfel && wurfelWertAufDemTisch == 1) {
        console.log("   Funktionskontrolle: Einzelner Würfel [1] return = 100 Punkte");
        console.log("Funktionsende:  punkteWerte(" + wurfelWertAufDemTisch + ")");
        return 100;
    } else if (wurfelWertAufDemTisch != pasch_wurfel && wurfelWertAufDemTisch == 5) {
        console.log("   Funktionskontrolle: Einzelner Würfel [5] return = 50 Punkte");
        console.log("Funktionsende:  punkteWerte(" + wurfelWertAufDemTisch + ")");
        return 50;
    } else {
        console.log("   FEHLER: punkteWerte(" + wurfelWertAufDemTisch + ") ist im DEFAULT (letzten ELSE) gelandet");
        console.log("Funktionsende:  punkteWerte(" + wurfelWertAufDemTisch + ")");
        return 0;
    }
}

// Punkte vom Tisch, dem Zugspieler zuweisen - ohne return
function punkteUbertrag(spielerAmZug) {
    console.log("Aufrufkontrolle: function punkteUbertrag(spielerAmZug [" + spielerAmZug + "])");

    punkte_counter++;

    console.log("   Funktionskontrolle: " + punkte_counter + ". Aufruf der Funktion punkteUbertrag(" + spielerAmZug + ")");

    if (spielerZugEnde_b == true & punkte_counter == 1) {
        punkteSpielerEins = document.getElementById("punkteSpielerEins").innerHTML;
        punkteSpielerZwei = document.getElementById("punkteSpielerZwei").innerHTML;
        punkteSpielerDrei = document.getElementById("punkteSpielerDrei").innerHTML;
        punkteSpielerVier = document.getElementById("punkteSpielerVier").innerHTML;
        punkteAktuell = document.getElementById("punkteAktuell").innerHTML;
        console.log("   Punkte Aktuell: " + punkteAktuell);

        switch (spielerAmZug) {
            case (1):
                punkteTransfer = punkteAddieren(punkteSpielerEins, punkteAktuell);
                console.log("    ++ Spieler 1: " + punkteAktuell + " Punkte übertragen.");
                document.getElementById("punkteSpielerEins").innerHTML = punkteTransfer;
                console.log("   Aktuelle Punkte Spieler 1: " + punkteTransfer);
                break;

            case (2):
                punkteTransfer = punkteAddieren(punkteSpielerZwei, punkteAktuell);
                console.log("    ++ Spieler 2: " + punkteAktuell + " Punkte übertragen.");
                document.getElementById("punkteSpielerZwei").innerHTML = punkteTransfer;
                console.log("   Aktuelle Punkte Spieler 2: " + punkteTransfer);
                break;

            case (3):
                punkteTransfer = punkteAddieren(punkteSpielerDrei, punkteAktuell);
                console.log("    ++ Spieler 3: " + punkteAktuell + " Punkte übertragen.");
                document.getElementById("punkteSpielerDrei").innerHTML = punkteTransfer;
                console.log("   Aktuelle Punkte Spieler 3: " + punkteTransfer);
                break;

            case (4):
                punkteTransfer = punkteAddieren(punkteSpielerVier, punkteAktuell);
                console.log("    ++ Spieler 4: " + punkteAktuell + " Punkte übertragen.");
                document.getElementById("punkteSpielerVier").innerHTML = punkteTransfer;
                console.log("   Aktuelle Punkte Spieler 4: " + punkteTransfer);
                break;
        }

        spielerZugEnde_b = false;
        console.log("Funktionsende: function punkteUbertrag(spielerAmZug [" + spielerAmZug + "])");
    }
    console.log("Funktionsende: punkteUbertrag(spielerAmZug [" + spielerAmZug + "]) mit punkte_counter = " + punkte_counter);
}

// Punkte des Spielers aktuallisieren - return sind die aktualisierten Punkte des Spielers
function punkteAddieren(standAlt, punkteAktuell) {
    console.log("");
    console.log("Aufrufkontrolle: punkteAddieren(standAlt[" + standAlt + "], punkteAktuell[" + punkteAktuell + "])");

    let punkteTemp = 0;

    punkteTemp = +standAlt + +punkteAktuell;

    console.log("   Funktionskontrolle: Punkte = " + punkteTemp);
    console.log("Funktionsende: punkteAddieren(standAlt[" + standAlt + "], punkteAktuell[" + punkteAktuell + "])");
    return punkteTemp;
}

// Spielerwechsel mit Reset - ohne return
function spielerWechsel(spieler_button_nr) {
    console.log("Aufrufkontrolle: spielerWechsel(" + spieler_button_nr + ")");
    reset();
    if (reset_b == true) {
        console.log("   Funktionskontrolle: reset() erfolgreich");
    } else {
        console.log("   FEHLER: reset() nicht aufgerufen");
    }
    reset_b = false;
    console.log("   Boolean-Änderung: reset_b = " + reset_b);
    spielerAmZug = spieler_button_nr;
    console.log("   Funktionskontrolle: Spielerwechsel zu Spieler: " + spielerAmZug);
    console.log("Funktionsende: spielerWechsel(" + spieler_button_nr + ")");
}

/* *** Reset-Funktion um alles zurück zu setzen - bis auf die Punkte der Spieler *** */
function reset() {

    console.log("");
    console.log("Aufrufkontrolle: reset()");
    // Klickcounter
    clickcounter = 0;

    if (clickcounter == 0) {
        console.log("   Funktionskontrolle: clickcounter = 0");
    } else {
        console.log("   FEHLER bei clickcounter");
    }

    // Wurde gewürfelt?
    gewurfelt_b = false;

    if (gewurfelt_b == false) {
        console.log("   Funktionskontrolle: gewurfelt_b = false");
    } else {
        console.log("  FEHLER bei gewurfelt_b");
    }

    // Zugspieler für Zuweisung der Punkte
    spielerAmZug = 1;

    if (spielerAmZug == 1) {
        console.log("   Funktionskontrolle: spielerAmZug = 1");
    } else {
        console.log("  FEHLER bei spielerAmZug");
    }

    // Spielernummer
    spieler_button_nr = 0;

    if (spieler_button_nr == 0) {
        console.log("   Funktionskontrolle: spieler_button_nr = 0");
    } else {
        console.log("   FEHLER bei spieler_button_nr");
    }

    // Würfel "leeren"
    document.getElementById('wurfel1').value = "";
    document.getElementById('wurfel2').value = "";
    document.getElementById('wurfel3').value = "";
    document.getElementById('wurfel4').value = "";
    document.getElementById('wurfel5').value = "";

    // temporäre Punkte (zum Übertrag)
    punkteTransfer = 0;

    if (punkteTransfer == 0) {
        console.log("   Funktionskontrolle: punkteTransfer = 0");
    } else {
        console.log("   FEHLER bei punkteTransfer");
    }

    // Boolean für freie Würfel
    wurfel1_b = true;

    if (wurfel1_b == true) {
        console.log("   Funktionskontrolle: wurfel1_b = true");
    } else {
        console.log("   FEHLER bei wurfel1_b");
    }

    wurfel2_b = true;

    if (wurfel2_b == true) {
        console.log("   Funktionskontrolle: wurfel2_b = true");
    } else {
        console.log("   FEHLER bei wurfel2_b");
    }

    wurfel3_b = true;

    if (wurfel3_b == true) {
        console.log("   Funktionskontrolle: wurfel3_b = true");
    } else {
        console.log("   FEHLER bei wurfel3_b");
    }

    wurfel4_b = true;

    if (wurfel4_b == true) {
        console.log("   Funktionskontrolle: wurfel4_b = true");
    } else {
        console.log("   FEHLER bei wurfel4_b");
    }

    wurfel5_b = true;

    if (wurfel5_b == true) {
        console.log("   Funktionskontrolle: wurfel5_b = true");
    } else {
        console.log("   FEHLER bei wurfel5_b");
    }

    // Boolean ob Würfel gesetzt werden können
    wurfel1_setzen_b = true;

    if (wurfel1_setzen_b == true) {
        console.log("   Funktionskontrolle: wurfel1_setzen_b = true");
    } else {
        console.log("   FEHLER bei wurfel1_setzen_b");
    }

    wurfel2_setzen_b = true;

    if (wurfel2_setzen_b == true) {
        console.log("   Funktionskontrolle: wurfel2_setzen_b = true");
    } else {
        console.log("   FEHLER bei wurfel2_setzen_b");
    }

    wurfel3_setzen_b = true;

    if (wurfel3_setzen_b == true) {
        console.log("   Funktionskontrolle: wurfel3_setzen_b = true");
    } else {
        console.log("   FEHLER bei wurfel3_setzen_b");
    }

    wurfel4_setzen_b = true;

    if (wurfel4_setzen_b == true) {
        console.log("   Funktionskontrolle: wurfel4_setzen_b = true");
    } else {
        console.log("   FEHLER bei wurfel4_setzen_b");
    }

    wurfel5_setzen_b = true;

    if (wurfel5_setzen_b == true) {
        console.log("   Funktionskontrolle: wurfel5_setzen_b = true");
    } else {
        console.log("   FEHLER bei wurfel5_setzen_b");
    }

    // Variable um Paschwürfel identifizieren zu können
    wurfel_nummer_pasch = 0;

    if (wurfel_nummer_pasch == 0) {
        console.log("   Funktionskontrolle: wurfel_nummer_pasch = 0");
    } else {
        console.log("   FEHLER bei wurfel_nummer_pasch");
    }

    // Variable um den Würfel setzen zu können
    wurfel_nummer_wurfelEvent = 0;

    if (wurfel_nummer_wurfelEvent == 0) {
        console.log("   Funktionskontrolle: wurfel_nummer_wurfelEvent = 0");
    } else {
        console.log("   FEHLER bei wurfel_nummer_wurfelEvent");
    }

    // Variable
    wurfel_nummer_einzelwurfelPruf = 0;

    if (wurfel_nummer_einzelwurfelPruf == 0) {
        console.log("   Funktionskontrolle: wurfel_nummer_einzelwurfelPruf = 0");
    } else {
        console.log("   FEHLER bei wurfel_nummer_einzelwurfelPruf");
    }

    // Boolean ob Spieler Zugende erreicht hat
    spielerZugEnde_b = false;

    if (spielerZugEnde_b == false) {
        console.log("   Funktionskontrolle: spielerZugEnde_b = false");
    } else {
        console.log("   FEHLER bei spielerZugEnde_b");
    }

    //Array für Würfelwert auf dem Tisch (Button.value)
    wurfel_array = [0, 0, 0, 0, 0];

    for (let i = 0; i < 5; i++) {
        console.log("   Funktionskontrolle: wurfel_array[" + i + "] = " + wurfel_array[i]);
    }

    pasch_array = [0, 0, 0, 0, 0]; //sortiert

    for (let i = 0; i < 5; i++) {
        console.log("   Funktionskontrolle: pasch_array[" + i + "] = " + pasch_array[i]);
    }

    //Variable für den Wert des Paschwürfels
    pasch_wurfel = 7;

    if (pasch_wurfel == 7) {
        console.log("   Funktionskontrolle: pasch_wurfel = 7");
    } else {
        console.log("   FEHLER bei pasch_wurfel (" + pasch_wurfel + ")");
    }

    //Kontrollvariable für das Setzen bei Päschen mit 3+ Würfeln
    pasch_setzen_pruf = 0;

    if (pasch_setzen_pruf == 0) {
        console.log("   Funktionskontrolle: pasch_setzen_pruf = 0");
    } else {
        console.log("   FEHLER bei pasch_setzen_pruf (" + pasch_setzen_pruf + ")");
    }


    //Boolean ob ein Pasch auf dem Tisch liegt
    pasch_pruf_b = false;

    if (pasch_pruf_b == false) {
        console.log("   Funktionskontrolle: pasch_pruf_b = false");
    } else {
        console.log("   FEHLER bei pasch_pruf_b (" + pasch_pruf_b + ")");
    }

    //Boolean ob eine Straße auf dem Tisch liegt
    strasse_pruf_b = false;

    if (strasse_pruf_b == false) {
        console.log("   Funktionskontrolle: strasse_pruf_b");
    } else {
        console.log("   FEHLER bei strasse_pruf_b (" + strasse_pruf_b + ")");
    }

    //Boolean ob das Spiel beendet ist
    spielEnde_pruf_b = false;

    if (spielEnde_pruf_b == false) {
        console.log("   Funktionskontrolle: spielEnde_pruf_b (" + spielEnde_pruf_b + ")");
    } else {
        console.log("   FEHLER bei spielEnde_pruf_b (" + spielEnde_pruf_b + ")");
    }

    //Boolean ob der Würfel 1 oder 5 zeigt
    wurfel_default_setzen_b = false;

    if (wurfel_default_setzen_b == false) {
        console.log("   Funktionskontrolle: wurfel_default_setzen_b = false");
    } else {
        console.log("   FEHLER bei wurfel_default_setzen_b (" + wurfel_default_setzen_b + ")");
    }

    //Boolean ob ein Pasch gezählt wird
    pasch_punkte_b = true;

    if (pasch_punkte_b == true) {
        console.log("   Funktionskontrolle: pasch_punkte_b = true");
    } else {
        console.log("   FEHLER bei pasch_punkte_b (" + pasch_punkte_b + ")");
    }

    //Punkte für einen Pasch
    pasch_punkte_kontrolle = 0;

    if (pasch_punkte_kontrolle == 0) {
        console.log("   Funktionskontrolle: kontrollepasch_punkte_kontrolle  = 0");
    } else {
        console.log("   FEHLER bei kontrollepasch_punkte_kontrolle  (" + kontrollepasch_punkte_kontrolle + ")");
    }

    //Array für Punkteauswertung
    punkte_array = [0, 0, 0, 0, 0];

    for (let i = 0; i < 5; i++) {
        console.log("   Funktionskontrolle: punkte_array[" + i + "] = " + punkte_array[i]);
    }

    //Counter für Punkteübertrag
    punkte_counter = 0;

    if (punkte_counter == 0) {
        console.log("   Funktionskontrolle: punkte_counter = 0");
    } else {
        console.log("   FEHLER bei punkte_counter (" + punkte_counter + ")");
    }


    //Punkte auf dem Tisch
    wurfelWertAufDemTisch = 0;

    if (wurfelWertAufDemTisch == 0) {
        console.log("   Funktionskontrolle: wurfelWertAufDemTisch = 0");
    } else {
        console.log("   FEHLER bei wurfelWertAufDemTisch (" + wurfelWertAufDemTisch + ")");
    }

    // sonstige Variable
    x = 0;

    //Grüne Box leeren und Zwischenspeicher löschen
    var punkteAktuell = 0;
    document.getElementById("punkteAktuell").innerHTML = "";

    wurfel1alt.innerHTML = "-";
    wurfel2alt.innerHTML = "-";
    wurfel3alt.innerHTML = "-";
    wurfel4alt.innerHTML = "-";
    wurfel5alt.innerHTML = "-";

    wurfel_satz1_alt.innerHTML = "0";
    wurfel_satz2_alt.innerHTML = "0";
    wurfel_satz3_alt.innerHTML = "0";
    wurfel_satz4_alt.innerHTML = "0";
    wurfel_satz5_alt.innerHTML = "0";

    runde = 0;
    console.log(" ");
    console.log("- - - - - - - - - - - - - - - - - -");
    console.log("Runde: " + runde);
    document.getElementById("buttonaktion").value = "Würfeln";
    console.log("- - - - - - - - - - - - - - - - - -");
    console.log(" ");
    reset_b = true;
    console.log("   Boolean-Änderung: reset_b = " + reset_b);
    console.log("Funktionsende: reset()");
}

//Konsolenausgaben aufräumen - bislang ohne Funktion
function consoleClear() {
    console.log("Aufrufkontrolle: consoleClear()");
    console.clear(); //ohne Funktion - evtl in dieser "IDE" nicht möglich
    console.log("Funktionsende: consoleClear() - Konsole sollte nun leer sein");
}

//spielEnde - true, wenn Gewinner gefunden wurde
function spielEnde() {
    punkteSpielerEins = document.getElementById("punkteSpielerEins").innerHTML;
    punkteSpielerZwei = document.getElementById("punkteSpielerZwei").innerHTML;
    punkteSpielerDrei = document.getElementById("punkteSpielerDrei").innerHTML;
    punkteSpielerVier = document.getElementById("punkteSpielerVier").innerHTML;

    if ((punkteSpielerEins || punkteSpielerZwei || punkteSpielerDrei || punkteSpielerVier) >= 10000) {
        document.getElementById("buttonaktion").value = "Spielende";
        console.log("SPIELENDE:");
        console.log("   punkteSpielerEins: " + punkteSpielerEins);
        console.log("   punkteSpielerZwei: " + punkteSpielerZwei);
        console.log("   punkteSpielerDrei: " + punkteSpielerDrei);
        console.log("   punkteSpielerVier: " + punkteSpielerVier);
        spielEnde_pruf_b = true;
        return true;
    }

    return false;
}

/*********************************************************/
/** ***************** ENDE SPIELABLAUF **************** **/
/*********************************************************/

/* *** Spielanleitung ein-/ausblenden *** */
function anleitung_Aktion() {
    if (document.getElementById('spielanleitung').style.display == "flex") {
        document.getElementById('spielanleitung').style.display = "none";
        document.getElementById('history').style.display = "none";
        document.getElementById('spielfeld').style.display = "grid";
        console.log("Spielanleitung wird nicht angezeigt");
    } else {
        document.getElementById('spielanleitung').style.display = "flex";
        document.getElementById('spielfeld').style.display = "none";
        document.getElementById('history').style.display = "none";
        console.log("Spielanleitung wird angezeigt");
    }
}

/* *** History/Update ein-/ausblenden *** */
function history() {
    if (document.getElementById('history').style.display == "flex") {
        document.getElementById('history').style.display = "none";
        document.getElementById('spielfeld').style.display = "grid";
        document.getElementById('spielanleitung').style.display = "none";
        console.log("History wird nicht angezeigt");
    } else {
        document.getElementById('history').style.display = "flex";
        document.getElementById('spielfeld').style.display = "none";
        document.getElementById('spielanleitung').style.display = "none";
        console.log("History wird angezeigt");
    }
}