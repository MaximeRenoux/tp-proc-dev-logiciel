
window.addEventListener("load", () => {

    console.log("hello from js")

    // document.getElementById("champ_poids").addEventListener("change", calculIMC); 
    // document.getElementById("champ_taille").addEventListener("change", calculIMC);
    document.getElementById("boutton_calcul").addEventListener("click", calculIMC);


    function calculIMC(){
        //jenny
        //const monPoids = document.querySelector('var_poids').value;
        const poids = document.getElementById('champ_poids').value;
        //const maTaille = parseFloat(document.getElementById('var_taille').value)/100;
        const taille = document.getElementById('champ_taille').value/100;
        const imc = poids/(taille*taille);
        const result = document.getElementById("mainSpan");
        result.innerHTML = imc;
        console.log(imc.toPrecision(3));

        // Quita la validación mientras escribes
        //poids.addEventListener('champ_poids', () => {
        // Quita el mensaje según escribes
        //poids.setCustomValidity('');
        // Comprueba si debe validarlo
        //poids.checkValidity();
        //});

        // Muestra el mensaje de validación
        //poids.addEventListener('invalid', () => {
        //poids.setCustomValidity('No es un número');
        //});
        //jenny

        //const poids = document.getElementById("champ_poids").value;
        //const taille = parseFloat(document.getElementById("champ_taille").value)/100;
        //const imc = poids/(taille*taille)
        //const result = document.getElementById("mainSpan");
        //result.innerHTML = imc
        //console.log(imc)

    }

})

