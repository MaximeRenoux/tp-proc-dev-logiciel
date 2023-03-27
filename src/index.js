
window.addEventListener("load", () => {

    document.getElementById("check_imc").checked = true
    document.getElementById("check_mbasal").checked = false

    document.getElementById("boutton_calcul").addEventListener("click", calculIMC);
    document.getElementById('boutton_calcul').addEventListener('click', calculMetabolismeBasal)
    document.getElementById('boutton_calcul').addEventListener('click', sauvegarderHistorique)

    window.addEventListener("click", check);

    document.getElementById("champ_age").disabled = true;
    document.getElementById("champ_sexe").disabled = true;
    document.getElementById("champ_objectif").disabled = true;


    document.getElementById("boutton_calcul").addEventListener("click", afficherResultat);
    document.getElementById("check_mbasal").addEventListener("click", montrerChamps);

    document.getElementById("champ_poids").addEventListener("keydown", griserSiChampVide);
    document.getElementById("champ_taille").addEventListener("keydown", griserSiChampVide);
    
    let poids, taille, sexe, age, obj

    function refreshValues(){
        poids = document.getElementById("champ_poids").value;
        taille = parseFloat(document.getElementById("champ_taille").value)/100;
        sexe = document.getElementById("champ_sexe").value;
        age = document.getElementById("champ_age").value;
        obj = document.getElementById("champ_objectif").value;
        mettreAJourAffichage()
    }

    function griserSiChampVide(e){
        const keyCode = e.key;
        refreshValues()
        if(keyCode == "Backspace" ){
            if (e.target.value.length==1) 
                griserBoutton()
        }
        else degriserBoutton()
    }
    

    function griserBoutton(){
        document.getElementById("boutton_calcul").disabled = true;
    }

    function degriserBoutton(){
        document.getElementById("boutton_calcul").disabled = false;
    }

    function verifierGriser(){
        console.log(document.getElementById("champ_poids").value)
        if(document.getElementById("champ_poids").value == "" || document.getElementById("champ_taille").value == ""){
            console.log("hello")
            griserBoutton()
        }
        else{
            document.getElementById("boutton_calcul").disabled = false;
        }
    }
        
    function sauvegarderHistorique(){
        refreshValues()
        const imc = calculIMC()
        const meta_basal_mj = calculMetabolismeBasal()
        const meta_basal_kcal = meta_basal_mj*239
        const date = new Date().toISOString()//.split('T')[0]
        const objectif = calculObj(meta_basal_mj, obj)
        const entree = {imc, meta_basal_kcal, objectif} 
        localStorage.setItem(date, JSON.stringify(entree))
        mettreAJourAffichage()
    }    

    function calculObj(meta_basal, objectif){

        let calories = 400

        switch (objectif){
            case "0":
                calories += meta_bas
                break
            case "1" : 
                calories += meta_bas - 200 
                break
            case "2" :
                calories += meta_bas - 400 
                break
            case "3" : 
                calories += meta_bas + 200
                break
            case "4" :
                calories += meta_bas + 400
                break
        }
        return calories
    }


    function metabolisme_basal(){

        if (obj != "aucun"){
            meta_bas = calculMetabolismeBasal()*239
            
            afficher_calories = "<span>  Nombre de calories par jour pour atteindre votre objectif : "+calculObj(meta_bas, obj)+"KCal</span>"
            
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
        refreshValues()
        metabolisme_basal()

        const imc = poids/(taille*taille)

        return imc.toFixed(2)
    
    }

    function afficherResultat(){
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
        refreshValues()
        const valeurDeBase = (poids**0.48) * (taille**0.50) * (age**-0.13)
        const metabolismeBasal = (sexe == 'homme' ? 1.083 : 0.963) * (poids**0.48) * (taille**0.50) * (age**-0.13)
        const metabolismeBasalEnJoules = (sexe == 'homme' ? 1.083 : 0.963) * valeurDeBase
        const metabolismeBasalEnKcal = (sexe == 'homme' ? 259 : 230) * valeurDeBase
        return Math.round(metabolismeBasalEnJoules)
    }

	const CHAMPS = ['poids', 'taille', 'sexe', 'objectif', 'age']
	function remplirChampsAvecValeursUrl() {
		const chaineRequete = window.location.search
		const parametresUrl = new URLSearchParams(chaineRequete)
		const champs = Array.from(parametresUrl.entries())
		champs.forEach(champ => {
			const [cle, valeur] = champ
			if (CHAMPS.includes(cle))
			try {
				const aRemplir = document.getElementById(`champ_${cle}`)
				switch (aRemplir.type) {
					case 'number':
						try {
							const valeurFloat = parseFloat(valeur)
							if (!valeurFloat) throw new Error(`la valeur fournie (${valeur}) pour la clé "${cle}" n’est pas un nombre`)
						} catch (e) {
							console.warn(e)
						}
						const { min, max } = aRemplir
						const valeurFloat = parseFloat(valeur)
						if (valeurFloat >= parseFloat(min) && valeurFloat <= parseFloat(max)) 
							aRemplir.value = valeur
						else
							console.warn(`la valeur de "${cle}" donnée dans l’URL (${valeur}) n’est pas compris entre ${min} et ${max}`)
						break
					case 'select-one':
						try {
							const options= [...aRemplir.options].map(option => option.value)
						if (options.includes(valeur))
							aRemplir.value = valeur
						else
							console.warn(`la valeur de "${cle}" donnée dans l’URL (${valeur}) ne fait pas partie des options disponibles : ${options.reduce((a, b) => `${a}, ${b}`)}`)
						} catch(e){console.log(e)}
						break
				}
			} catch(e) {
				console.warn(`le paramètre "${cle}" n’a pas de champ correspondant`)
			}
		})
        if (champs.length > 0){
            calculMetabolismeBasal()
            afficherResultat()
            sauvegarderHistorique()
        }
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

    function mettreAJourAffichage(){
        const affichage = document.getElementById("affichage")
        affichage.innerHTML = ""
        const nbLignes = Object.keys(localStorage).length

        Object.entries(localStorage).forEach(([date, stringValeurs], i)=>{
            
            const valeurs = JSON.parse(stringValeurs)
            const {imc, meta_basal_kcal, objectif} = valeurs
            const ligne = affichage.insertRow();
            [date, imc, meta_basal_kcal, objectif].reverse().forEach(val=>{
                const cell = ligne.insertCell(0)
                cell.className = "table_row padding5"
                const elem = document.createElement("span")
                elem.innerHTML = val
                cell.appendChild(elem)

            })
            

        })
        

        const ligne = affichage.rows


    }
    refreshValues()
	remplirChampsAvecValeursUrl()
    verifierGriser()

})


