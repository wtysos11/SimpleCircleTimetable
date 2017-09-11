$(document).ready(function(){
    var Circle={
        x:405,
        y:345,
        Radius:300
    };
    var arr=new Array();//存放event
    var rangeArr=new Array();//存放区间
    var uid=0;
    reset();

    //button控件部分
    function reset(){
        var canvas=document.getElementById("myCanvas");
        canvas.width=canvas.width;
        var ctx=$("#myCanvas")[0].getContext("2d");
        ctx.beginPath();
        ctx.arc(Circle.x,Circle.y,Circle.Radius,0*Math.PI,2*Math.PI);
        ctx.strokeStyle="black";
        ctx.stroke();
    }
    //button点击事件
    $(".size:eq(0)").click(function(){
        Circle.Radius=200;
        reset();
    });
    $(".size:eq(1)").click(function(){
        Circle.Radius=250;
        reset();
    });
    $(".size:eq(2)").click(function(){
        Circle.Radius=300;
        reset();
    });
    $("#clear").on("click",reset);
    $("#createEvent").on("click",function(){
        if($("#input").children()[0].value==""){
            $("#warn").text("请输入内容！");
        }
        else{
            arr.push({
                event: $("#input").children()[0].value,
                color: $("#input").children()[1].value
            });
            var $addButton=$("<button class='createNode'>+</button>");
            var $deleteButton=$("<button class='deleteNode'>x</button>");
            var $newList=$("<li name="+uid+">"+$("#input").children()[0].value+" "+$("#input").children()[1].value+"</li>");

            $addButton.on("click",null,{value:uid},drawAfterClick);
            $newList.append($addButton);
            $newList.append($deleteButton);
            $("#table").append($newList);
            uid=uid+1;

        }

    });

    //addButton的点击事件，负责绘制图像
    function drawAfterClick(event){
        var nodeNum=event.data.value;
        var start=Number(prompt("请输入开始时间","0"));
        var end=Number(prompt("请输入结束时间","0"));

        if(isNaN(start)||isNaN(end)){
            $("#warn").text("请输入数字！");
        }
        else{
            var range=new Range(start,end,arr[nodeNum].event,arr[nodeNum].color);
            rangeArr.push(range);
            //sort  新插入排序以及与其他的关系，未实现

            DrawPicture(range);
        }

    }


    //面向对象部分
    function Range(start,end,name,color){
        this.start=start;
        this.end=end;
        this.name=name;
        this.color=color;
    }
    Range.prototype={
        constructor: Range
    };

    //绘图用函数
    //时钟与PI的转换关系
    function changePI(num){
        if(num<6)
            num+=24;
        return (num-6)/12*Math.PI;
    }
    //时间与圆上点的坐标的转换关系
    function changePoint(Circle,num){
        return {
            x:Circle.x+Circle.Radius*Math.cos(changePI(num)),
            y:Circle.y+Circle.Radius*Math.sin(changePI(num))
        };
    }

    //在canvas上画出指定对象
    function DrawPicture(range){
        var canvas=document.getElementById("myCanvas");
        var ctx=$("#myCanvas")[0].getContext("2d");

        ctx.beginPath();
        ctx.strokeStyle="black";
        ctx.arc(Circle.x,Circle.y,Circle.Radius,changePI(range.start),changePI(range.end));
        ctx.lineTo(Circle.x,Circle.y);

        var point=changePoint(Circle,range.start);
        ctx.lineTo(point.x,point.y);

        ctx.stroke();
        ctx.fillStyle=range.color;
        ctx.fill();

        ctx.fillStyle="black";
        ctx.font="5px Georgia";
        //clock number
        var bigCircle={
            x:Circle.x,
            y:Circle.y,
            Radius:Circle.Radius+20
        };
        var newPoint=changePoint(bigCircle,range.start);
        ctx.fillText(range.start,newPoint.x,newPoint.y);
        newPoint=changePoint(bigCircle,range.end);
        ctx.fillText(range.end,newPoint.x,newPoint.y);

        ctx.font=(range.end-range.start)*5+25+"px Georgia";
        var smallCircle={
            x:Circle.x,
            y:Circle.y,
            Radius:Circle.Radius/2
        };
        var textPoint=changePoint(smallCircle,(range.start+range.end)/2);
        ctx.fillText(range.name,textPoint.x,textPoint.y);
    }

}
);
