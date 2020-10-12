import React from "react";
import { connect } from "react-redux";
import Button from "../General/Button";
import Spinner from "../General/Spinner";
import css from "./style.module.css";
import axios from "../../axios-order";
import { withRouter } from "react-router-dom";
import * as action from "../../redux/actions/orderActions";

class ContactData extends React.Component {
  state = {
    name: null,
    city: null,
    street: null,
  };

  changeName = (e) => {
    this.setState({ name: e.target.value });
  };
  changeStreet = (e) => {
    this.setState({ street: e.target.value });
  };
  changeCity = (e) => {
    this.setState({ city: e.target.value });
  };

  componentDidUpdate() {
    if (
      this.props.newOrderStatus.finished &&
      !this.props.newOrderStatus.error
    ) {
      this.props.history.replace("/orders");
    }
  }



  saveOrder = () => {
    const newOrder = {
      userId: this.props.userId,
      orts: this.props.ingredients,
      dun: this.props.price,
      hayag: {
        name: this.state.name,
        city: this.state.city,
        street: this.state.street,
      },
    };

    this.props.saveOrderAction(newOrder);
  };

  render() {
    return (
      <div className={css.ContactData}>
        Дүн : {this.props.price}₮,
        <div>
          {this.props.newOrderStatus.error &&
            `Захиалгыг хадгалах явцад алдаа гарлаа : ${this.props.newOrderStatus.error}`}
        </div>
        {this.props.newOrderStatus.saving ? (
          <Spinner />
        ) : (
            <div>
              <input
                onChange={this.changeName}
                type="text"
                name="name"
                placeholder="Таны нэр"
              ></input>
              <input
                onChange={this.changeStreet}
                type="text"
                name="street"
                placeholder="Таны гэрийн хаяг"
              ></input>
              <input
                onChange={this.changeCity}
                type="text"
                name="city"
                placeholder="Таны хот"
              ></input>
              <Button
                text="ИЛГЭЭХ"
                btnType="Success"
                daragdsan={this.saveOrder}
              />
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
    ingredients: state.burgerReducer.ingredients,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.signUpReducer.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderAction: (newOrder) => dispatch(action.saveOrder(newOrder)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
