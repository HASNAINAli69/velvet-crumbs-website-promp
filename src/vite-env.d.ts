/// <reference types="vite/client" />

declare module 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js' {
  const TubesCursor: (canvas: HTMLCanvasElement, options?: Record<string, unknown>) => {
    tubes: {
      setColors: (colors: string[]) => void;
      setLightsColors: (colors: string[]) => void;
    };
    dispose: () => void;
  };
  export default TubesCursor;
}
