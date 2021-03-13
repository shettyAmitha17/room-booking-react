import React, {Component} from "react";
export default class RoomBook extends Component {

    render() {
        const adults = this.props.attributes.find(item => item.name === 'adults');
        const children = this.props.attributes.find(item => item.name === 'children');
        return (
            <div className="layout-row wrap justify-content-center flex-70 app-list-items">
                {this.props.attributes.map((list, i) => {

                    return (
                        <section className="w-30"
                                 data-testid={'item-' + i}
                                 key={list.id}>
                            <div className="card ma-16">
                                <img alt="Your list" src={list.image}
                                     className="list-item-image"/>
                                <div className="pa-4">
                                    <h5 className="ma-0 text-center">{list.name}</h5>
                                </div>
                                <div className="card-actions justify-content-center pa-4">
                                    <div className="layout-row justify-content-between align-items-center">
                                        <button disabled={list.selected < 1}
                                                data-testid="btn-quantity-subtract" onClick={()=>this.props.addRemoveItem(list, 'remove')}>
                                          -

                                        </button>
                                       <div>

                               
                                       {list.selected}
                                                       </div>

                                        <button disabled={(list.selected > 4 && list.name === 'room') || adults.selected + children.selected  === 20}
                                                data-testid="btn-quantity-add" onClick={()=>this.props.addRemoveItem(list, 'add')}>
                                           +
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </section>
                    )
                })}

            </div>

        );
    }
}

export const UpdateMode = {
    ADD: 1,
    SUBTRACT: 0
}
