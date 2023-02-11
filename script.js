let selectBox = document.querySelector(".select"),
    chooseImg = document.querySelector("#choose-img"),
    info = selectBox.querySelector(".info"),
    infoIcon = selectBox.querySelector(".icon"),
    result = document.querySelector(".result"),
    dataText = result.querySelector(".data"),
    image = result.querySelector(".img img"),
    btnAgain = result.querySelector(".again");


let url = `http://api.qrserver.com/v1/read-qr-code/`;
function fetchData(formdata, file){
    fetch(url,{
        method: "post",
        body:formdata
    }).then((Response)=> Response.json()).then((resolve)=>{
        let error = resolve[0].symbol[0].error
        let data = resolve[0].symbol[0].data;
        if(!error){
            infoIcon.innerHTML = `<i class='bx bx-qr-scan scan'></i>`;
            info.classList.add("scan")
            info.innerText = "Scaning Qr Code..";
            selectBox.classList.add("disabled")
            setTimeout(() => {
                dataText.innerHTML = resolve[0].symbol[0].data;
                image.src = URL.createObjectURL(file)
                selectBox.classList.add("hide")
                result.classList.add("show");
                selectBox.classList.remove("disabled")
            }, 800);
        }else{
            infoIcon.innerHTML = `<i class='bx bx-info-circle error'></i>`;
            info.classList.add("error")
            info.innerText = error;
        }
    })
}

btnAgain.addEventListener("click",()=>{
    selectBox.classList.remove("hide");
    result.classList.remove("show");
    chooseImg.value = '';
    info.classList.remove("scan","error")
    info.innerText = "select image";
    infoIcon.innerHTML = `<i class="fas fa-regular fa-cloud-arrow-up"></i>`;
})

chooseImg.addEventListener("change",(e)=>{
    let file = e.target.files[0];
    let formdata = new FormData();
    formdata.append("file",file);
    fetchData(formdata,file)
})

selectBox.addEventListener("click",()=> chooseImg.click())



