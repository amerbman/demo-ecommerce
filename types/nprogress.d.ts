// types/nprogress.d.ts
declare module 'nprogress' {
    interface NProgressOptions {
      minimum?: number;
      easing?: string;
      speed?: number;
      trickle?: boolean;
      trickleSpeed?: number;
      showSpinner?: boolean;
      barSelector?: string;
      spinnerSelector?: string;
      parent?: string;
      template?: string;
    }
    interface NProgress {
      configure(opts: NProgressOptions): NProgress;
      start(): NProgress;
      done(force?: boolean): NProgress;
      set(n: number): NProgress;
      inc(amount?: number): NProgress;
      trickle(): NProgress;
      remove(): void;
    }
    const nprogress: NProgress;
    export default nprogress;
  }
  