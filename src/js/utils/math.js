import gsap from "gsap";

const PI2 = Math.PI * 2.0;

function lerp (start, end, amt) { return (1 - amt) * start + amt * end }
function invLerp (x, y, a) { return gsap.utils.clamp(0, 1, (a - x) / (y - x)) }
function damp (start, end, amt, dt = 1) { return lerp(start, end, 1 - Math.exp(Math.log(1 - amt) * dt)) }
function modulo (n, d) { return (n % d + d) % d }

/**
 * Round a value with N decimals
 * @param value the value to round
 * @param places the amt of decimals
 * @returns
*/
function roundPrecise (value, places) {
    const p = Math.pow(10, places || 0)
    return Math.round(value * p) / p
}

/**
 * Wrap an angle between 0 and 2*PI
 * @param a the angle to wrap
 * @returns
*/
function normalizeAngle(a) {
    while (a >= PI2) a -= PI2;
    while (a < 0.0) a += PI2;
    return a;
}
  
/**
 * Avoid 360 wrap around when update an angle. Usefull when angle value is smoothed
 * Eg : if angle is 350 and dest is 10, return 370 (this function use radians though)
 * @param angle the initial angle in radians
 * @param dest the destination angle in radians
 * @returns the destination angle, eventually modified to avoid 360 wrap around
*/
function normalizeDeltaAngle(angle, dest) {
    let d0 = dest - angle;
    const d1 = d0 - PI2;
    const d2 = d0 + PI2;

    if (Math.abs(d1) < Math.abs(d0)) {
        d0 = d1;
    }
    if (Math.abs(d2) < Math.abs(d0)) {
        d0 = d2;
    }

    return angle + d0;
}

export { lerp, damp, invLerp, modulo, roundPrecise, normalizeAngle, normalizeDeltaAngle };
