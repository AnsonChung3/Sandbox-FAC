const root = document.documentElement;

function draw(parentEl) {
    // this method is specific prototype for drawing the line and a circle for another project
    // so the default setting of this should take responsive sizes of canvas
    const { width, height } = resizeCanvas(parentEl);

    const canvas = document.getElementById("draw-line-n-dot");
    canvas.width = width;
    canvas.height = height;
    canvas.style.background = 'var(--pink)';
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height)
    ctx.strokeStyle = 'var(--red)';
    ctx.lineWidth = 2;

    const midWid = width*.5;
    const leadTop = height*.25;
    const r = width*.2;

    ctx.beginPath();
    ctx.moveTo(midWid, 0);
    ctx.lineTo(midWid, leadTop);
    ctx.arc(midWid, leadTop+r, r, -(Math.PI/2), Math.PI * 2, false)
    ctx.moveTo(midWid, leadTop+(r*2));
    ctx.lineTo(midWid, height);
    ctx.stroke();
    
}

function resizeCanvas(parentEl) {
    return {
        width: document.getElementById(parentEl).clientWidth,
        height: document.getElementById(parentEl).clientHeight
    }
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        // Clear previous timeout if it exists
        clearTimeout(timeoutId);
        // Set new timeout
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const debouncedDraw = debounce(draw, 10);

window.addEventListener('resize', () => {
    debouncedDraw('left');
});