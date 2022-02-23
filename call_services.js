/* 
 * It gets all the information about services
 */
let getTypes = async function () {
    console.log('>>>>>>>>> getting')
    const url = `https://rita.udistrital.edu.co/api/serviciosRITA/`
    let respuestaServ = await fetch(url)
    let responseServices = await respuestaServ.json();
    return responseServices;
}

var globaldata = "";

/* 
 * It writes the type of services name 
 */
function selectService(pid) {
    console.log(">>>>>>> Selecting" + pid)
    console.log(">>>>>>> Name:" + globaldata[pid].nombre)
    let element1 = "";
    /* Painting */
    if (document.getElementById("serv" + (globaldata[pid - 1].id - 1))) {
        console.log('Existing' + pid + 'serv' + (globaldata[pid - 1].id - 1))
        element1 = document.getElementById("serv" + (globaldata[pid - 1].id - 1));
    } else {
        element1 = document.getElementById("serv1");
    }
    for (let m = 0; m < 4; m++) {
        let tmpservice = document.getElementById("serv" + m);
        tmpservice.classList.remove("focus-service");
    }
    element1.classList.add("focus-service");
    document.getElementById("titulo").innerHTML = globaldata[pid - 1].nombre;
    document.getElementById("description").innerHTML = globaldata[pid - 1].descripcion;
    writeSubServices(pid - 1);
}

/* 
 * It writes all the services  
 */
function writeSubServices(idservice) {
    console.log('Subserv')
    console.log(globaldata[idservice])
    clearcontent();
    let subServContainer = document.getElementById("sect_subserv");
    let div = document.createElement("div");


    for (let z = 0; z < globaldata[idservice].servicios.length; z++) {
        console.log(">>>>>>> writting" + idservice + ' Z: ' + z)
        html_services = ''
        html_services +=
            '<div class="general-card-services">\
                <div class="info-service">\
                    <div class="logo-service">\
                        <img src="' + globaldata[idservice].servicios[z].imagen + '" alt="Logo">\
                    </div>\
                    <div class="p-service">\
                        <h4> ' + globaldata[idservice].servicios[z].nombre + ' </h4>\
                        <p>' + globaldata[idservice].servicios[z].descripcion + '</p>\
                    </div>\
                </div>'

        if (globaldata[idservice].servicios[z].enlace_servicio) {
            html_services +=
                '<div class="buttons-services">\
                <a href="' + globaldata[idservice].servicios[z].enlace_servicio + '" target="_blank">\
                    <div class="btn-link-service">\
                        Ir \
                    </div>\
                </a>\
                <a href="/soporte/upload/open.php' + globaldata[idservice].servicios[z].enlace_soporte + '" target="_blank">\
                <div class="btn-request-service">\
                    Solicitud \
                </div>\
                </a>\
                </div>\
                </div>'
        } else {
            html_services +=
            '<div class="buttons-services">\
            <a href="/soporte/upload/open.php' + globaldata[idservice].servicios[z].enlace_soporte + '" target="_blank">\
            <div class="btn-request-service">\
                Solicitud \
            </div>\
            </a>\
            </div>\
            </div>'
        }
        
        div.innerHTML += html_services
    }
    subServContainer.appendChild(div);
}

function clearcontent() {
    document.getElementById("sect_subserv").innerHTML = "";
}

/* 
 * It writes the type of services name 
 */
function appendData(data) {
    console.log('>>>>>>>>> gettidfvsdfsdfsdf')
    console.log(data)

    let mainContainer = document.getElementById("mainDiv");
    let div = document.createElement("div");
    let selectedRandomService = 1;
    if (window.localStorage.getItem('servicioescogido') > 0) {
        selectedRandomService = window.localStorage.getItem('servicioescogido');
        console.log('1Servicioescogido' + selectedRandomService)
    } else {
        selectedRandomService = 1;
        console.log('2Servicioescogido' + selectedRandomService)
    }
    //  //Math.floor(Math.random() * (4 - 1)) + 1;
    globaldata = data;
    for (let i = 0; i < (data.length); i++) {
        console.log('>.>' + data[i].id)
        if (typeof data[i].nombre === "undefined") {
            console.log('>>>>>>>>> Undefined')
        } else {
            if (data[i].id != 5) {
                div.innerHTML += '<div class="sub-menu-services-ind" id="serv' + i + '">' +
                    '<a >' + data[i].nombre + '</a>' + '</div>';
                console.log('>>>>>>>>> getting' + i + 'rand:' + selectedRandomService)

            }
            setTimeout(function () {
                document.getElementById('serv' + (data[i].id - 1)).setAttribute('onclick',
                    'selectService(' +
                    (data[i].id) + ')');
            }, 3000);
        }
    }
    info = data
    mainContainer.appendChild(div);
    selectService(selectedRandomService); // selectedRandomService
}

getTypes()
    .then(val => appendData(val))
    .then(data => console.log(data));