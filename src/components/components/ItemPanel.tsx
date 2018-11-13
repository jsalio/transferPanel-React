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
            <div className="scrollable" style={{ width: '250px', height: '200px', display: 'inline-block' }}>
                {this.state.source.length === 0 ? <div>no item to display</div> :
                    <ul>
                        {this.state.source.map((item, index) => {
                            return <li key={index} onClick={this.setActiveOrInactive}>{item.label}  {item.active ? 'X' : ''}</li>
                        })}
                    </ul>}
            </div>
        );
    }

    public addSourceComponent: any = (items: IPanelItem[]) => {
        const currentArray = this.state.source;
        items.forEach(item => {
            if (!currentArray.some(x => items.some(y => y.value === x.value))) {
                currentArray.push(item);
            }
        });
        this.setState({
            source: currentArray
        });
    }

    public removeSourceComponent: any = (items: IPanelItem[]) => {
        if (this.state.source.length <= 0) { return; }

        const targetIndexes = new Array<number>();
        const selectedItems = this.state.source.filter(x => items.find(y => y.value === x.value))
        const tempList = this.state.source;

        selectedItems.forEach(item => {
            if (this.state.source.find(x => x.value === item.value) !== undefined) {
                targetIndexes.push(this.state.source.indexOf(item))
            }
        });

        targetIndexes.forEach(x => {
            tempList.splice(x, 1);
        });

        this.setState({
            source: tempList
        });

    }

    public setActiveOrInactive: any = (selectedItem: any) => {
        const selectedOption = selectedItem.target.outerText;
        const tempArray = this.state.source;
        const selectedValue = tempArray.find((x: any) => x.label === selectedOption);
        if (selectedValue === undefined) { return; }
        const selectedIndex = tempArray.indexOf(selectedValue);
        selectedValue.active = !selectedValue.active;
        tempArray.splice(selectedIndex, 1, selectedValue);

        this.setState({
            source: tempArray
        });
    }
}