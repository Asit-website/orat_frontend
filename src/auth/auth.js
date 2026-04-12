//Is logedin

export const isLogedIn = () =>{
    let data = localStorage.getItem("data");
    
    if (data) {
        return true;
    } else {
        return false;
    }

}

//Do Login localstorage

export const doLogin = (data,next) =>{
    localStorage.setItem("data",JSON.stringify(data));
    next();
}

//Do Token Login localstorage

export const doTokenLogin = (data,next) =>{
    localStorage.setItem("token",JSON.stringify(data));
    next();
}


//Do logout

export const doLogout = (next) =>{
    localStorage.removeItem('data');
    next();
}

//get Current user
export const getCurrentUserDetails  =  ()=>{
    if(isLogedIn){
        return JSON.parse(localStorage.getItem("token"));
    }else{
        return false;
    }
}


//get Current user
export const getToken =  ()=>{


    if(isLogedIn()){
        return JSON.parse(localStorage.getItem("token")).token;
    }else{
        return null;
    }
}

//User data update
export const updateProfile = (updatedData) => {
    const profile = {
        ...JSON.parse(localStorage.getItem('data')),
        ...updatedData
    };
    localStorage.setItem('data', JSON.stringify(profile));
}

//User data show
export const getProfile = () => {
    if(isLogedIn){
        return JSON.parse(localStorage.getItem("data"));
    }else{
        return false;
    }
}


export const mailDataSave = (data,next) => {
    localStorage.setItem("mail_data",JSON.stringify(data));
    next();
}

export const mailDetails = () => {
    if(isLogedIn){
        return JSON.parse(localStorage.getItem("mail_data"));
    }else{
        return false;
    }
}


