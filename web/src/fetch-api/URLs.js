import Config from '../config';
const urlBaseApi = (Config.urlBaseApi||"http://localhost")+":"+(Config.PORTAPI||"3001");
//const urlBaseApp = (Config.urlBaseApp||"http://localhost")+":"+(Config.PORTAPP||"3000");
const URLs={
    defaultUser:"https://ui-avatars.com/api/?background=227aee&name=Renzo+Veliz&color=FFFF",
    Usuarios:urlBaseApi+"/api/usuario",
    Filmes:urlBaseApi+"/api/filme",
    urlImages:urlBaseApi+"/images"
}

export default URLs; 