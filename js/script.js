    alert("JS conectado");

        let carrito =JSON.parse(localStorage.getItem("carrito")) || [];

        actualizarCarrito();

            function comprar(producto, precio){

                let item = carrito.find(p => p.nombre === producto)

                if(item){
                    item.cantidad++;
                }else{
                carrito.push({nombre: producto, precio: precio, cantidad: 1});
                }

                animarcarrito();           
                actualizarCarrito();
        }

        function buscarproductos(){

            const input = document.getElementById("buscador").value.toLowerCase();

            const productos = document.querySelectorAll(".producto");

            productos.forEach(producto => {

                const texto = producto.innerText.toLowerCase();

                if(texto.includes(input)){
                producto.style.display = "flex";
                }else{
                producto.style.display = "none";
                }

            });
        }

        function actualizarCarrito(){

            const lista=document.getElementById("lista-items");
            lista.innerHTML = "";

            let total = 0;

            carrito.forEach((item,index)=>{

                const li = document.createElement("li");

                const eliminar = document.createElement("span");
                eliminar.textContent = "❌";
                eliminar.className = "eliminar";

                eliminar.onclick = (e) => {

                    e.stopPropagation();
                    carrito.splice(index,1);
                    actualizarCarrito();
                };

                li.innerHTML =`
                ${item.nombre}
                <button onclick="cambiarCantidades(${index},-1)">➖</button>
                ${item.cantidad}
                <button onclick="cambiarCantidades(${index},1)">➕</button>
                 -$${item.precio * item.cantidad}
                 `;

                li.appendChild(eliminar);

                lista.appendChild(li);

                total += item.precio * item.cantidad;
            });

            let cantidadTotal = 0;

            carrito.forEach(item=>{
                cantidadTotal += item.cantidad;
            });

            document.getElementById("carrito-count").textContent = cantidadTotal;

            document.getElementById("total").textContent = `Total: $${total}`;

            localStorage.setItem("carrito", JSON.stringify(carrito));
            }

            function cambiarCantidades(index, cambio){

            carrito[index]. cantidad += cambio;

                if(carrito[index].cantidad <=0){
                    carrito.splice(index,1);
                }

                actualizarCarrito()
            }

            function toggleCarrito(){

                const lista = document.getElementById("lista-carrito")

                lista.style.display = (lista.style.display === "block") ? "none" : "block";
            }

            function vaciarCarrito(){

                carrito = [];

                actualizarCarrito();

            }

            function mostrarTicket(){

            let ticket = "🧾 pedido rotiseria Maná\n\n"

            let total = 0;

            carrito.forEach(item=>{
                ticket += `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}\n`;
                total += item.precio * item.cantidad;
            });

            ticket += `\nTotal: $${total}`;

            alert(ticket);

            }

            function togglemenu(){

                const menu = document.getElementById("menu-links")

                menu.style.display =
                (menu.style.display === "flex") ? "none" : "flex";
            }

            function volarAlCarrito(boton){

                const producto = boton.closest(".producto");
                const img = producto.querySelector("img");

                const carritoIcon = document.querySelector(".carrito");

                const imgRect = img.getBoundingClientRect();
                const carritoRect = carritoIcon.getBoundingClientRect();

                const volando = img.cloneNode(true);

                volando.classList.add("volando");

                volando.style.top = imgRect.top + "px";
                volando.style.left = imgRect.left + "px";

                document.body.appendChild(volando);

                setTimeout(()=>{

                    volando.style.top = carritoRect.top + "px";
                    volando.style.left = carritoRect.left + "px";
                    volando.style.width = "40px";
                    volando.style.opacity = "0.5";
                },10);

                setTimeout(()=>{
                    volando.remove();
                },800);
            
            }

            function animarcarrito(){

                const carritoIcon = document.querySelector(".carrito")

                carritoIcon.style.animation = "carritoPop 0.3s";

                setTimeout(()=>{
                    carritoIcon.style.animation = "";                    
                },300);                
            }

            function enviarWhatsApp(event){

                event.stopPropagation();

                if(carrito.length === 0){
                alert("el carrito esta vacio")
                return;
                }

                let mensaje = "Hola, quiero comprar:%0A";

                carrito.forEach(item=>{
                    mensaje += `- ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}%0A`;

                })
              

                const url = "https://wa.me/59891668549?text=" + encodeURIComponent(mensaje);
                window.open(url);

                vaciarCarrito()
                    
            }
