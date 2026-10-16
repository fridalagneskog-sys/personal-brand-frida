// Tema-växlare (Mörkt / Ljust läge)
const temaknapp = document.querySelector("#tema");
if (temaknapp) {
    temaknapp.hidden = false;

    function bytTema() {
        document.body.classList.toggle("morkt");
        if (document.body.classList.contains("morkt")) {
            temaknapp.textContent = "Byt till ljust läge";
            localStorage.setItem("tema-preferens", "morkt");
        } else {
            temaknapp.textContent = "Byt till mörkt läge";
            localStorage.setItem("tema-preferens", "ljust");
        }
    }

    // Läs in sparat tema om det finns
    const sparatTema = localStorage.getItem("tema-preferens");
    if (sparatTema === "morkt") {
        document.body.classList.add("morkt");
        temaknapp.textContent = "Byt till ljust läge";
    }

    temaknapp.addEventListener("click", bytTema);
}

// Interaktiv dragspels-funktionalitet (Accordions)
// Tillåter ett dragspel i taget att vara öppet för en ren, redaktionell känsla
const accordions = document.querySelectorAll(".accordion-item");
accordions.forEach((acc) => {
    acc.addEventListener("toggle", () => {
        if (acc.open) {
            accordions.forEach((annanAcc) => {
                if (annanAcc !== acc && annanAcc.open) {
                    annanAcc.removeAttribute("open");
                }
            });
        }
    });
});

// Kontaktformulär: HubSpot
const kontaktForm = document.querySelector("#kontakt-formular");
const statusMeddelande = document.querySelector("#formular-status");

if (kontaktForm && statusMeddelande) {
    const hubspotScript = document.createElement("script");
    hubspotScript.src = "https://js-eu1.hsforms.net/forms/embed/v2.js";
    hubspotScript.async = true;
    hubspotScript.onload = () => {
        if (!window.hbspt?.forms) return;

        window.hbspt.forms.create({
            region: "eu1",
            portalId: "149565942",
            formId: "751cecea-0181-4efc-9491-425a7da1b3fa",
            target: "#kontakt-formular",
            onFormSubmitted: () => {
                statusMeddelande.hidden = false;
                statusMeddelande.className = "formular-status formular-status--lyckad";
                statusMeddelande.textContent = "Tack för ditt meddelande! Jag återkommer till dig så snart som möjligt.";
            }
        });
    };
    hubspotScript.onerror = () => {
        statusMeddelande.hidden = false;
        statusMeddelande.className = "formular-status";
        statusMeddelande.textContent = "Kontaktformuläret kunde inte laddas just nu. Mejla mig gärna direkt.";
    };
    document.head.appendChild(hubspotScript);
}