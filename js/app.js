//variables
const fomrulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//event listeners
eventListeners();
function eventListeners(){
    //cunado se agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);
    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
    });
};


//functiones
function agregarTweet(e){
    e.preventDefault();
    //text area
    const tweet = document.querySelector('#tweet').value;
    console.log(tweet)
    //validacion
    if(tweet === ''){
        mostrarError('mensaje no puede ir vacio');
        return;//evita que se ejecutne mas lineas de codigo
    };

    const tweetObj =  {
        id: Date.now(),
        tweet: tweet// en js moderno si dos valores son iguales peudes dejar solo uno:'tweet'
    };
    //añadir al array de tweets
    tweets = [...tweets, tweetObj];
    //AñaDIR EÑ ARRAY A TWEETS
    crearHTML();
    //reiniciar el formulario
    formulario.reset();
};

//monstrar mensaje de error

function mostrarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    //insertar en html
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
//eliminar la alerta depsues de 3 segundos
    setTimeout(()=>{
        mensajeError.remove();
    }, 3000);
};

//muestra lista de tweets
function crearHTML(){
    limpiarHTML();
    //limpiar html antes de ejcutar le resto dle codigo
if(tweets.length>=0){
    tweets.forEach(tweet =>{
        //agregar un boton de eliminar
        const btnEliminar = document.createElement('A');
        btnEliminar.classList.add('borrar-tweet');
        btnEliminar.innerText = 'X';
        //añadir la funcion de eliminar
        btnEliminar.onclick = ()=>{
            borrarTweet(tweet.id);
        };
        const li = document.createElement('LI');
        li.textContent = tweet.tweet
        //agregarlo en html
        li.appendChild(btnEliminar);
        listaTweets.appendChild(li);
    });
}
    sincronizarStorage();
};

//agregar los tweets actuales al localstorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
};

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
};

//limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    };
};