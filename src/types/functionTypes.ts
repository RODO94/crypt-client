import { SyntheticEvent } from "react";

export type HandleEvent = <T extends SyntheticEvent>(event: T) => void;
