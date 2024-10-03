import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { Api, Url } from "../config/Api";

const IndexList = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const res = await axios.get(Api);
    console.log(res.data.data);
    setProduct(res.data.data);
  };

  // const deleteProduct = async (productId) => {
  //   try {
  //     await axios.delete(`${Api}/${productId}`);
  //     getProduct();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // delete product with sweetalert2
  const deleteProduct = async (productId) => {
    try {
      await Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data yang dihapus tidak bisa dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log("delete id :", productId);
          await axios.delete(`${Api}/${productId}`);
          getProduct();
          Swal.fire("Deleted!", "File anda berhasil dihapus.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-center">Product List</h1>
        <Link
          variant="primary"
          className="btn btn-outline-primary my-3"
          to={"/create"}
        >
          Add Product
        </Link>
      </div>
      <hr />
      <Row>
        {product.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div className="card mb-4 shadow">
              <div className="card-body">
                {/* gambar */}
                <div className="card-img-top">
                  <img
                    src={`${Url}/${item.image}`}
                    alt={item.image}
                    className="img-thumbnail"
                    style={{ height: 200 }}
                    width="100%"
                  />
                </div>
                <h5 className="card-title">{item.name}</h5>
                <small className="card-text">{item.description}</small>
                <p className="card-text">{item.price}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <Link
                      to={`/edit/${item.id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <Button
                      onClick={() => deleteProduct(item.id)}
                      variant="danger"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                  <small className="text-muted">{item.id}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default IndexList;
