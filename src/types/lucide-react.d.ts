declare module "lucide-react" {
  import * as React from "react";

  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
    size?: number | string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  export type Icon = React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;

  // Exportação genérica (resolve qualquer ícone)
  export const Search: Icon;
  export const LucideIcon: Icon;

  const icons: Record<string, Icon>;
  export default icons;
}
