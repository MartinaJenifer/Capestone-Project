import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, {useEffect} from "react";
import { Alert, Col, Container, Nav, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import {  useRemoveFromCartMutation } from "../services/appApi";
import "./CartPage.css";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import ProductPreview from "../components/ProductPreview";
// import {useNavigate} from "react-router-dom"

const stripePromise = loadStripe("your_stripe_publishable_key");

function CartPage() {
    const Navigate = useNavigate()
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);
    
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
    const picture = ()=>{
        Navigate(`/product/64840b8aace0cd876fbad3f7`)
    }
    
    const imagefetch =async()=>{
        
        try {
            const pic = await fetch("/product:id", {
                method:"GET",
            headers:{
               Accept:"application/json",
               "Content-Type":"application/json"
            },
            })
            const data = pic.json()
            if(!pic.status === 400){
               const id = data.product
            }else{
                console.log("error")
            }
            
        } catch (error) {
            console.log(Error)
        }
    }
    useEffect(()=>{
        imagefetch()
     })
    return (
        <Container style={{ minHeight: "95vh" }} className="cart-container">
            <Row>
                <Col>
                    <h1 className="pt-2 h3">Recipe cart</h1>
                    {cart.length == 0 ? (
                        <Alert variant="info">Recipe saved is empty. Add Recipes to your Saved</Alert>
                    ) : (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </Col>
         
                {cart.length > 0 && (
                    <Col md={5}>
                        <>
                            <Table responsive="sm" className="cart-table">
                                <thread>
                                    <tr>
                                        <th>Recipe</th>
                                    </tr>
                                </thread>
                                <tbody>
                                    
                                    {cart.map((item) => (
                                        <tr>
                                        <td>
                                    {!isLoading && <i className="fa fa-times" style={{ marginRight: 10, cursor: "pointer" }} onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}></i>}
                                    <img src={item.pictures[0].url} style={{ width: 100, height: 100, objectFit: "cover" }} onClick={picture}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </Table>
                            
                    </>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default CartPage;
