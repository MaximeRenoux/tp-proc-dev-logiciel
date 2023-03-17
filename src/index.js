
window.addEventListener("load", () => {

    document.getElementById("check_imc").checked = true
    document.getElementById("check_mbasal").checked = false

    document.getElementById("boutton_calcul").addEventListener("click", calculIMC);
    document.getElementById('boutton_calcul').addEventListener('click', calculMetabolismeBasal)
    window.addEventListener("click", check);

    document.getElementById("champ_age").disabled = true;
    document.getElementById("champ_sexe").disabled = true;
    document.getElementById("champ_objectif").disabled = true;


    document.getElementById("boutton_calcul").addEventListener("click", afficherResultat);
    document.getElementById("check_mbasal").addEventListener("click", montrerChamps);
    
    function metabolisme_basal(){

        const sexe = document.getElementById("champ_sexe").value;
        const obj = document.getElementById("champ_objectif").value;

        

        console.log("afficher métabolisme basal")
        console.log(sexe)

        if (obj != "aucun"){
            meta_bas = calculMetabolismeBasal()*239

            switch (obj){
                case "0":
                    calories = 0
                case "1" : 
                    calories = meta_bas - 200
                    break
                case "2" :
                    calories = meta_bas - 400
                    break
                case "3" : 
                    calories = meta_bas + 200
                    break
                case "4" :
                    calories = meta_bas + 400
                    break
            }
            
            afficher_calories = "<span>  Nombre de calories par jour pour atteindre votre objectif : "+calories+"KCal</span>"
            
        }

    }

    function montrerChamps(){
        if (document.getElementById("check_mbasal").checked == true){
            document.getElementById("champ_age").disabled = false;
            document.getElementById("champ_sexe").disabled = false;
            document.getElementById("champ_objectif").disabled = false;

        } else {
            document.getElementById("champ_age").disabled = true;
            document.getElementById("champ_sexe").disabled = true;
            document.getElementById("champ_objectif").disabled = true;
        }
    }

    function calculIMC(){

        const poids = document.getElementById("champ_poids").value;
        const taille = parseFloat(document.getElementById("champ_taille").value)/100;

        metabolisme_basal()

        const imc = poids/(taille*taille)

        return imc
    
    }

    function afficherResultat(){
        const poids = document.getElementById("champ_poids").value;
        const taille = parseFloat(document.getElementById("champ_taille").value)/100;
        const result = document.getElementById("mainSpan");
        let html = ""
        let afffichage_imc = ''
        let affichage_meta_basal = ''
        let affichage_objectif = ''

        if (document.getElementById("check_imc").checked == true){
            imc = calculIMC()
            afffichage_imc = afffichage_imc.concat("<span>", "IMC : ", imc.toString(), "</span>")
        }

        if (document.getElementById("check_mbasal").checked == true){
            meta_basal = calculMetabolismeBasal()
            metal_basal_kcal = meta_basal*239
            affichage_meta_basal = affichage_meta_basal.concat("<span>", "Métabolisme Basal : ", metal_basal_kcal, "KCal ou ", meta_basal, "MJ", "</span>")

            if(document.getElementById("champ_objectif").value != "0"){
                affichage_objectif = affichage_objectif.concat(afficher_calories)
            }
        }

        html = html.concat(afffichage_imc, affichage_meta_basal, affichage_objectif)
        result.innerHTML = html
        
    }

    function calculMetabolismeBasal() {
        const poids = parseFloat(document.getElementById('champ_poids').value)
        const taille = parseFloat(document.getElementById('champ_taille').value)
        const age = parseFloat(document.getElementById('champ_age').value)
        const sexe = document.getElementById('champ_sexe').value
        const valeurDeBase = (poids**0.48) * (taille**0.50) * (age**-0.13)
        const metabolismeBasal = (sexe == 'homme' ? 1.083 : 0.963) * (poids**0.48) * (taille**0.50) * (age**-0.13)
        const metabolismeBasalEnJoules = (sexe == 'homme' ? 1.083 : 0.963) * valeurDeBase
        const metabolismeBasalEnKcal = (sexe == 'homme' ? 259 : 230) * valeurDeBase
        return Math.round(metabolismeBasalEnJoules)
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
        var valid_champ = true, error = "", field = "";
      
        // (C2) POIDS
        field = document.getElementById("champ_poids");
        error = document.getElementById("errpoids");
        if (field.value != "" && !field.checkValidity()) {
          valid_champ = false;
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
          valid_champ = false;
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
          valid_champ = false;
          field.classList.add("err");
          error.innerHTML = "Veuillez renseigner un âge entre 1 et 150 ans\r\n";
        } else {
          field.classList.remove("err");
          error.innerHTML = "";
        }
        // (C4) RESULT
        return valid_champ;
      }
	remplirChampsAvecValeursUrl()
})


