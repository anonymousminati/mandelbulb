let DIM = 128;
let c;

let mandelbulb = new Array()
function setup() {
  createCanvas(800, 800, WEBGL);
  createEasyCam();
  document.oncontextmenu = () => false;

  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      let edge = false;
      for (let k = 0; k < DIM; k++) {
        let x = map(i, 0, DIM, -1, 1);
        let y = map(j, 0, DIM, -1, 1);
        let z = map(k, 0, DIM, -1, 1);
        let zeta = new createVector(0, 0, 0);
        let n = 8;
        let maxiterations = 20;
        let iteration = 0;
        while (true) {
           c = new spherical(zeta.x, zeta.y, zeta.z);
          let newx = pow(c.r, n) * sin(c.theta * n) * cos(c.phi * n);
          let newy = pow(c.r, n) * sin(c.theta * n) * sin(c.phi * n);
          let newz = pow(c.r, n) * cos(c.theta * n);
          zeta.x = newx + x;
          zeta.y = newy + y;
          zeta.z = newz + z;
          iteration++;
          if (c.r > 2) {
            if (edge) {
              edge = false;
            }
            break;
          }
          if (iteration > maxiterations) {
            if (!edge) {
              edge = true;
              mandelbulb.add(new createVector(x, y, z));
            }
            break;
          }
        }
      }
    }
  }
}

class Spherical {
    constructor() {
        let r, theta, phi;
       new Spherical(r, theta, phi); {
            this.r = r;
            this.theta = theta;
            this.phi = phi;
        }
    }
}
function spherical( x,  y,  z) {
    let r = sqrt(x*x + y*y + z*z);
    let theta = atan2( sqrt(x*x+y*y), z);
    let phi = atan2(y, x);
    return new  Spherical(r, theta, phi);
  }
function draw() {
  background(0);
}
