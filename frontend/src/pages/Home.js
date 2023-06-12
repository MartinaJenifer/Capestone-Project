import axios from "../axios";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 20);
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);
    return (
        <div>
            
            <img src = "https://s3.amazonaws.com/thumbnails.venngage.com/template/944e3912-5973-4b05-a2ce-8654fbdc7f43.png" style={{width:"100%",height:"500px"}}/>
            
            <div className="featured-products-container container mt-4">
                <h2>Explore Your favorite Recipes</h2>
                
                <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.map((product) => (
                        <ProductPreview {...product} />
                        
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default Home;
