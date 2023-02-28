function calculerIMC() {
  var poids = document.getElementById("poidsInput").value;
  var taille = document.getElementById("tailleInput").value;
  var resultatSpan = document.getElementById("resultat");

  if (poids === "" || taille === "") {
    resultatSpan.innerHTML = "Veuillez entrer votre poids et votre taille.";
  } else {
    var imc = poids / ((taille / 100) * (taille / 100));
    resultatSpan.innerHTML = imc.toFixed(2);
  }
}
