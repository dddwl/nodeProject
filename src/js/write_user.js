
document.addEventListener("DOMContentLoaded",() => {

    // 获取元素
    let input_name = document.querySelector(".input_name");
    let input_id = document.querySelector(".input_id");
    let input_price1 = document.querySelector(".input_price1");
    let input_pas = document.querySelector(".input_pas");
    let input_kucun = document.querySelector(".input_kucun");
    let email = document.querySelector(".email");
    let textarea = document.querySelector(".textarea");
    let btn_yes = document.querySelector(".btn_yes");
    let select = document.querySelector("select");


    //判断是否有传参
    var getid = location.search;
    if(getid){
        getid = getid.slice(-1);
        var xhr = new XMLHttpRequest();
        var status = [200,304];
        xhr.onload = () => {
            if(status.includes(xhr.status)){
                var obj = JSON.parse(xhr.responseText);
                console.log(obj)
                input_name.value = obj.data[0].username;
                input_id.value = obj.data[0].username;
                input_pas.value = obj.data[0].password;
                input_price1.value = obj.data[0].tel;
                select.value = obj.data[0].gender; 
                input_kucun.value = obj.data[0].birthday; 
                email.value = obj.data[0].email;
                textarea.value = obj.data[0].username;
            }
        }
        xhr.open("get",`/user/async?id=${getid}`,true);
        xhr.send();







        //点击确定按钮
        btn_yes.onclick = () => {
            var xhr = new XMLHttpRequest();
            var status = [200,304];
            xhr.onload = () => {
                if(status.includes(xhr.status)){
                    var obj = JSON.parse(xhr.responseText);
                    if(obj.code == 1){
                        alert("修改成功")
                    }else if(obj.code == 0){
                        alert("修改失败")
                    }

                }
            }
            xhr.open("post",`/user/async1`,true);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xhr.send(`id=${getid}&username=${input_name.value}&password=${input_pas.value}&tel=${input_price1.value}&gender=${select.value}&birthday=${input_kucun.value}&email=${email.value}`);
        }

    }else{
        btn_yes.onclick = () => {

            if(input_name.value && input_pas.value && input_price1.value && select.value && input_kucun.value && email.value){

                var xhr = new XMLHttpRequest();
                var status = [200,304];
                xhr.onload = () => {
                    if(status.includes(xhr.status)){
                        var obj = JSON.parse(xhr.responseText);
                        if(obj.code == 1){
                            alert("增加用户成功")
                        }else if(obj.code == 0){
                            alert("增加用户失败")
                        }

                    }
                }
                xhr.open("put",`/user/async`,true);
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                xhr.send(`username=${input_name.value}&password=${input_pas.value}&tel=${input_price1.value}&gender=${select.value}&birthday=${input_kucun.value}&email=${email.value}`);




            }else{
                alert("信息不能为空");
            }


        }
        
    }


})



