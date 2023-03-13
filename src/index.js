
window.addEventListener("load", () => {

    console.log("hello from js")

    // document.getElementById("champ_poids").addEventListener("change", calculIMC); 
    // document.getElementById("champ_taille").addEventListener("change", calculIMC);
    document.getElementById("boutton_calcul").addEventListener("click", calculIMC);
    document.getElementById('boutton_calcul').addEventListener('click', calculMetabolismeBasal)
    window.addEventListener("click", check);

    function metabolisme_basal(){

        const sexe = document.getElementById("champ_sexe").value;
        const obj = document.getElementById("champ_objectif").value;

        

        console.log("afficher métabolisme basal")
        console.log(sexe)

        if (obj != "aucun"){
            meta_bas = 2000

            switch (obj){
                case "petite_perte" : 
                    calories = meta_bas - 200
                    break
                case "grosse_perte" :
                    calories = meta_bas - 400
                    break
                case "petit_gain" : 
                    calories = meta_bas + 200
                    break
                case "gros_gain" :
                    calories = meta_bas + 400
                    break
            }
            
            afficher_calories = "  Nombre de calories par jour pour atteindre votre objectif : "+calories
            
        }

    }

    function calculIMC(){

        const poids = document.getElementById("champ_poids").value;
        const taille = parseFloat(document.getElementById("champ_taille").value)/100;

        metabolisme_basal()

        const imc = poids/(taille*taille)

        const result = document.getElementById("mainSpan");

        result.innerHTML = imc.toString()+afficher_calories
        console.log(imc)
    
    }

    function calculMetabolismeBasal() {
        const poids = parseFloat(document.getElementById('poids_metabolisme_basal').value)
        const taille = parseFloat(document.getElementById('taille_metabolisme_basal').value)
        const age = parseFloat(document.getElementById('champ_age').value)
        const sexe = document.getElementById('sexe_metabolisme_basal').value
        const valeurDeBase = (poids**0.48) * (taille**0.50) * (age**-0.13)
        const metabolismeBasal = (sexe == 'homme' ? 1.083 : 0.963) * (poids**0.48) * (taille**0.50) * (age**-0.13)
        const metabolismeBasalEnJoules = (sexe == 'homme' ? 1.083 : 0.963) * valeurDeBase
        const metabolismeBasalEnKcal = (sexe == 'homme' ? 259 : 230) * valeurDeBase
        document.getElementById('affichage_metabolisme_basal').innerHTML = Math.round(metabolismeBasalEnJoules) + 'MJ'
    }
	const CHAMPS = ['poids', 'taille', 'sexe', 'objectif', 'age']
	function remplirChampsAvecValeursUrl() {
		console.log('remplissage automatique des champs')
		const chaineRequete = window.location.search
		const parametresUrl = new URLSearchParams(chaineRequete)
		const champs = Array.from(parametresUrl.entries())
		champs.forEach(champ => {
			const [cle, valeur] = champ
			if (CHAMPS.includes(cle))
			try {
				const aRemplir = document.getElementById(`champ_${cle}`)
				aRemplir.value = valeur
			} catch(e) {
				console.warn(`le paramètre "${cle}" n’a pas de champ correspondant`)
			}
		})
	}
    function check () {
        // (C1) INIT
        var valid = true, error = "", field = "";
      
        // (C2) POIDS
        field = document.getElementById("champ_poids");
        error = document.getElementById("errpoids");
        if (field.value != "" && !field.checkValidity()) {
          valid = false;
          field.classList.add("err");
          error.innerHTML = "Veuillez renseigner un poids entre 15 et 300 kg\r\n";
        } else {
          field.classList.remove("err");
          error.innerHTML = "";
        }
      
        // (C3) TAILLE
        field = document.getElementById("champ_taille");
        error = document.getElementById("errtaille");
        if (field.value != "" && !field.checkValidity()) {
          valid = false;
          field.classList.add("err");
          error.innerHTML = "Veuillez renseigner une taille entre  50 et 250 cm\r\n";
        } else {
          field.classList.remove("err");
          error.innerHTML = "";
        }
      
        // (C3) AGE
        field = document.getElementById("champ_age");
        error = document.getElementById("errage");
        if (field.value != "" && !field.checkValidity()) {
          valid = false;
          field.classList.add("err");
          error.innerHTML = "Veuillez renseigner un âge entre 1 et 150 ans\r\n";
        } else {
          field.classList.remove("err");
          error.innerHTML = "";
        }
        // (C4) RESULT
        return valid;
      }
	remplirChampsAvecValeursUrl()
})


