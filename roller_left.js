/**
 * Created by liny on 2019/10/28.
 */
function RollerLeft(config) {
    this.version = "0.1.0";

    function unifyAll() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] +
            'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
        if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

    function toInt(val) {
        if(val > 0) {
            val = (0.5 + val) << 0;
            return val;
        } else if(val<0) {
            val = -val;
            val = (0.5 + val) << 0;
            return -val;
        } else {
            return 0;
        }
    }

    var rollers = [];
    var nodes = config['nodes'];
    var gap = config['gap'] || 80;
    var speed = config['speed'] || 1;
    var isToInt = speed !== Math.round(speed);
    var pauseCount = config['pauseCount'] || 0;
    var pausePos = config['pausePos'];
    if(pausePos==undefined) {
        pausePos = toInt(gap/2);
    }

    var totalW = gap;
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        var ro = {
            n: node,
            w: node.scrollWidth + gap,
            left: totalW
        }
        totalW += ro.w;
        rollers.push(ro);
        node.style.transform = 'translate3d('+ro.left+'px, 0px, 0px)';
    }
    nodes[0].parentNode.style.visibility = "visible";
    unifyAll();

    var last = rollers[rollers.length-1];
    var runRAF = null;
    var pause = pauseCount;
    function runLoop() {
        runRAF = requestAnimationFrame(runLoop);
        var ro;
        if(pause>0) {
            pause--;
            return;
        }
        for(var i=0;i<rollers.length;i++) {
            ro = rollers[i];
            ro.left -= speed;
            if((ro.left+ro.w) < pausePos) {
                ro.left = last.left + last.w;
                last = ro;
                pause = pauseCount;
                continue;
            }
            if(ro.left<=window.innerWidth) {
                var rl = isToInt ? toInt(ro.left) : ro.left;
                ro['n'].style.transform = 'translate3d('+rl+'px, 0px, 0px)';
            }
        }
    }

    this.start = function() {
        if(runRAF==null) {
            runLoop();
        }
    };
    this.stop = function() {
        if(runRAF != null) {
            cancelAnimationFrame(runRAF);
            runRAF = null;
        }
    }
};