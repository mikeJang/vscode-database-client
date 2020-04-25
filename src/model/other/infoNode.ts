import { ModelType } from "../../common/constants";
import { Node } from "../interface/node";

export class InfoNode extends Node {
    public iconPath: string;
    public contextValue: string = ModelType.INFO;
    constructor(readonly label: string) {
        super(label)
    }

    public async getChildren(): Promise<Node[]> {
        return [];
    }
}
