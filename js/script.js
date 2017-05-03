window.onload = function () {
    waterfall("main", "box");
    var originWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var timer = null;
    var timer2 = null;

    var dataInt = {
        "data": [{"src": '23.jpg'},
            {"src": '24.jpg'},
            {"src": '25.jpg'},
            {"src": '26.jpg'},
            {"src": '27.jpg'},
            {"src": '28.jpg'},
            {"src": '29.jpg'},
            {"src": '30.jpg'},
            {"src": '31.jpg'},
            {"src": '32.jpg'},
            {"src": '33.jpg'},
            {"src": '34.jpg'}

        ]
    };
    window.onscroll = function () {
        clearTimeout(timer2);
        timer2 = setTimeout(function () {
            if (checkScrollSlide()) {
                var parent = document.getElementById("main");
                //将数据块渲染到页面尾部
                for (var i = 0; i < dataInt.data.length; i++) {
                    var box = document.createElement("div");
                    box.className = "box";
                    parent.appendChild(box);
                    var pic = document.createElement("div");
                    pic.className = "pic";
                    box.appendChild(pic);
                    var img = document.createElement("img");
                    img.src = "img/" + dataInt.data[i].src;
                    pic.appendChild(img);
                }

                waterfall("main", "box");
            }
        }, 200);

    };
    // window.onresize = function () {
    //     clearTimeout(timer);
    //     timer = setTimeout(function () {
    //         waterfall("main", "box");
    //     }, 200);
    // };

};

function waterfall(parentId, boxClass) { //parent为id,box为class
    //将main下所有的class为box的元素取出来
    var parent = document.getElementById(parentId);
    var boxes = getElementsByClass(parent, boxClass);
    // alert(allBoxes.length);

    //计算整个页面显示的列数(页面宽/box的宽)
    var boxWidth = boxes[0].offsetWidth;
    // alert(boxWidth);
    var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var cols = Math.floor(windowWidth / boxWidth);
    // alert(cols);
    //设置main的宽度

    // console.log(cols);
    setStyle(parent, "width:" + boxWidth * cols + "px;margin:0 auto;");

    var heightArr = [];
    for (var i = 0; i < boxes.length; i++) {
        if (i < cols) {
            heightArr.push(boxes[i].offsetHeight);
        } else {
            // console.log(heightArr);

            var minHeight = Math.min.apply(null, heightArr);
            // console.log(minHeight);

            var index = inArrayIndex(heightArr, minHeight);
            boxes[i].style.position = "absolute";
            boxes[i].style.top = minHeight + "px";
            boxes[i].style.left = boxes[index].offsetLeft + "px";
            heightArr[index] += boxes[i].offsetHeight;


        }
    }

    // console.log(boxes.length);


}
//根据class找元素
function getElementsByClass(parent, className) {
    if (document.getElementsByClassName) {
        return parent.getElementsByClassName(className);
    } else {
        var boxArr = [];
        var children = parent.getElementsByTagName("*");
        for (var i = 0; i < children.length; i++) {
            if (children[i].className == className) {
                boxArr.push(children[i]);
            }
        }
        return boxArr;
    }
}

//设置元素的css样式
function setStyle(el, strCss) {
    function endsWith(str, suffix) {
        var l = str.length - suffix.length;
        return l >= 0 && str.indexOf(suffix, l) == l;
    }

    var sty = el.style,
        cssText = sty.cssText;
    if (!endsWith(cssText, ';')) {
        cssText += ';';
    }
    sty.cssText = cssText + strCss;
}

//返回某个值在数组中的索引
function inArrayIndex(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (value == array[i]) {
            return i;
        }
    }
    return -1;
}

function checkScrollSlide() {
    var parent = document.getElementById("main");
    var boxes = getElementsByClass(parent, "box");
    var lastBoxH = boxes[boxes.length - 1].offsetTop + Math.floor(boxes[boxes.length - 1].offsetHeight / 2);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    console.log(scrollTop);
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // alert(windowHeight);

    return (lastBoxH < scrollTop + windowHeight) ? true : false;
}
