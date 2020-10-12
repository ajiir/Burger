import React from "react";
import Burger from "../../components/Burger";
import { connect } from "react-redux";
import ContactData from "../../components/ContactData";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import { Route } from "react-router-dom";

class ShippingPage extends React.Component {
  cancelOrder = () => {
    this.props.history.goBack();
  };

  showContactData = () => {
    this.props.history.replace("/ship/contact");
  };

  render() {
    return (
      <div className={css.ShippingPage}>
        <p style={{ fontSize: "20px" }}>
          <strong>ТАНЫ ЗАХИАЛГА АМТТАЙ БАЙХ БОЛНО.</strong>
        </p>
        <p style={{ fontSize: "20px" }}>
          <strong>Дүн : {this.props.price}₮</strong>
        </p>
        <Burger />
        <Button
          daragdsan={this.cancelOrder}
          btnType="Danger"
          text="ЗАХИАЛГЫГ ЦУЦЛАХ"
        ></Button>
        <Button
          daragdsan={this.showContactData}
          btnType="Success"
          text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"
        ></Button>
        <Route path="/ship/Contact" component={ContactData}>
          <ContactData />
        </Route>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
  };
};

export default connect(mapStateToProps)(ShippingPage);
