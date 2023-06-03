import { OptionsType } from "../type";
declare global {
    interface JQuery {
        documentOutliner(target: string | NodeListOf<HTMLElement>, options: OptionsType): JQuery;
    }
}
