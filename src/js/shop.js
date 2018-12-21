document.addEventListener("DOMContentLoaded",() => {

    //获取元素
    let input_name = document.querySelector(".input_name");
    let input_id = document.querySelector(".input_id");
    let input_price1 = document.querySelector(".input_price1");
    let input_price2 = document.querySelector(".input_price2");
    let input_kucun = document.querySelector(".input_kucun");
    let shangjia = document.querySelector(".shangjia");
    let textarea = document.querySelector(".textarea");
    let btn_yes = document.querySelector(".btn_yes");
    // 判断是否有传参
    var getid = location.search;
    if(getid){
        getid = getid.slice(-1);
        var xhr = new XMLHttpRequest();
        var status = [200,304];
        xhr.onload = () => {
            if(status.includes(xhr.status)){
                var obj = JSON.parse(xhr.responseText);
                console.log(obj)
                input_name.value = obj.data[0].shop;
                input_id.value = obj.data[0].id;
                input_price1.value = obj.data[0].price2;
                input_price2.value = obj.data[0].price1;
                input_kucun.value = obj.data[0].kucun;
                textarea.value = obj.data[0].introduce;
                shangjia.value = obj.data[0].state;
                if(obj.data[0].state == "上架"){
                    shangjia.style.background = "#58bc58";
                }else if(obj.data[0].state == "下架"){
                    shangjia.style.background = "#ccc";
                }

            }
        }
        xhr.open("get",`/goodlist/async?id=${getid}`,true);
        xhr.send();

    }
    //点击上下架
    shangjia.onclick = function(){
        if(this.value=="上架"){
            this.value="下架";
            this.style.background = "#ccc";
        }else if(this.value == "下架"){
            this.value="上架";
            this.style.background = "#58bc58";
        }
    }

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
        xhr.open("post",`/goodlist/async1`,true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(`shop=${input_name.value}&id=${input_id.value}&price2=${input_price1.value}&price1=${input_price2.value}&kucun=${input_kucun.value}&introduce=${textarea.value}&state=${shangjia.value}`);



    }
    






































})