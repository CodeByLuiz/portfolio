/**
 * shader.js
 * Renderiza o fundo animado de "fumaça de tinta" (ink smoke) em WebGL
 * no <canvas id="shader-canvas">. Efeito puramente decorativo.
 */
(function initShaderBackground() {
  const canvas = document.getElementById("shader-canvas");
  if (!canvas) return;

  // Mantém o buffer de desenho do WebGL sincronizado com o tamanho em CSS.
  function syncSize() {
    const w = canvas.clientWidth || 1280;
    const h = canvas.clientHeight || 720;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }

  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(syncSize).observe(canvas);
  }
  syncSize();

  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (!gl) return; // Sem suporte a WebGL: o fundo simplesmente fica estático (CSS já cobre isso).

  const vertexShaderSource = `
    attribute vec2 a_position;
    varying vec2 v_texCoord;
    void main() {
      v_texCoord = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision highp float;
    varying vec2 v_texCoord;
    uniform float u_time;
    uniform vec2 u_resolution;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 uv = v_texCoord;
      vec3 bgColor = vec3(0.627, 0.125, 0.941);
      vec3 accentRed = vec3(0.8, 0.5, 0.9);

      // Nuvens de fumaça/tinta animadas
      float n = noise(uv * 3.0 + u_time * 0.2);
      n += 0.5 * noise(uv * 6.0 - u_time * 0.1);

      float smoke = smoothstep(0.4, 0.7, n);
      vec3 color = mix(bgColor, accentRed * 0.2, smoke * 0.5);

      // Textura de pincelada (brush stroke) dinâmica
      float stroke = noise(vec2(uv.x * 20.0, uv.y * 0.5) + u_time * 0.05);
      stroke *= noise(vec2(uv.y * 15.0, uv.x * 0.2) - u_time * 0.03);
      color = mix(color, accentRed * 0.1, stroke * 0.3);

      // Vinheta
      float vig = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5));
      color *= vig;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn("Shader compile error:", gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  const program = gl.createProgram();
  gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertexShaderSource));
  gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource));
  gl.linkProgram(program);
  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );

  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const timeUniform = gl.getUniformLocation(program, "u_time");
  const resolutionUniform = gl.getUniformLocation(program, "u_resolution");

  const startTime = performance.now();

  function render() {
    syncSize();
    gl.viewport(0, 0, canvas.width, canvas.height);

    const elapsed = (performance.now() - startTime) / 1000;
    gl.uniform1f(timeUniform, elapsed);
    gl.uniform2f(resolutionUniform, canvas.width, canvas.height);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();
