const lerp = (start, end, amt) => (1 - amt) * start + amt * end
const invLerp = (x, y, a) => clamp((a - x) / (y - x))
const damp = (start, end, amt, dt = 1) => { lerp(start, end, 1 - Math.exp(Math.log(1 - amt) * dt))}
const round = (t) => Math.round(t * 100) / 100

export { lerp, damp, invLerp, round };