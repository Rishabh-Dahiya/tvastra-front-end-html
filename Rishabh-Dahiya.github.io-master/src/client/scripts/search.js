var hosp = ["apollo","fortis","rockland","primus"];
var doctor = ["duke","rose","charlie","georgea"];
var treat = ["cardiology","cancer","dentistry","orthopedics","multiorgantransplant"];

const searchvalue = document.getElementById("find-by").value 
const searchBy = document.querySelector("#search-location")
searchBy.addEventListener("click",()=>{
    function searchvalue(){
        for(var i=0;i<hosp.length;i++){
            if (searchvalue == hosp[i]){
                window.location.href = "../views/hospital.html";
            }
        }
        for(var i=0;i<doctor.length;i++){
            if (searchvalue == doctor[i]){
                window.location.href = "../views/doctor.html";
            }
        }
        for(var i=0;i<treat.length;i++){
            if (searchvalue == treat[i]){
                window.location.href = "../views/treatment.html";
            }
        }
    }
});