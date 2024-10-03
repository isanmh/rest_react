import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Container, Figure, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { Api, Url } from "../config/Api";

const Edit = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [previewName, setPreviewName] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProduct();
  }, []);

  // edit Product
  const getProduct = async () => {
    const res = await axios.get(`${Api}/${id}`);
    console.log(res.data.data);
    setName(res.data.data.name);
    setDescription(res.data.data.description);
    setPrice(res.data.data.price);
    setPreview(`${Url}/${res.data.data.image}`);
    setPreviewName(res.data.data.image);
  };

  const loadImage = (e) => {
    const img = e.target.files[0];
    setImage(img);
    setPreview(URL.createObjectURL(img));
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("_method", "PUT");
    try {
      await axios.post(`${Api}/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      // with sweetalert2
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Data berhasil diupdate",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/index-list");
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Container>
      {/* errors */}
      <h3 className="text-center my-3">Update Product</h3>
      <hr />
      <div className="mt-3 d-lg-flex flex-lg-row justify-content-between d-sm-flex flex-sm-column">
        <Col className="col-lg-6">
          <form onSubmit={updateProduct}>
            <div className="form-group my-3">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name ? (
                <div className="text-danger">
                  {errors.name.map((error) => (
                    <small key={error}>{error}</small>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group my-3">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description ? (
                <div className="text-danger">
                  {errors.description.map((error) => (
                    <small key={error}>{error}</small>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group my-3">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price ? (
                <div className="text-danger">
                  {errors.price.map((error) => (
                    <small key={error}>{error}</small>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group my-3">
              <label>Image</label>
              <input
                type="file"
                className="form-control"
                onChange={loadImage}
              />
            </div>
            {/* button submit */}
            <button type="submit" className="btn btn-primary">
              Update Product
            </button>
            {/* back */}
            <button
              type="button"
              className="btn btn-outline-secondary mx-2"
              onClick={() => navigate("/index-list")}
            >
              Back
            </button>
          </form>
        </Col>
        {/* image preview */}
        <Col className="col-lg-5">
          {preview ? (
            <Figure>
              <Figure.Image
                // width={171}
                // height={200}
                width="100%"
                style={{ height: 300 }}
                alt={previewName}
                src={preview}
                className="img-thumbnail"
              />
              <Figure.Caption>{previewName}</Figure.Caption>
            </Figure>
          ) : (
            ""
          )}
        </Col>
      </div>
    </Container>
  );
};

export default Edit;
