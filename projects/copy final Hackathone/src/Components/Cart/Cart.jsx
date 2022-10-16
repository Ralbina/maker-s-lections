import {
  Button,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import React, { useContext, useEffect } from "react";
import "../Cart/Cart.css";
import Input from "@mui/material/Input";
import { NavLink } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import cartIsEmpty from "../../assets/image/cartIsEmpty.png";

const Cart = () => {
  const { cart, getCart, deleteCartProduct, changeProductCount } =
    useContext(cartContext);

  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="cart">
      {Array.isArray(cart.products) && cart.products.length ? (
        <div>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Img</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Count</TableCell>
                  <TableCell align="right">SubPrice</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.products.map((elem) => (
                  <TableRow
                    key={elem.item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <CardMedia
                        className="cart-img"
                        component="img"
                        height="180"
                        image={elem.item.image}
                        alt={elem.item.name}
                      />
                    </TableCell>
                    <TableCell align="right">{elem.item.name}</TableCell>
                    <TableCell align="right">{elem.item.price}</TableCell>

                    <TableCell align="right">
                      <TextField
                        // sx={{...}} - для стилей
                        onChange={(e) =>
                          changeProductCount(elem.item.id, e.target.value)
                        }
                        onClick={() => {
                          +elem.count > 0
                            ? changeProductCount(elem.count - 1, elem.item.id)
                            : deleteCartProduct(elem.item.id);
                        }}
                        value={elem.count}
                        id="outlined-number"
                        label="Number"
                        type="number"
                      />
                    </TableCell>
                    <TableCell align="right">{elem.subPrice}</TableCell>
                    <div className="btnDeletCart">
                      <Button
                        className="btn"
                        onClick={() => deleteCartProduct(elem.item.id)}
                        variant="contained"
                      >
                        Удалить
                      </Button>
                    </div>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div className="cartEmpty">
          <div className="btnCart">
            <NavLink to="/list">
              <button className="buttonWrap">Go To Shop</button>
            </NavLink>
          </div>
          <div>
            <img src={cartIsEmpty} />
          </div>
        </div>
      )}
      <div className="totalPrice">
        <h4>Общая сумма: {cart.totalPrice}</h4>
        <NavLink to="/payment">
          <Button className="btn" variant="contained">
            Оформить заказ
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Cart;
