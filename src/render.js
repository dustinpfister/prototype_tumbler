
var Render = (function () {

    var container,
    canvas,
    ctx,

    drawPlug = function () {

        var p = Lock.Plug;

        ctx.strokeStyle = '#ffffff';

        // draw min radius
        ctx.beginPath();
        ctx.arc(p.cx, p.cy, p.minR, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

        // draw max radius
        ctx.beginPath();
        ctx.arc(p.cx, p.cy, p.maxR, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

    };

    drawTumblers = function () {

        var p = Lock.Plug,
        i = 0,
        len = p.tumblers.length,
        x,
        y,
        r,
        rDelta,
        tumb,
        spacing = (p.maxR - p.minR) / (len);
        while (i < len) {

            tumb = p.tumblers[i];

            rDelta = Math.PI * 2 / tumb.maxClicks;

            r = rDelta * tumb.click;
            x = Math.cos(r) * (p.minR + spacing * i + spacing) + p.cx;
            y = Math.sin(r) * (p.minR + spacing * i + spacing) + p.cy;

            // draw current click
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            r = rDelta * tumb.pinClick;
            x = Math.cos(r) * (p.minR + spacing * i + spacing) + p.cx;
            y = Math.sin(r) * (p.minR + spacing * i + spacing) + p.cy;

            // draw the pin location
            ctx.fillStyle = '#ffff00';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            i += 1;

        }

    };

    return {

        setup : function (conID) {

            container = document.getElementById(conID);
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');

            canvas.width = 320;
            canvas.height = 240;

            container.appendChild(canvas);

        },

        draw : function (state) {

            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawPlug();
            drawTumblers();

            ctx.fillStyle = '#00ffff';
            ctx.font = '10px arial';
            ctx.textBaseline = 'top';
            ctx.fillText('d=' + Lock.Plug.d, 20, 20);
            ctx.fillText('tolerance=' + Lock.Plug.tolerance, 20, 40);

        }

    }

}
    ());
