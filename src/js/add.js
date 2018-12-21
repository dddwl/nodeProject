document.addEventListener("DOMContentLoaded",() => {
    //获取元素
    let input_name = document.querySelector(".input_name");
    let textarea = document.querySelector(".textarea");
    let yes = document.querySelector(".yes");
    //
    //判断是否存在传参
    var getcity = location.search;
    if(getcity){
        getcity = getcity.slice(-5);
        input_name.value = getcity;
        textarea.innerText = getcity;
    }
    yes.onclick = () =>{
        if(input_name.value){
            if(textarea.innerText){
                let xhr = new XMLHttpRequest();
                let arr = [200,304];
                xhr.onload = () =>{
                    if(arr.includes(xhr.status)){
                        let obj = JSON.parse(xhr.responseText); 
                        
                    }
                }
                xhr.open("get","/city",true);
                xhr.send();



            }else{
                alert("备注不能为空");
            }
        }else{
            alert("城市名称不能为空")
        }
    }

})