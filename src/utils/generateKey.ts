import { uniqueId } from "lodash";

type GenerateKey = () => string;

export const generateKey: GenerateKey = () => uniqueId("k");
