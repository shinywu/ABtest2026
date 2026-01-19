declare module 'react' {
  export = React;
  export as namespace React;

  namespace React {
    type ReactNode = any;
    type FC<P = {}> = (props: P) => ReactNode;
    type Dispatch<A> = (value: A) => void;
    type SetStateAction<S> = S | ((prevState: S) => S);
    
    function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
    function useEffect(effect: () => void | (() => void), deps?: ReadonlyArray<any>): void;
    function createContext<T>(defaultValue: T): any;
    function useContext<T>(context: any): T;
    
    // Minimal types for JSX
    namespace JSX {
        type Element = any;
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
  }
}

declare module 'react/jsx-runtime' {
  export namespace JSX {
      type Element = any;
      interface IntrinsicElements {
          [elemName: string]: any;
      }
  }
}

declare module 'react-dom/client' {
  export function createRoot(container: Element | DocumentFragment | null): {
      render(children: React.ReactNode): void;
      unmount(): void;
  };
}

declare module 'lucide-react' {
  import { FC } from 'react';
  export interface IconProps {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
    className?: string;
    color?: string;
    strokeWidth?: number | string;
    style?: any;
    [key: string]: any;
  }
  export type Icon = FC<IconProps>;
  
  export const Menu: Icon;
  export const Bell: Icon;
  export const Settings: Icon;
  export const User: Icon;
  export const CheckCircle2: Icon;
  export const Search: Icon;
  export const PlayCircle: Icon;
  export const ChevronRight: Icon;
  export const MoreHorizontal: Icon;
  export const Plus: Icon;
  export const Sparkles: Icon;
  export const Filter: Icon;
  export const Download: Icon;
  export const RefreshCw: Icon;
  export const AlertCircle: Icon;
  export const Share2: Icon;
  export const HelpCircle: Icon;
  export const BarChart2: Icon;
  export const FileText: Icon;
  export const LayoutDashboard: Icon;
  export const ArrowRight: Icon;
  export const ShoppingCart: Icon;
  export const Video: Icon;
}
