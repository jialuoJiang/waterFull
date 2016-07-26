/**
 * Created by MLS on 15/9/24.
 */

window.onload = function () {
    waterfall('main', 'box');

    var imgSource = {'data': [{'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '1.jpg'}, {'src': '2.jpg'}]}

    if (checkScrollSlide()) {
       console.log('可以加载图片')
        // 条件满足，可以加载图片
        for (var i = 0; i < imgSource.data.length; i++) {
            var parent = document.getElementById('main');
            var newBox = document.createElement('div');
            newBox.className = 'box';
            parent.appendChild(newBox);

            var newPic = document.createElement('div');
            newPic.className = 'pic';
            newBox.appendChild(newPic);

            var newImg = document.createElement('img');
            newImg.src = '../images/' + imgSource.data[i].src;
            newPic.appendChild(newImg)
        }
        waterfall('main', 'box')
    }


}

function waterfall(parent, box) {

    var parent = document.getElementById(parent);

    //找到parent下所有class为box的类
    var boxName = getBoxByClass(parent, box);

    //每行放几张图片  ，图片列数
    var boxWidth = boxName[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / boxWidth);  // 每行放cols张图片，

    // 放置图片 ,前cols张图片的位置不用管，，从cols+1张开始考虑
    var boxHeight = [];
    for (var i = 0; i < boxName.length; i++) {
        if (i < cols) {
            boxHeight.push(boxName[i].offsetHeight)
        } else {
            //得到最小高度
            var minboxHeight = Math.min.apply(null, boxHeight);
            // 得到第一行高度最小的图片的位置
            var minHeightIndex = getminHeightIndex(boxHeight, minboxHeight);

            boxName[i].style.position = 'absolute';
            boxName[i].style.top = minboxHeight + 'px';
            boxName[i].style.left = boxWidth * minHeightIndex + 'px';
            boxHeight[minHeightIndex] = boxName[i].offsetHeight + boxHeight[minHeightIndex]

        }
    }
}

// 找到所有class为box
function getBoxByClass(parent, box) {
    var arr = new Array();
    var allElement = parent.getElementsByTagName('*');
    for (var i = 0; i < allElement.length; i++) {
        if (allElement[i].className == 'box') {
            arr.push(allElement[i]);
        }
    }
    return arr;
}

function getminHeightIndex(boxHeight, minboxHeight) {
    for (var i = 0; i < boxHeight.length; i++) {
        if (boxHeight[i] == minboxHeight) {
            return i;
        }
    }
}

function checkScrollSlide() {
    console.log('-------------')
    var parent = document.getElementById('main');
    var box = parent.getElementsByClassName('box');

    // 最后一个box 的top+其高度的一半
    var lastboxHeight = box[box.length - 1].offsetTop + Math.floor(box[box.length - 1].offsetHeight / 2);

    // 浏览器的可视区域的高度+
    // 滚动条已滚动的高度
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var viewHeight = document.documentElement.clientHeight;
    var all=scrollTop+viewHeight;

    if(scrollTop<all){
        return true;
    }else{
        return false;
    }
}