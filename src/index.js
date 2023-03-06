
window.addEventListener("load", () => {

    console.log("hello from js")

    // document.getElementById("champ_poids").addEventListener("change", calculIMC); 
    // document.getElementById("champ_taille").addEventListener("change", calculIMC);
    document.getElementById("boutton_calcul").addEventListener("click", calculIMC);

    function metabolisme_basal(){

        const sexe = document.getElementById("champ_sexe").value;
        const obj = document.getElementById("champ_obj").value;

        

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

    

})


