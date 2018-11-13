import * as React from 'react';
import ItemPanel, { IPanelItem } from './components/ItemPanel';

const varsource = [
    { label: 'a b c', value: 'abc', active: true },
    { label: 'a b d', value: 'abd', active: false },
    { label: 'a b e', value: 'abe', active: false },
    { label: 'a b f', value: 'abf', active: false },
    { label: 'a b g', value: 'abg', active: false },
    { label: 'a b h', value: 'abh', active: false },
    { label: 'a b i', value: 'abi', active: false }
] as IPanelItem[];

const varsource2 =[]as IPanelItem[]; 

export interface Istate{
    source: IPanelItem[];
    source2: IPanelItem[];
}

export default class TransferPanel extends React.Component<any, Istate> {
    private component: ItemPanel | undefined;
    private component2: ItemPanel | undefined;

    constructor(props: any){
        super(props);
        this.state ={
            source:varsource,
            source2: varsource2
        }
    }

    public render() {
        // tslint:disable:jsx-no-lambda
        return (<div>
            <ItemPanel id={0} source={this.state.source} onRef={self => this.component = self} />
            <div style={{ display: 'inline-block' }}>
                {/* <button onClick={this.moveLeft}>move left</button> */}
                <button onClick={() => this.addItem('<')}>{'<'}</button>
                <button onClick={() => this.addItem('>')}>{'>'}</button>
            </div>
            <ItemPanel id={1} source={this.state.source2} onRef={self => this.component2 = self} />

        </div>)
    }

    public addItem = (direction: string): any => {
        // tslint:disable-next-line:no-debugger
        debugger
        if (this.component === undefined || this.component2 === undefined) { return; }
        
        if (direction === '>'){
            const selected = this.state.source.filter(x => x.active);
            this.component2.addSourceComponent(selected);
            this.removeItem(selected,direction);
            
        } else {
            const selected = this.state.source2.filter(x => x.active);
            this.component.addSourceComponent(selected);
            this.removeItem(selected,direction);
        }
        this.updateComponent();
    }

    public removeItem = (item:IPanelItem[],direction: string): any => {
        if (this.component === undefined || this.component2 === undefined) { return; }
        if (direction === '>'){
            this.component.removeSourceComponent(item)
        }else {
            this.component2.removeSourceComponent(item)
        }
    }

    private updateComponent():void {
        if (this.component === undefined || this.component2 === undefined) { return; }
        this.setState({
            source : this.component.state.source,
            source2 : this.component2.state.source
        })
    }
}