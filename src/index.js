
window.addEventListener("load", () => {

    console.log("hello from js")

    // document.getElementById("champ_poids").addEventListener("change", calculIMC); 
    // document.getElementById("champ_taille").addEventListener("change", calculIMC);
    document.getElementById("boutton_calcul").addEventListener("click", calculIMC);

    function metabolisme_basal(){

        const sexe = document.getElementById("champ_sexe").value;
        const obj = document.getElementById("champ_obj").value;

        console.log("afficher métabolisme basal")

        if (obj =! 0){
            console.log("afficher nombre de calories en fonction de l'objectif")
        }

    }

    function calculIMC(){

        const poids = document.getElementById("champ_poids").value;
        const taille = parseFloat(document.getElementById("champ_taille").value)/100;

        metabolisme_basal()

        const imc = poids/(taille*taille)

        const result = document.getElementById("mainSpan");

        result.innerHTML = imc
        console.log(imc)
    
    }

    

})


