const dropzone = document.getElementById("dropzone");
const archivos = document.getElementById("archivos");

dropzone.addEventListener("dragover", e => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add("esActivado");
});

dropzone.addEventListener("dragleave", e => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove("esActivado");
});

dropzone.addEventListener("drop", uploadArchivos);
archivos.addEventListener("change", uploadArchivos);

function uploadArchivos(e){
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove("esActivado");
    const FD = new FormData();
    const listado_archivos = e.target.id == "archivos" ?
        archivos.files:
        e.dataTransfer.files;

    for (let file of listado_archivos){
        FD.append("files[]", file);
    }
    fetch("upload.php", {method: "POST", body: FD}).
        then(rta => rta.json()). //es lo mismo JSON.parse (variable)
        catch(e => { console.error(e);});

    archivos.value = "";
}