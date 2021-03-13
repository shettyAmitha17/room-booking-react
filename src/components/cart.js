import React, {Component} from "react";


export default class Cart extends Component {

    render() {
        return (
            <div className="card my-16 mr-25 flex-100">
                <section className="layout-row align-items-center justify-content-center px-16">
                    <h4>Your Room</h4>
                </section>
                <div className="divider"/>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Item</th>
                        <th className="numeric">Selected</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.cart.items.map((item, idx) => {
                            return (
                                <tr data-testid={'cart-item-' + idx}
                                    key={idx + 1}>
                                    <td>{idx + 1}.</td>
                                    <td className="name" data-testid="cart-item-name">{item.name}</td>
                                    <td className="numeric quantity" data-testid="cart-item-quantity">
                                        {item.selected}
                                    </td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>
            </div>

        );
    }
}
