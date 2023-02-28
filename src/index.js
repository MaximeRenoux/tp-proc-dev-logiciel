
window.addEventListener("load", () => {

    console.log("hello from js")

    // document.getElementById("champ_poids").addEventListener("change", calculIMC); 
    // document.getElementById("champ_taille").addEventListener("change", calculIMC);
    document.getElementById("boutton_calcul").addEventListener("click", calculIMC);


    function calculIMC(){

        const poids = document.getElementById("champ_poids").value;
        const taille = parseFloat(document.getElementById("champ_taille").value)/100;

        const imc = poids/(taille*taille)

        const result = document.getElementById("mainSpan");

        result.innerHTML = imc
        console.log(imc)
    
    }

})


