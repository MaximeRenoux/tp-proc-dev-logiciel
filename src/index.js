
window.addEventListener("load", () => {

    console.log("hello from js")

    document.getElementById("champ_poids").addEventListener("change", calculIMC); 
    document.getElementById("champ_taille").addEventListener("change", calculIMC); 

    function calculIMC(){

        poids = document.getElementById("champ_poids").value;
        taille = document.getElementById("champ_taille").value;

        imc = poids/(taille^2)

        result = document.getElementById("mainSpan");

        result.innerHTML = imc
        console.log(imc)
    
    }

})


