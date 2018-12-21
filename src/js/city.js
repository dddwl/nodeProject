
document.addEventListener("DOMContentLoaded",()=>{
    //获取元素
    let main_3 = document.querySelector(".main_3");
    let yema = document.querySelector(".yema");
    let yeshu = document.querySelector(".yeshu");
    let topages = document.querySelector(".topages");
    let yes = document.querySelector(".yes");
    let title_li = document.querySelector(".title_li");
    let img_upArr = document.querySelectorAll(".img_up");
    let img_downArr = document.querySelectorAll(".img_down");
    let page = document.querySelector(".page");
    let btn_del = document.querySelector(".btn_del");
    let btn_add = document.querySelector(".btn_add");
    let total = document.querySelector(".total");
    var xiajiaArr;
    var oneArr;
    var emArr;
    let all = document.querySelector(".all");
    //用于接收商品列表的长度
    let length = 0;

    //用于判断排序方式的变量(默认id排序)
    var type = "id";
    //用于判断升降序
    let desc = 1;//(默认为1升序,-1为降序)



    init();
    //封装商品列表初始化
    function init(){
        let xhr = new XMLHttpRequest();
        let arr = [200,304];
        xhr.onload = () =>{
            if(arr.includes(xhr.status)){
                let obj = JSON.parse(xhr.responseText); 
                length = obj.length;
                //表格内容渲染
                content(obj.data);
                //生成页码渲染
                if(length>0){
                    getPage(obj.length,yeshu.value);
                    total.children[0].innerHTML = length;
                    
                }
                //上下架颜色显示状态
                colorandbg();
            }
        }
        xhr.open("get","/city",true);
        xhr.send();
    }
    //封装表格内容数据渲染
    function content(arr){
        let str = arr.map((item,i)=>{
                    return `<li data-id="${item.id}">
                            <span class="fl span1"><input class="one" type="checkbox"></span>
                            <span class="fl span2">${item.id}</span>
                            <span class="fl span4">${item.city}</span>
                            <span class="fl span9">${item.time}</span>
                            <span class="fl span10">
                                <i class="write">写入</i>
                                <i class="del_shop">删除</i>
                            </span>
                        </li>`
                }).join("");
        main_3.innerHTML = str;
        colorandbg();
    }
    //封装生成页码
    function getPage(total,oneNum){
        let num = Math.ceil(total/oneNum);
        let str = "";
        for(let a=0;a<num;a++){
            str += `<em class="fl">${a+1}</em>`
        }
        yema.innerHTML = str;
        yema.children[0].classList.add("active");
        topages.max = num;
    }

    //点击页码跳转到对应页
    yema.onclick = (e)=>{
        var e = e || window.event;
        if(e.target.tagName == "EM"){
            //清空所有高亮页码
            removeAllPageActive();
            e.target.classList.add("active");
            let xhr = new XMLHttpRequest();
            let arr = [200,304];
            xhr.onload = () =>{
                if(arr.includes(xhr.status)){
                    let obj = JSON.parse(xhr.responseText); 
                    //表格内容渲染
                    content(obj.data);
                }
            }
            xhr.open("get",`/city/apage?page=${e.target.innerText}&qty=${yeshu.value}&type=${type}&desc=${desc}`,true);
            xhr.send();
        }
        
    }

    //点击上下页
    page.onclick = (e)=>{
        var e = e || window.event;
        //点击上一页
        if(e.target.classList.contains("prve")){
            emArr = document.querySelectorAll("em");
            
            var activeNum = highLightPage(emArr); 
            if(activeNum-2>=0){
                //清空所有高亮页码
                removeAllPageActive();
                yema.children[activeNum-2].classList.add("active");
                let xhr = new XMLHttpRequest();
                let arr = [200,304];
                xhr.onload = () =>{
                    if(arr.includes(xhr.status)){
                        let obj = JSON.parse(xhr.responseText); 
                        //表格内容渲染
                        content(obj.data);
                        
                    }
                }
                xhr.open("get",`/city/apage?page=${activeNum-1}&qty=${yeshu.value}&type=${type}&desc=${desc}`,true);
                xhr.send();

            }
        }

        //点击下一页
        if(e.target.classList.contains("next")){
            emArr = document.querySelectorAll("em");
            
            var activeNum = highLightPage(emArr); 
            
            if(activeNum*1+1<=emArr.length){
                //清空所有高亮页码
                removeAllPageActive();
                yema.children[activeNum].classList.add("active");
                let xhr = new XMLHttpRequest();
                let arr = [200,304];
                xhr.onload = () =>{
                    if(arr.includes(xhr.status)){
                        let obj = JSON.parse(xhr.responseText); 
                        //表格内容渲染
                        content(obj.data);
                        
                    }
                }
                xhr.open("get",`/city/apage?page=${activeNum*1+1}&qty=${yeshu.value}&type=${type}&desc=${desc}`,true);
                xhr.send();

            }
        }
        
    }
    
    //封装获取当前高亮的页码
    function highLightPage(arr){
        for(var a=0;a<arr.length;a++){
            if(arr[a].classList.contains('active')){
                return arr[a].innerText;
            }
        }
    }

    //封装清除所有页码的类名active
    function removeAllPageActive(){
        for(var a=0;a<yema.children.length;a++){
            yema.children[a].classList.remove("active");
        }
    }


    //页数表单内容改变时触发
    yeshu.onblur = () =>{
        let _yeshu = yeshu.value;
        getPage(length,_yeshu);
        let xhr = new XMLHttpRequest();
        let arr = [200,304];
        xhr.onload = () =>{
            if(arr.includes(xhr.status)){
                let obj = JSON.parse(xhr.responseText); 
                //表格内容渲染
                content(obj.data);
                
            }
        }
        xhr.open("get",`/city/apage?page=1&qty=${yeshu.value}&type=${type}&desc=1`,true);
        xhr.send();
        topages.value = "";

    }
    //到第几页输入内容时
    topages.onblur = function(){
        //限制输入到第几页的最大和最小值
        this.value = this.value>yema.children.length ? yema.children.length : this.value;
        this.value = this.value<1 ? 1 : this.value;
    }

    //点击确定按钮
    yes.onclick = () =>{
        //清除所有类名
        removeAllPageActive();
        //给当前加高亮
        yema.children[topages.value-1].classList.add("active");
        let xhr = new XMLHttpRequest();
        let arr = [200,304];
        xhr.onload = () =>{
            if(arr.includes(xhr.status)){
                let obj = JSON.parse(xhr.responseText); 
                //表格内容渲染
                content(obj.data);
                
            }
        }
        xhr.open("get",`/city/apage?page=${topages.value}&qty=${yeshu.value}&type=${type}&desc=1`,true);
        xhr.send();
        topages.value = "";
    }

    //点击排序
    title_li.onclick = (e)=> {
        if(e.target.className == "img_up"){
            var e = e || window.event;
            //排序按钮高亮清除
            removeAllBlack();
            //点击的高亮
            e.target.src = "../image/sanjiaoup.png";
            desc = 1;
            type = e.target.parentElement.dataset.type;
            let xhr = new XMLHttpRequest();
            let arr = [200,304];
            xhr.onload = () =>{
                if(arr.includes(xhr.status)){
                    let obj = JSON.parse(xhr.responseText); 
                    //表格内容渲染
                    content(obj.data);
                    
                }
            }
            xhr.open("get",`/city/apage?page=1&qty=${yeshu.value}&type=${type}&desc=1`,true);
            xhr.send();
        }

        if(e.target.className == "img_down"){
            var e = e || window.event;
            //排序按钮高亮清除
            removeAllBlack();
            //点击的高亮
            e.target.src = "../image/sanjiaodown.png";
            desc = -1;
            type = e.target.parentElement.dataset.type;
            let xhr = new XMLHttpRequest();
            let arr = [200,304];
            xhr.onload = () =>{
                if(arr.includes(xhr.status)){
                    let obj = JSON.parse(xhr.responseText); 
                    //表格内容渲染
                    content(obj.data);
                    
                }
            }
            xhr.open("get",`/city/apage?page=1&qty=${yeshu.value}&type=${type}&desc=-1`,true);
            xhr.send();
        }

    }

    //封装清除排序按钮颜色
    function removeAllBlack(){
        for(var a=0;a<img_upArr.length;a++){
            img_upArr[a].src = '../image/sanjiaoup1.png';
            img_downArr[a].src = '../image/sanjiaodown1.png';
        }
    }

    //点击全选按钮
    all.onclick = () => {
        oneArr = document.querySelectorAll(".one");
        if(all.checked){
            changeInput(oneArr,true)
        }else{
            changeInput(oneArr,false)
        }
    }

    //封装点击全选,所有选择框相应变化
    function changeInput(arr,boolean){
        for(var a=0;a<arr.length;a++){
            arr[a].checked = boolean;
        }
    }
   
   //事件委托main_3
   main_3.addEventListener("click",(e) => {
        var e = e || window.event;
        //点击单个选择框
        if(e.target.tagName == "INPUT"){
            oneArr = document.querySelectorAll(".one");
            if(e.target.checked){
                if(iftrue(oneArr) == false){
                    all.checked = false;
                }else{
                    all.checked = true;
                }

            }else{
                all.checked = false;
            }
        }

        //点击单个删除
        if(e.target.className == "del_shop"){
            var del_id = e.target.parentElement.parentElement.dataset.id;
            if(confirm("是否删除")){
                length = length - 1;
                total.children[0].innerHTML = length;
                let xhr = new XMLHttpRequest();
                let arr = [200,304];
                xhr.onload = () =>{
                    if(arr.includes(xhr.status)){
                        let obj = JSON.parse(xhr.responseText); 
                        if(obj.code == 1){
                            //删除成功执行
                            emArr = document.querySelectorAll("em");
                            xhr.open("get",`/city?page={highLightPage(emArr)}&qty=${yeshu.value}&type=${type}&desc=${desc}`,true);
                            xhr.send();
                            xhr.onload = () => {
                                var obj = JSON.parse(xhr.responseText);
                                content(obj.data);
                            }
                        } 
                    }
                }
                xhr.open("delete",`/city/async`,true);
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                xhr.send(`id=${del_id}`);
            }
        }

        //点击上下架
        if(e.target.className == "xiajia"){
                var state = "";
                if(e.target.innerText == "上架"){
                    state = "下架"
                }else if(e.target.innerText == "下架"){
                    state = "上架"
                }
                //改变文字
                e.target.innerText = state;
                // e.target.parentElement.parentElement.children[7].innerText = state;
                // 刷新文字和背景颜色
                colorandbg();
                let xhr = new XMLHttpRequest();
                // let arr = [200,304];
                // xhr.onload = () =>{
                //     if(arr.includes(xhr.status)){
                //        if(JSON.parse(xhr.responseText).code == 0){

                //        }
                //     }
                // }
                xhr.open("post",`/city/async`,true);
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                xhr.send(`id=${e.target.parentElement.parentElement.dataset.id}&state=${state}`);
        }

        //点击写入
        if(e.target.className == "write"){
                location.href = `../html/add.html?city=${e.target.parentElement.parentElement.children[2].innerText}`;    
        
        }
   })


   //判断所有单选框是否全部勾选,如果不是全部勾选,返回false
   function iftrue(arr){
        var booleanArr = [];
        for(var a=0;a<arr.length;a++){
            if(arr[a].checked == false){
                return false;
            }
        }
   }

   //点击删除所有
   btn_del.onclick = () => {
        oneArr = document.querySelectorAll(".one");
        if(ifCheck(oneArr).length>0){
            if(confirm("是否删除所选数据")){
                length = length - ifCheck(oneArr).length;
                total.children[0].innerHTML = length;
                for(let a=0;a<ifCheck(oneArr).length>0;a++){
                    let xhr = new XMLHttpRequest();
                    let arr = [200,304];
                    xhr.onload = () =>{
                        if(arr.includes(xhr.status)){
                            let obj = JSON.parse(xhr.responseText); 
                            if(obj.code == 1){
                                //删除成功执行
                                emArr = document.querySelectorAll("em");
                                xhr.open("get",`/city?page={highLightPage(emArr)}&qty=${yeshu.value}&type=${type}&desc=${desc}`,true);
                                xhr.send();
                                xhr.onload = () => {
                                    var obj = JSON.parse(xhr.responseText);
                                    content(obj.data);
                                }
                            } 
                        }
                    }
                    xhr.open("delete",`/city/async`,true);
                    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                    xhr.send(`id=${ifCheck(oneArr)[a]}`);
                }
            }
        }else{
            alert("请选择要删除的数据");
        }
        
   }

    //封装获取所有已勾选的商品数据id
    function ifCheck(arr){
        var checkArr = [];
        for(var a=0;a<arr.length;a++){
            if(arr[a].checked){
                //checkArr.push({id:arr[a].parentElement.parentElement.dataset.id*1});
                checkArr.push(arr[a].parentElement.parentElement.dataset.id*1)
            }
        }
        return checkArr;

    }

    

    //封装上下架背景和文字颜色显示状态
    function colorandbg(){
        //上下架颜色状态
        xiajiaArr = document.querySelectorAll(".xiajia");
        if(xiajiaArr){
            for(var a=0;a<xiajiaArr.length;a++){
                if(xiajiaArr[a].innerText == "上架"){
                    xiajiaArr[a].style.background = "rgba(255, 120, 78, 1)"; 
                    xiajiaArr[a].style.color = "#fff";
                }else if(xiajiaArr[a].innerText == "下架"){
                    xiajiaArr[a].style.background = "#f2f2f2"; 
                    xiajiaArr[a].style.color = "#666";
                }
            }
        }
    }

//点击添加
    btn_add.onclick = () => {
        location.href = "../html/add.html";
    }
})

