import React, { Component } from 'react';
import './styles/App.scss';
import roomImg from './assets/img/room.jpeg';
import childrenImg from './assets/img/children.jpeg';
import adultsImg from './assets/img/adults.jpeg';
import RoomBook from "./components/room-book";
import Cart from "./components/cart";



class App extends Component {
    constructor() {
        super();
        const attributes = [...ComponentLists].map((list, index) => {
            list.image = list.img;
            list.selected = 0;
            return list;
        });
        this.state = {
            cart: {
                items: []
            },
            attributes
        }
    }
    addRemoveItem = (items, identifier) => {
        const attributes = [...this.state.attributes].map((selectedItem, index) => {

            if (selectedItem.name === items.name) {
                var adults = this.state.attributes.find((item) => item.name === 'adults');
                var children = this.state.attributes.find((item) => item.name === 'children')
                var room = this.state.attributes.find((item) => item.name === 'room')
                if (identifier === 'add') {
                    selectedItem.selected = items.selected + 1;
                }
                if (identifier === 'remove') {
                    selectedItem.selected = items.selected - 1;
                }
                console.log(children.selected, 'children.selected')

                switch (items.name) {
                    case 'room':
                        if (identifier === 'remove' && children.selected > 4) {
                            children.selected = children.selected - 3;
                            adults.selected = adults.selected - 1;
                            console.log(children.selected, 'children.selected')
                        } else {
                            children.selected = 0;
                            adults.selected = selectedItem.selected * 4;
                        }

                        break;
                    case 'adults':
                        if (identifier === 'add') {
                            if ((adults.selected === 1 || (adults.selected + children.selected) % 4 === 1) && room.selected !== 5) {
                                room.selected++
                            }
                        } else {
                            if (children.selected > 4) {
                                children.selected = children.selected - 3;
                            } else {
                                children.selected = 0;
                            }
                            if (adults.selected === 0 || (adults.selected + children.selected) % 4 === 0) {
                                room.selected--
                            }
                        }

                        break;
                    case 'children':
                        if (identifier === 'add') {
                            if (adults.selected === 0 || (adults.selected + selectedItem.selected) % 4 === 1) {
                                adults.selected++
                            }
                            if (room.selected !== 5 && (adults.selected + selectedItem.selected) > 0) {
                                room.selected++
                            }
                        } else {
                            if (adults.selected === 0 || (adults.selected + selectedItem.selected) % 4 === 0) {
                                room.selected--
                            }
                        }

                        break;
                    default:
                        break;
                }
            }

            return selectedItem;
        });
        this.updateCartItems(attributes);
    }

    updateCartItems = (attributes) => {
        const items = [...this.state.attributes].filter(selectedItem => selectedItem.selected > 0);
        this.setState({ cart: { items }, attributes });
    }
    render() {
        return (
            <div>
                <div className="room-component">
                    <h2 className="layout-row align-items-center justify-content-center px-16">Room Booking</h2>
                    <RoomBook attributes={this.state.attributes} addRemoveItem={this.addRemoveItem} />
                    <Cart cart={this.state.cart} />
                </div>
            </div>
        );
    }
}

export const ComponentLists = [
    { name: 'room', img: roomImg }, { name: 'adults', img: adultsImg }, { name: 'children', img: childrenImg }]
export default App;
