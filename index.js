const divInfo = document.getElementById('lista-libros');
//array libros, save in localStorage
//instanciamos la clase
class Libro {
    constructor(titulo, autor, genero, year){
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.year = year;
    }
};

const button = document.getElementById('boton');

//evento
document.getElementById('boton').addEventListener('click',(e)=>{
    e.preventDefault();
    
    //const libros = [];
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const genero = document.getElementById('genero').value;
    const year = document.getElementById('year').value;
    const divmsj = document.querySelector('#error');

    while(divmsj.firstChild){
        divmsj.removeChild(divmsj.firstChild);
    } 
    //validar campos form 
    if (titulo == '' || autor  == ''|| genero == ''|| year == '' ) {
        texto = document.createElement('p');
        texto.classList.remove('added');
        texto.classList.add('error');
        texto.textContent = 'Campos vacios!!';
        divmsj.append(texto);
        
    }else{
        const libro = new Libro(titulo, autor, genero, year);
        //validar si existe una lista de tareas, case TRUE actualizala FALSE creala
        if (localStorage.getItem('librosArr') === null) {
            let librosArr = [];
            librosArr.push(libro);
            localStorage.setItem('librosArr', JSON.stringify(librosArr));
        } else {
            let librosArr = JSON.parse(localStorage.getItem('librosArr'));
            librosArr.push(libro);
            localStorage.setItem('librosArr',JSON.stringify(librosArr));
        }
        
        const divmsj = document.querySelector('#error');
        texto = document.createElement('p');
        texto.classList.remove('error');
        texto.classList.add('added');
        texto.textContent = 'book added';
        divmsj.append(texto);
    };

    setTimeout(()=>{
        texto.remove()
    },3000);

    let formularioReset = document.getElementById('form');
    formularioReset.reset();

    limpiarHTML ()
    pintarHtml();
});

pintarHtml();

function limpiarHTML (){
    while(divInfo.firstChild){
        divInfo.removeChild(divInfo.firstChild);
    }
};

function pintarHtml(){
    const divInfo = document.getElementById('lista-libros');
    getTierBooks = localStorage.getItem('librosArr');

    let listaBooks = JSON.parse(getTierBooks);
    
    counter = 1;
    listaBooks.map((libro)=>{
        const {titulo, autor, genero, year} = libro;
        
        const deleteButton = document.createElement('a');
        deleteButton.textContent = 'delete'
        deleteButton.classList.add('boton-delete');
        deleteButton.addEventListener('click', ()=>{
            deleteTask(`${titulo}`);
        });

        infoLibro = document.createElement('div');
        infoLibro.classList.add('list-books');
        infoLibro.textContent = ` #${counter} Libro: ${titulo} - Autor: ${autor} - Genero:${genero} - Leido en: ${year} `;
        divInfo.append(infoLibro);
        infoLibro.append(deleteButton)
        
        counter++;
      
    })

};

function deleteTask(title){
   let libros = JSON.parse(localStorage.getItem('librosArr'));
   for (let i = 0; i < libros.length; i++) {
       if(libros[i].titulo == title){
            libros.splice(i, 1)
       }
    }
    localStorage.setItem('librosArr', JSON.stringify(libros));
    limpiarHTML ()
    pintarHtml();
 };
       
/* let botonDelete = document.querySelector('.boton-delete');

    botonDelete.addEventListener('click',(e)=>{
        console.log(e.target)
    })
 */
/* function deleteBook(){
    const botonDelete = document.querySelector('.boton-delete');

    botonDelete.addEventListener('click',()=>{
        console.log('sisi')
    })
} */
        
//boton editar.
//modo oscuro y claro.



            
            
            
