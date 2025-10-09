document.getElementById('btn-1').addEventListener('click', () => {
    const val = "exmple text";
    fetch(`/default/custom-text/${val}`)
    console.log("muhaha");
});