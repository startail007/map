document.addEventListener("DOMContentLoaded", function (event) {
    var Frame01 = document.getElementById('Map01');
    var Map01 = Frame01.querySelector('.MapImage');
    var myScroll = CreateIScroll(Frame01, Map01);

    Frame01.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);

    //ZoomInit(myScroll);
    
    var EnlargeButton = document.getElementById('EnlargeButton');
    var NarrowButton = document.getElementById('NarrowButton');
    var RecoveryButton = document.getElementById('RecoveryButton');

    EnlargeButton.onclick = function (e) {
        myScroll.zoom(myScroll.Prop.scale + 0.3, getWidth(myScroll.Prop.MapFrame) / 2, getHeight(myScroll.Prop.MapFrame) / 2, 600);
    };

    NarrowButton.onclick = function (e) {
        myScroll.zoom(myScroll.Prop.scale - 0.3, getWidth(myScroll.Prop.MapFrame) / 2, getHeight(myScroll.Prop.MapFrame) / 2, 600);
    };
    
    RecoveryButton.onclick = function (e) {
        myScroll.zoom(myScroll.Prop.ZoomMin, getWidth(myScroll.Prop.MapFrame) / 2, getHeight(myScroll.Prop.MapFrame) / 2, 600);
    };

    onresize();
    window.onresize = onresize;

    function onresize(e) {
        ZoomInit(myScroll);
    }

});




function ZoomRange(pIScroll) {
    var rate = pIScroll.Prop.scale * GetRate(pIScroll.Prop.MapFrame, pIScroll.Prop.MapImage);
    if (window.innerWidth > 768) {
        rate *= 0.85;
    }
    pIScroll.Prop.ZoomMin = rate;
    pIScroll.Prop.ZoomMax = rate * 4;
    return rate;
}

function GetRate(pFrame, pTarget) {
    if (window.innerWidth <= 480) {
        return CoverRate(pFrame, pTarget);
    } else if (window.innerWidth <= 768) {
        return CoverRate(pFrame, pTarget);
    } else {
        return ContainRate(pFrame, pTarget);
    }
}

function ZoomInit(pIScroll) {
    var rate = ZoomRange(pIScroll);
    pIScroll.zoom(rate, 0, 0, 0);

    var w = getWidth(pIScroll.Prop.MapFrame);
    var h = getHeight(pIScroll.Prop.MapFrame);
    var w0 = pIScroll.Prop.MapWidth;
    var h0 = pIScroll.Prop.MapHeight;

    pIScroll.Prop.MapLockRange.style.left = 0 + 'px';
    pIScroll.Prop.MapLockRange.style.top = 0 + 'px';
    pIScroll.Prop.MapLockRange.style.width = w + 'px';
    pIScroll.Prop.MapLockRange.style.height = h + 'px';

    if (window.innerWidth <= 480) {
        pIScroll.scrollTo(0, 0);
    } else {
        pIScroll.scrollTo((w - w0) / 2, (h - h0) / 2);
    }
    if (window.innerWidth > 768) {
        pIScroll.Prop.MapLockRange.style.left = pIScroll.Prop.MapPosX + 'px';
        pIScroll.Prop.MapLockRange.style.top = pIScroll.Prop.MapPosY + 'px';
        pIScroll.Prop.MapLockRange.style.width = w0 + 'px';
        pIScroll.Prop.MapLockRange.style.height = h0 + 'px';
    }
}

function CreateIScroll(pFrame, pTarget) {
    var myScroll = new CaiMap(pFrame, pTarget, "Contain");
    ZoomInit(myScroll);
    return myScroll;
}
