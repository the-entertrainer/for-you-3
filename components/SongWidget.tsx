"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { useDeepLink } from "@/hooks/useDeepLink";
import { LIQUID_SPRING } from "@/data/content";

interface SongWidgetProps {
  song: string;
  artworkUrl: string; // high quality image for immersion
  webUrl: string;
  songId: string;
  phrase?: string;
}

export function SongWidget({ song, artworkUrl, webUrl, songId, phrase }: SongWidgetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { openSong } = useDeepLink();

  // Refractive + strong magnification (-100 effect) WebGL shader
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { 
      premultipliedAlpha: false, 
      preserveDrawingBuffer: true,
      antialias: true 
    }) as WebGLRenderingContext | null;
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform float uStrength; // -100 style strong lens
      uniform float uRefraction; // glass index ~1.52

      void main() {
        vec2 uv = vUv;
        vec2 center = vec2(0.5);

        // Strong radial magnification (negative for convex lens feel)
        float dist = distance(uv, center);
        float magnification = 1.0 + uStrength * dist * dist * 1.8;

        // Refractive bend (simple normal offset simulating glass)
        vec2 offset = (uv - center) * uRefraction * 0.035 * (1.0 + sin(uTime * 0.7) * 0.015);
        vec2 refractedUv = center + (uv - center) * magnification + offset;

        // Subtle liquid wobble
        refractedUv += vec2(
          sin(uv.y * 9.0 + uTime * 1.8) * 0.004,
          cos(uv.x * 7.0 + uTime * 1.3) * 0.0035
        );

        vec4 color = texture2D(uTexture, refractedUv);

        // Edge darkening + chromatic feel for glass
        float edge = smoothstep(0.72, 0.98, dist);
        color.rgb *= mix(1.0, 0.65, edge * 0.7);

        // Specular liquid highlight that moves
        float spec = pow(1.0 - dist, 3.5) * (0.6 + sin(uTime * 2.2 + uv.x * 4.0) * 0.4);
        color.rgb += spec * vec3(0.95, 0.97, 1.0) * 0.55;

        gl_FragColor = color;
      }
    `;

    function createShader(type: number, source: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      return shader;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vertexShaderSource));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fragmentShaderSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionLoc = gl.getAttribLocation(program, "position");
    const textureLoc = gl.getUniformLocation(program, "uTexture");
    const timeLoc = gl.getUniformLocation(program, "uTime");
    const strengthLoc = gl.getUniformLocation(program, "uStrength");
    const refractionLoc = gl.getUniformLocation(program, "uRefraction");

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = artworkUrl;
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      imgRef.current = img;
      resize();
      requestAnimationFrame(render);
    };

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 1.15;
      canvas.height = rect.height * 1.15;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }

    let raf = 0;
    let startTime = Date.now();

    function render() {
      const t = (Date.now() - startTime) / 1000;
      gl!.uniform1f(timeLoc, t);
      gl!.uniform1f(strengthLoc, -0.92); // strong -100 magnification
      gl!.uniform1f(refractionLoc, 1.52); // real glass refractive index

      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

      raf = requestAnimationFrame(render);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [artworkUrl]);

  const handlePlay = () => {
    openSong({
      songId,
      webUrl,
      songTitle: song,
    });
  };

  return (
    <div 
      onClick={handlePlay}
      className="song-widget group relative flex h-[138px] w-full cursor-pointer select-none items-end overflow-hidden rounded-2xl border border-white/10 active:scale-[0.985] transition-transform"
      style={{ backgroundImage: `url(${artworkUrl})` }}
    >
      {/* The refractive + magnified glass layer */}
      <canvas 
        ref={canvasRef} 
        className="shader-canvas absolute inset-0" 
      />

      <div className="relative z-10 flex w-full items-center gap-3 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow-inner backdrop-blur">
          <Play className="h-4 w-4 translate-x-[1px] fill-black" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10px] tracking-[3px] text-white/60">NOW PLAYING</div>
          <div className="truncate text-lg font-semibold leading-none tracking-[-0.3px] text-white">
            {song}
          </div>
          {phrase && (
            <div className="mt-1 line-clamp-1 text-[11px] text-white/75">{phrase}</div>
          )}
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium text-white/80 backdrop-blur">
          <span>OPEN IN</span>
          <ExternalLink className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}
