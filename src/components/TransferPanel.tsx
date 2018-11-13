import * as React from 'react';
import ItemPanel, { IPanelItem } from './components/ItemPanel';

const source = [
    { label: 'a b c', value: 'abc', active: true },
    { label: 'a b d', value: 'abd', active: true },
    { label: 'a b e', value: 'abe', active: true },
    { label: 'a b f', value: 'abf', active: true },
    { label: 'a b g', value: 'abg', active: true },
    { label: 'a b h', value: 'abh', active: true },
    { label: 'a b i', value: 'abi', active: true }
] as IPanelItem[];

export default class TransferPanel extends React.Component {
    private component: ItemPanel | undefined;
    private component2: ItemPanel | undefined;

    public render() {
        // tslint:disable:jsx-no-lambda
        return (<div>
            
            <ItemPanel id={0} source={source} onRef={self => this.component = self} />
            <ItemPanel id={1} source={source} onRef={self => this.component2 = self} />
            <div style={{display:'inline-block'}}>
                <button onClick={this.addItem}>add</button>
                <button onClick={this.removeItem}>remove</button>
            </div>
        </div>)
    }

    public addItem = (): any => {
        // tslint:disable-next-line:no-console
        console.log(this.component2);
        if (this.component === undefined) { return; }
        this.component.addSourceComponent([{ label: 'a b x', value: 'abx', active: false }])
    }

    public removeItem = (): any => {
        if (this.component === undefined) { return; }
        this.component.removeSourceComponent([{ label: 'a b x', value: 'abx', active: false }, { label: 'a b c', value: 'abc', active: true }])
    }
}