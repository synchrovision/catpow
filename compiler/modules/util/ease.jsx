export const easeLinear=(p)=>p;
export const easeInQuad=(p)=>p*p;
export const easeOutQuad=(p)=>1-Math.pow(1-p,2);
export const easeInOutQuad=(p)=>(p<0.5)?(p*p*2):(1-Math.pow(1-p,2)*2);
export const easeInCubic=(p)=>p*p*p;
export const easeOutCubic=(p)=>1-Math.pow(1-p,3);
export const easeInOutCubic=(p)=>(p<0.5)?(p*p*p*4):(1-Math.pow(1-p,3)*4);