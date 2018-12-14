document.addEventListener("DOMContentLoaded", ()=>{
    
    //获取节点
    let randomNum = document.querySelector(".randomNum");
    let btn_login = document.querySelector(".btn_login");
    let username = document.querySelector(".username");
    let password = document.querySelector(".password");
    let reb_psw = document.querySelector(".reb_psw");
    let register = document.querySelector(".register");

    //点击获生成随机验证码
    randomNum.onclick = ()=>{
        //封装生成0-9随机数
        function getNum(){
            return parseInt(Math.random()*9);
        }

        randomNum.innerText = "" + getNum() + getNum() + getNum() + getNum();
    }

    //点击登录
    btn_login.onclick = ()=>{
        
        let _username = username.value;
        let _password = password.value;
        let _randomNum = randomNum.innerText;
        let _register = register.value;

        if(_username && _password){
            if(_randomNum == _register){
                let arr = [200,304];
                let xhr = new XMLHttpRequest();     
                //是否选择记住密码
                if(reb_psw.checked){
                    xhr.onload = () =>{
                        if(arr.includes(xhr.status)){
                            let obj = JSON.parse(xhr.responseText);
                            if(obj.code=="1"){
                                // location.href = "";
                                alert("登录成功");
                            }else{
                                alert("密码错误")
                            }
                        }
                    }
                    xhr.open("post","/checklogin",true);
                    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                    xhr.send(`username=${_username}&password=${_password}`);
                }else{
                    xhr.onload = () =>{
                        if(arr.includes(xhr.status)){
                            let obj = JSON.parse(xhr.responseText);
                            if(obj.code=="1"){
                                // location.href = "";
                                alert("登录成功");
                            }else{
                                alert("密码错误")
                            }
                        }
                    }
                    xhr.open("post","/checklogin",true);
                    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                    xhr.send(`username=${_username}&password=${_password}`);
                }

            }else{
                _register = "验证码错误";
            }
        }else{
            alert("用户名或密码不能为空");
        }

    }


})