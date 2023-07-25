import {createContext} from "react";
import {DemoConstant, DEMO_CONSTANTS} from "../const";

const initialState: DemoConstant = DEMO_CONSTANTS.webDemo;
export const DemoStatesContext = createContext<DemoConstant>(initialState);
