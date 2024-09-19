//Variables
const formulario = document.querySelector("#formulario");
const currentList = document.querySelector("#current-list"); 
let products = []; 


//Event Listeners
eventListeners();

function eventListeners(){
    //Cuando el usuario agrega un nuevo producto
    formulario.addEventListener("submit", addProduct);

    //Cuando el usuario pasa los 25 caracteres
    formulario.addEventListener('keypress', maxChars)

    //Cuando el documento se carga
    document.addEventListener("DOMContentLoaded", ()=>{

        //Parsea los objetos en JSON de localStorage, si no hay nada, asignalo como array vacío
        //La instrucción || [], es necesaria ya que si no la function insertHTML() no funcionaría debido a que 
        //contiene un .forEach que es un ARRAY method y no funciona con nulls 
        products = JSON.parse(localStorage.getItem("products")) || [];

        console.log(products); 

        insertHTML(); 
    });
}




//Functions

function addProduct(e){
    e.preventDefault();
    
    //Textarea
    const product = document.querySelector("#product").value;

    //Validación
    if (product.trim() === ""){
        showError("Empty product");
    }else{
        //Añadir producto si pasa la validación 
        //Se requiere añadir como objeto para poder usar la id Date.now()
        const productObj = {
            id: Date.now(),
            product             // IDEM product: product
        }

        products = [...products, productObj];


        //Se inserta HTML
        insertHTML();

        //Reiniciar form
        formulario.reset(); 
    }

    console.log(products); 
    
}


function showError(message){
    const error = document.createElement("P");
    error.textContent = message; 
    error.classList.add("error");

    //Insertarlo
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(error); 


    //Eliminando alerta tras 1.5s
    setTimeout(() => {
        error.remove(); 
    }, 1500);
}


function insertHTML(){

    htmlClanner();

    if (products.length > 0){
        products.forEach(product =>{

            //Agregar botón de delete 
            const deleteBtn = document.createElement("A");
            deleteBtn.classList.add("borrar-prod"); 
            deleteBtn.textContent = "X"; 

            //Añadir funcionalidad de eliminar
            deleteBtn.addEventListener("click", ()=>{
                deleteProd(product.id);
            });

            //Crear HTML
            const li = document.createElement("LI");

            //Añadir texto + El texto se añade a la current list con la primera letra en Mayúsucla y las siguientes en minúsucla
            const productFormat = product.product.toLowerCase();
            li.textContent = productFormat.charAt(0).toUpperCase() + productFormat.slice(1);

            //Asignar btn a cada li
            li.appendChild(deleteBtn); 

            //insertar HTML
            currentList.appendChild(li); 
        });
    }

    sincroStorage(); 
}

//Agregar productos en localStorage
function sincroStorage(){
    localStorage.setItem("products", JSON.stringify(products)); 
}


//Eliminar producto
function deleteProd(id){
    products = products.filter(product => product.id !== id);

    insertHTML(); 
}


//Limpiar HTML
function htmlClanner(){
    //Utilizamos la ya clásica manera superperformance
    while(currentList.firstChild){
        currentList.removeChild(currentList.firstChild); 
    }
};

function maxChars() {
    const product = document.querySelector("#product").value;
    if (product.length >= 25) {
        showError('Límite de caracteres alcanzado');
    };
};