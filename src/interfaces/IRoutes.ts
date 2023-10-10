export interface IRoute {
  label: string;
  route: string;
  role?: TROle[];
}

type TROle = "ESC" | "ADM" | "LEI";
