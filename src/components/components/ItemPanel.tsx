import * as React from 'react';

export interface IItemPanelProps {
    source: IPanelItem[];
    onRef: (self: ItemPanel | undefined) => ItemPanel | undefined;
    id?: any;
}

interface IItemPanelState {
    source: IPanelItem[];
}

export interface IPanelItem {
    label: string;
    value: any;
    active: boolean;
}

export default class ItemPanel extends React.Component<IItemPanelProps, IItemPanelState>{

    constructor(props: IItemPanelProps) {
        super(props)
        this.state = {
            source: this.props.source
        }
    }

    public componentDidMount() {

        this.props.onRef(this);
        // tslint:disable-next-line:no-console
        console.log(this.props.onRef);
    }

    public componentWillUnmount() {
        this.props.onRef(undefined);
    }

    public render() {
        return (
            <div style={{ width: '250px', height: '200px', display: 'inline-block' }}>
                <ul>
                    {this.state.source.map((item, index) => {
                        return <li key={index}>{item.label}</li>
                    })}
                </ul>
            </div>
        );
    }

    public addSourceComponent: any = (items: IPanelItem[]) => {
        const currentArray = this.state.source;
        items.forEach(item => {
            currentArray.push(item);
        });
        this.setState({
            source: currentArray
        });
    }

    public removeSourceComponent: any = (items: IPanelItem[]) => {
        if (this.state.source.length <= 0) { return; }

        const targetIndexes = new Array<number>();

        const t = this.state.source.filter(x => items.find(y => y.value === x.value))

        t.forEach(item => {
            // tslint:disable-next-line:no-console
            console.log(item);
            if (this.state.source.find(x => x.value === item.value) !== undefined) {
                targetIndexes.push(this.state.source.indexOf(item))
            }
        });

        const tempList = this.state.source;
        targetIndexes.forEach(x => {
            tempList.splice(x, 1);
        });

        this.setState({
            source: tempList
        });

    }
}