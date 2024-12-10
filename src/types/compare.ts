export interface CompareI18n {
  title: string;
  description: string;
  categoryLabels: Record<string, string>;
  selectProducts: string;
  features: {
    driver?: string;
    anc?: string;
    battery?: string;
    flightTime?: string;
    range?: string;
    camera?: string;
    [key: string]: string | undefined;
  };
}