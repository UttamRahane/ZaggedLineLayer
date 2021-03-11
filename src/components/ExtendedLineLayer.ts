import { PathLayer } from "@deck.gl/layers";

export default class ExtendedLineLayer extends PathLayer {
  props: any;

  state: any;

  setNeedsRedraw: any;

  constructor(prop: any) {
    super(prop);
  }

  getShaders() {
    const shaders = super.getShaders(this.props.id);
    shaders.inject = {
      "fs:#decl": `
                uniform float iTime;
            `,
      "fs:#main-end": `
          float curve = 0.1 * sin((9.25 * geometry.uv.x) + (2.0 * 1.0));
          float lineAShape = smoothstep(1.0 - clamp(distance(curve + geometry.uv.y, 0.5) * 1.0, 0.0, 1.0), 1.0, 0.99);
          gl_FragColor = (1.0 - lineAShape) * gl_FragColor;
          DECKGL_FILTER_COLOR(gl_FragColor , geometry);
      `
    };
    return shaders;
  }

  initializeState(params) {
    super.initializeState(params);
  }

  draw(opts) {
    let timeStep = 0.1;
    let iTime = 0.0;
    if (this.state.model.uniforms.iTime) {
      iTime = this.state.model.uniforms.iTime;
      timeStep = this.state.model.uniforms.timeStep;
    }
    if (iTime > 0.9 || iTime < 0.1) {
      timeStep *= -1;
    }
    iTime -= timeStep;
    this.state.model.setUniforms({
      iTime,
      timeStep
    });
    super.draw(opts);
    setTimeout(() => {
      this.setNeedsRedraw();
    }, 600);
  }
}
