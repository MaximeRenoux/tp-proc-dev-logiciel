
window.addEventListener("load", () => {

    console.log("hello from js")

    // document.getElementById("champ_poids").addEventListener("change", calculIMC); 
    // document.getElementById("champ_taille").addEventListener("change", calculIMC);
    document.getElementById("boutton_calcul").addEventListener("click", calculIMC);
    document.getElementById('bouton_calcul_metabolisme_basal').addEventListener('click', calculMetabolismeBasal)


    function calculIMC(){

        const poids = document.getElementById("champ_poids").value;
        const taille = parseFloat(document.getElementById("champ_taille").value)/100;

        const imc = poids/(taille*taille)

        const result = document.getElementById("mainSpan");

        result.innerHTML = imc
        console.log(imc)
    
    }

    function calculMetabolismeBasal() {
        const poids = parseFloat(document.getElementById('poids_metabolisme_basal').value)
        const taille = parseFloat(document.getElementById('taille_metabolisme_basal').value)
        const age = parseFloat(document.getElementById('age_metabolisme_basal').value)
        const sexe = document.getElementById('sexe_metabolisme_basal').value
        const valeurDeBase = (poids**0.48) * (taille**0.50) * (age**-0.13)
        const metabolismeBasal = (sexe == 'homme' ? 1.083 : 0.963) * (poids**0.48) * (taille**0.50) * (age**-0.13)
        const metabolismeBasalEnJoules = (sexe == 'homme' ? 1.083 : 0.963) * valeurDeBase
        const metabolismeBasalEnKcal = (sexe == 'homme' ? 259 : 230) * valeurDeBase
        document.getElementById('affichage_metabolisme_basal').innerHTML = Math.round(metabolismeBasalEnJoules) + 'MJ'
    }

})


