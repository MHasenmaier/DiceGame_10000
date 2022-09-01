/*********************************************************/
/** **************** BEGINN SPIELABLAUF *************** **/
/*********************************************************/

/* *** Würfeln - Runde beginnen *** */
function wurfeln() {
    //Runde und Wurf beginnen -> wurf++ (nur beim würfeln) und runde++ (beim würfeln und beim setzen) 
    runde++;

    if (gewurfelt_b == false) {
        wurf++;
        wurfelBereitPrufWurfeln(); //Würfel prüfen, würfeln und sortieren
        strassePruf(); //strasse_pruf_b = ? true oder false
        paschPruf(); //pasch_pruf_b = ? true oder false

        gewurfelt_b = true;
    } else {
        //stehen lassen
        gewurfelt_b = false;
    }

    //wurde bereits gewüfelt? (jetzt, ja!)
}


// Würfel prüfen, würfeln und sortieren - ohne return
function wurfelBereitPrufWurfeln() {
    console.log("");
    console.log("Aufrufkontrolle: wurfelBereitPrufWurfeln()");

    /*
    Wenn die Würfelanzeige nicht gesperrt ist, wird die entsprechende Stelle im Array auf TRUE gesetzt
    */

    if (wurfel1.value != "X") {
        pruf_array[0] = true;
    } else {
        console.log("   FEHLER: pruf_array[0] wurde nicht TRUE. wurfel1.value prüfen! Sollte leer sein.")
    }

    if (wurfel2.value != "X") {
        pruf_array[1] = true;
    } else {
        console.log("   FEHLER: pruf_array[1] wurde nicht TRUE. wurfel2.value prüfen! Sollte leer sein.")
    }

    if (wurfel3.value != "X") {
        pruf_array[2] = true;
    } else {
        console.log("   FEHLER: pruf_array[2] wurde nicht TRUE. wurfel3.value prüfen! Sollte leer sein.")
    }

    if (wurfel4.value != "X") {
        pruf_array[3] = true;
    } else {
        console.log("   FEHLER: pruf_array[3] wurde nicht TRUE. wurfel4.value prüfen! Sollte leer sein.")
    }

    if (wurfel5.value != "X") {
        pruf_array[4] = true;
    } else {
        console.log("   FEHLER: pruf_array[4] wurde nicht TRUE. wurfel5.value prüfen! Sollte leer sein.")
    }

    /*  
    for-Schleife geht durch pruf_array durch und für i = true bekommt
    wurfel_array[i] eine zufällige Zahl
    sort_array[i] wird als Clon von wurfel_array geführt
    pruf_array ist dann false, wenn der würfel nicht frei ist.
    */

    for (let i = 0; i < ANZAHL_WURFEL; i++) {
        if (pruf_array[i] == true) {
            wurfel_array[i] = randomValue();
            sort_array[i] = wurfel_array[i];
            console.log("   wurfel_array(orginal)[" + i + "] = " + wurfel_array[i]);
        } else {
            console.log("FEHLER: wurfelBereitPrufWurfeln() bei Würfelnummer: " + i + " -> array bekam KEINEN Zufallswert. pruf_array[" + i + "] prüfen.");
        }

    }

    /*
    sort_array wird sortiert
    die for-Schleife dient der Kontrollmöglichkeit in der console
    */

    sort_array.sort();

    console.log("   Funktionskontrolle: sort_array.sort()");
    for (let i = 0; i < ANZAHL_WURFEL; i++) {
        console.log("       sort_array (sortiert) " + i + ": = " + sort_array[i]);
    }

    console.log("");
    console.log("Funktionsende: wurfelBereitPrufWurfeln()");
    console.log("");
}

// Würfelzahl [1-6] generieren
function randomValue() {
    return (((Math.random() * 10).toFixed(0) % 6) + 1);
}

// Auf Pasch prüfen - true bei Pasch
function paschPruf() {

    console.log("");
    console.log("Aufrufkontrolle: function paschPruf()");

    for (let i = 0; i <= 2; i++) {
        if (sort_array[i] == sort_array[i + 2]) {
            console.log("   Funktionskontrolle: paschPruf liefert folgenden Wert: " + sort_array[i]);

            if (isNaN(sort_array[i]) == true) {
                console.log(" **  pasch_wurfel[" + i + "] ist NaN");
                console.log(" **  paschPruf() verlassen");
                console.log("");
                return false;
            }

            pasch_wurfel = sort_array[i];

            console.log("   Funktionskontrolle: pasch_wurfel = " + pasch_wurfel);

            pasch_pruf_b = true;
            console.log("   Boolean Änderung: pasch_pruf_b = TRUE");
            console.log("Funktionsende: paschPruf() mit TRUE");
            console.log("");
            return true;
        }
    }

    console.log("FEHLER: paschPruf() hat die for-Schleife unerwartet verlassen");
    console.log("");
    return false;
}

// Auf Straße prüfen - true bei Straße
function strassePruf() {
    console.log("");
    console.log("Aufrufkontrolle: function strassePruf()");
    let strasse_pruf_summe = 1; //=1, da so der Code im Folgenden einfacher zu lesen ist

    for (let i = 0; i < ANZAHL_WURFEL; i++) {
        console.log("   Funktionskontrolle: strassePruf() Schleife-Nr.: " + i);
        if ((sort_array[i] + 1) == sort_array[i + 1]) {
            //Für jede Übereinstimmung wird die Prüfsumme um 1 hochgezählt
            strasse_pruf_summe++;
            console.log("   strassePruf: " + strasse_pruf_summe);
        }
    }

    // Ist es eine Straße? Dann true
    if (strasse_pruf_summe == ANZAHL_WURFEL) {
        strasse_pruf_b = true;
        console.log("   Boolean Änderung: strasse_pruf_b = " + strasse_pruf_b + " sollte TRUE sein");
        console.log("Funktionsende: strassePruf() mit TRUE");
        console.log("");
        return true;
    }

    console.log("Funktionsende: strassePruf() mit FALSE");
    console.log("");
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