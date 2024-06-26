import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../../components/allPageComponents/breadCrumbs";
import Color from "./Color";
import TabsMemory from "./TabsMemory";
import DetailCard from "./DetailCard";
import DetailCardIcon1 from "./icon/detailCardIcon1.svg";
import DetailCardIcon2 from "./icon/detailCardIcon2.svg";
import DetailCardIcon3 from "./icon/detailCardIcon3.svg";
import DetailCardIcon4 from "./icon/detailCardIcon4.svg";
import DetailCardIcon5 from "./icon/detailCardIcon5.svg";
import DetailCardIcon6 from "./icon/detailCardIcon6.svg";
import AddToCard from "../../components/allPageComponents/AddToCard";
import CargoIcon1 from "./icon/cargoIcon1.svg"
import CargoIcon2 from "./icon/cargoIcon2.svg"
import CargoIcon3 from "./icon/cargoIcon3.svg"
import Cargo from "./cargo";
import Line from "./Line.jsx"
import { FaStar } from "react-icons/fa";
import Rating from "react-rating-stars-component";
import UserComment from "./UserComment.jsx";
import DiscountProducts from "./DiscountProducts.jsx";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ProductDetailsPage = ({ handleAddToCart, product, setProduct }) => {

  const { id } = useParams();
  const [users, setUsers] = useState(null);
  const [brand, setBrand] = useState(null);
  const [comments, setComments] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [rating, setRating] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [comment, setComment] = useState(false);
  const [leaveComment, setLeaveComment] = useState("");
  const [commentCount, setCommentCount] = useState(3);
  const [yellowWidth, setYellowWidth] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [averageRatings, setAverageRatings] = useState(0);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites)[id] || false : false;
  });

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const userId = userDetails?.id;


  const addProductToLastTraveled = async (userId, product) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}users/${userId}`);
      const userData = response.data;

      if (!product || !product.id) {
        throw new Error("Invalid product or product id");
      }

      userData.lastTraveledProducts.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        image: product.productImage,
        price: product.price,
        color: product.color,
        storage: product.storage,
        mainCamera: product.mainCamera,
        cpu: product.cpu,
      });

      await axios.put(`${import.meta.env.VITE_API_URL}users/${userId}`, userData);
    } catch (error) {
      console.error('Error adding product to last traveled:', error);
    }
  }

  const handleRatingChange = (newRating) => {
    console.log('Selected rating:', newRating);
    setRating(newRating);
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}products/${id}`)
      .then(response => {
        setProduct(response.data);
        setBrand(response.data.brand);
        setAverageRatings(response.data.rating.value);
        setComments(response.data.comments);
        setYellowWidth(response.data.rating.count);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
    addProductToLastTraveled(userId, product);
  }, [id, setProduct]);

  if (!product) {
    return <div>Loading...</div>;
  }


  const totalVotes = Object.values(yellowWidth).reduce((acc, curr) => acc + curr, 0);

  const yellowWidth5 = (yellowWidth["5"] / totalVotes) * 664;
  const yellowWidth4 = (yellowWidth["4"] / totalVotes) * 664;
  const yellowWidth3 = (yellowWidth["3"] / totalVotes) * 664;
  const yellowWidth2 = (yellowWidth["2"] / totalVotes) * 664;
  const yellowWidth1 = (yellowWidth["1"] / totalVotes) * 664;

  const handleAddToCartClick = () => {
    if (isButtonDisabled) return;
  
    handleAddToCart(id);
    setIsButtonDisabled(true); 
    toast.success(`${product.name} added to cart.`, {
      position: "bottom-left",
      autoClose: 1350,
      hideProgressBar: true,
      onClose: () => {
        setIsButtonDisabled(false);
      }
    });
  };
  

  const handleLeaveComment = async () => {
    if (!rating) {
      toast.error("Please select a rating before submitting your comment.", {
        position: "bottom-left",
        autoClose: 1350,
        hideProgressBar: true,
      });
      return;
    }

    const newComment = {
      user_id: userId,
      description: leaveComment,
      rating: rating,
      userName: userDetails.userName,
      avatarUrl: userDetails.avatarUrl,
    };

    const updatedComments = [...comments, newComment];
    const totalRating = updatedComments.reduce((acc, comment) => acc + comment.rating, 0);
    const average = (totalRating / updatedComments.length).toFixed(1);

    const updatedYellowWidth = {
      ...yellowWidth,
      [rating]: (yellowWidth[rating] || 0) + 1,
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}products/${id}`, {
        ...product,
        comments: updatedComments,
        reviews: updatedComments.length,
        rating: {
          value: average,
          count: updatedYellowWidth,
        },
      });

      setComments(updatedComments);
      setAverageRating(average);
      window.location.href = `/catalog/smartphones/productdetails/${id}`;
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToWishlist = async () => {
    const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}users/${userId}`);
    const user = userResponse.data;

    if (!isFavorite) {
      user.favoriteProducts.push({ id: id, brand: product.brand, name: product.name, image: product.productImage, color: product.color, price: product.price, storage: product.storage, mainCamera: product.mainCamera, cpu: product.cpu, ...users });
      await axios.put(`${import.meta.env.VITE_API_URL}users/${userId}`, user);
      toast.success("Added to favorites", {
        position: "top-right",
        autoClose: 400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  }



  const breadcrumbsHierarchy = [
    { name: "Home", link: "/" },
    { name: "Catalog", link: "/catalog" },
    { name: "Smartphones", link: "/catalog/smartphones" },
    { name: brand, link: `/catalog/smartphones/${brand}` },
    { name: product.name, link: `/catalog/smartphones/${brand}/${id}` }
  ];


  return (
    <>
      <Breadcrumbs categories={breadcrumbsHierarchy} />
      <div className="main-info">
        <div className="product-image-container">
          <div className="image-4">
            <img src={product.productImage} alt="" />
            <img src={product.productImage} alt="" />
            <img src={product.productImage} alt="" />
            <img src={product.productImage} alt="" />
          </div>
          <img className='product-image' src={product.productImage} alt="" />
        </div>
        <div className="main-info-content">
          <div className="main-info-title">
            <h1>{product.brand} {product.name}</h1>
            <div className="main-info-price">
              <span>${product.price}</span>
              <svg width="72" height="21" viewBox="0 0 72 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.0625 20.6055H6.49219V19.0352C4.90625 18.918 3.63281 18.4375 2.67188 17.5938C1.71875 16.75 1.23828 15.6758 1.23047 14.3711H3.23438C3.29688 15.1523 3.61328 15.793 4.18359 16.293C4.75391 16.793 5.52344 17.1016 6.49219 17.2188V11.125L5.55469 10.8672C4.29688 10.5391 3.32812 10 2.64844 9.25C1.97656 8.5 1.64062 7.58203 1.64062 6.49609C1.64062 5.21484 2.07422 4.16406 2.94141 3.34375C3.80859 2.52344 4.99219 2.03906 6.49219 1.89062V0.25H8.0625V1.87891C9.52344 2.00391 10.6992 2.48438 11.5898 3.32031C12.4883 4.15625 12.957 5.20703 12.9961 6.47266H11.0039C10.9805 5.74609 10.6992 5.12891 10.1602 4.62109C9.62891 4.10547 8.92969 3.79688 8.0625 3.69531V9.42578L9.05859 9.67188C10.4961 10.0547 11.5586 10.6133 12.2461 11.3477C12.9414 12.082 13.2891 13.0391 13.2891 14.2188C13.2891 15.6016 12.8281 16.7148 11.9062 17.5586C10.9922 18.4023 9.71094 18.8906 8.0625 19.0234V20.6055ZM11.2617 14.3828C11.2617 13.6094 11.0039 12.9844 10.4883 12.5078C9.97266 12.0312 9.16406 11.6758 8.0625 11.4414V17.2539C9.07812 17.1992 9.86328 16.9219 10.418 16.4219C10.9805 15.9219 11.2617 15.2422 11.2617 14.3828ZM3.65625 6.37891C3.65625 7.78516 4.60156 8.6875 6.49219 9.08594V3.69531C5.67188 3.74219 4.99219 4.01953 4.45312 4.52734C3.92188 5.02734 3.65625 5.64453 3.65625 6.37891ZM20.9348 19V4.32812H20.888L16.4114 7.55078V5.32422L20.9114 2.08984H22.9739V19H20.9348ZM36.022 19V15.4844H27.5259V13.5742C28.2525 12.2227 29.1744 10.6797 30.2916 8.94531C31.4166 7.21094 32.9673 4.92578 34.9439 2.08984H38.0611V13.6328H40.4517V15.4844H38.0611V19H36.022ZM29.6119 13.5859V13.6328H36.022V3.84766H35.9869C33.0259 8.07422 30.9009 11.3203 29.6119 13.5859ZM48.6131 19.2812C47.1756 19.2812 45.9452 18.8828 44.9217 18.0859C43.8983 17.2891 43.2577 16.2266 42.9998 14.8984H45.1444C45.3709 15.6641 45.8006 16.2812 46.4334 16.75C47.0662 17.2109 47.8006 17.4414 48.6366 17.4414C50.0428 17.4414 51.1327 16.832 51.9061 15.6133C52.6873 14.3867 53.0936 12.6484 53.1248 10.3984H53.1131H53.0897C52.7303 11.2344 52.1209 11.9062 51.2616 12.4141C50.41 12.9141 49.4452 13.1641 48.367 13.1641C46.7577 13.1641 45.4178 12.6328 44.3475 11.5703C43.285 10.5078 42.7537 9.17578 42.7537 7.57422C42.7537 5.90234 43.3162 4.52344 44.4412 3.4375C45.5741 2.34375 47.0077 1.79688 48.742 1.79688C50.0155 1.79688 51.1366 2.12891 52.1053 2.79297C53.0741 3.44922 53.8162 4.38281 54.3319 5.59375C54.8866 6.875 55.1639 8.42969 55.1639 10.2578C55.1639 13.1094 54.5897 15.3281 53.4412 16.9141C52.2928 18.4922 50.6834 19.2812 48.6131 19.2812ZM48.7303 11.3125C49.8475 11.3125 50.7772 10.957 51.5194 10.2461C52.2616 9.53516 52.6327 8.64062 52.6327 7.5625C52.6327 6.47656 52.2577 5.5625 51.5077 4.82031C50.7655 4.07031 49.8514 3.69531 48.7655 3.69531C47.6795 3.69531 46.7616 4.06641 46.0116 4.80859C45.2616 5.54297 44.8866 6.44141 44.8866 7.50391C44.8866 8.60547 45.2498 9.51562 45.9764 10.2344C46.703 10.9531 47.6209 11.3125 48.7303 11.3125ZM63.7003 19.2812C62.2628 19.2812 61.0323 18.8828 60.0089 18.0859C58.9855 17.2891 58.3448 16.2266 58.087 14.8984H60.2316C60.4581 15.6641 60.8878 16.2812 61.5206 16.75C62.1534 17.2109 62.8878 17.4414 63.7238 17.4414C65.13 17.4414 66.2198 16.832 66.9933 15.6133C67.7745 14.3867 68.1808 12.6484 68.212 10.3984H68.2003H68.1769C67.8175 11.2344 67.2081 11.9062 66.3488 12.4141C65.4972 12.9141 64.5323 13.1641 63.4542 13.1641C61.8448 13.1641 60.505 12.6328 59.4347 11.5703C58.3722 10.5078 57.8409 9.17578 57.8409 7.57422C57.8409 5.90234 58.4034 4.52344 59.5284 3.4375C60.6613 2.34375 62.0948 1.79688 63.8292 1.79688C65.1027 1.79688 66.2238 2.12891 67.1925 2.79297C68.1613 3.44922 68.9034 4.38281 69.4191 5.59375C69.9738 6.875 70.2511 8.42969 70.2511 10.2578C70.2511 13.1094 69.6769 15.3281 68.5284 16.9141C67.38 18.4922 65.7706 19.2812 63.7003 19.2812ZM63.8175 11.3125C64.9347 11.3125 65.8644 10.957 66.6066 10.2461C67.3488 9.53516 67.7198 8.64062 67.7198 7.5625C67.7198 6.47656 67.3448 5.5625 66.5948 4.82031C65.8527 4.07031 64.9386 3.69531 63.8527 3.69531C62.7667 3.69531 61.8488 4.06641 61.0988 4.80859C60.3488 5.54297 59.9738 6.44141 59.9738 7.50391C59.9738 8.60547 60.337 9.51562 61.0636 10.2344C61.7902 10.9531 62.7081 11.3125 63.8175 11.3125Z" fill="#A0A0A0" />
                <path d="M0 11.6875H71.3175V13.0938H0V11.6875Z" fill="#A0A0A0" />
              </svg>
            </div>
          </div>
          <div className="main-content-info">
            <div className="select-color-container">
              <span>Select color: </span>
              <div className="selects-color">
                <Color color="#000000" />
                <Color color="#781DBC" />
                <Color color="#E10000" />
                <Color color="#E1B000" />
                <Color color="#E8E8E8" />
              </div>
            </div>
            <div className="tabs-memory-container">
              <TabsMemory title="128GB" />
              <TabsMemory title="256GB" />
              <TabsMemory title="512GB" />
              <TabsMemory title="1TB" />
            </div>
            <div className="detail-card-container">
              <DetailCard icon={DetailCardIcon1} title="Screen size" detail={product.screenSize} />
              <DetailCard icon={DetailCardIcon2} title="CPU" detail={product.cpu} />
              <DetailCard icon={DetailCardIcon3} title="Number of Cores" detail={product.numberOfCores} />
              <DetailCard icon={DetailCardIcon4} title="Main camera" detail={product.mainCamera} />
              <DetailCard icon={DetailCardIcon5} title="Front camera" detail={product.frontCamera} />
              <DetailCard icon={DetailCardIcon6} title="Battery capacity" detail={product.batteryCapacity} />
            </div>
            <p>Enhanced capabilities thanks toan enlarged display of 6.7 inchesand work without rechargingthroughout the day. Incredible photosas in weak, yesand in bright lightusing the new systemwith two cameras <span>more...</span></p>
          </div>
          <div className="add-to-card-container">
            <AddToCard color="#000000" background="#FFFFFF" title="Add to Wishlist" onClick={handleAddToWishlist} />
            <AddToCard color="#FFFFFF" background="#000000" title="Add to Card" onClick={handleAddToCartClick} cursor={isButtonDisabled === true ? "not-allowed" : "pointer"} />
          </div>
          <div className="cargo-icon-container">
            <Cargo icon={CargoIcon1} title="Free Delivery" details="1-2 day" />
            <Cargo icon={CargoIcon2} title="In Stock" details="Today" />
            <Cargo icon={CargoIcon3} title="Guaranteed" details="1 year" />
          </div>
        </div>
      </div>



      <div className="product-details-detail-container">
        <div className="product-details-detail">
          <h2 className="header-text">
            Details
          </h2>
          <p>Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions. And how good that in such realities Apple everything is fine with displays. Both critics and mass consumers always praise the quality of the picture provided by the products of the Californian brand. And last year's 6.7-inch Retina panels, which had ProMotion, caused real admiration for many.</p>
          <div className="product-detail-content">
            <div className="p-d-info-1">
              <h2 style={{ display: "inline" }}>Screen</h2>
              <div className="p-d-info-1-content">
                <Line name="Screen diagonal" title={product.screenSize} />
                <div style={{ width: "100%", height: "0.5px", background: "#CDCDCD" }}></div>
                <Line name="The screen resolution" title={product.screenResolution} />
                <div style={{ width: "100%", height: "0.5px", background: "#CDCDCD" }}></div>
                <Line name="The screen refresh rate" title={product.screenRefreshRate} />
                <div style={{ width: "100%", height: "0.5px", background: "#CDCDCD" }}></div>
                <Line name="The pixel density" title={product.pixelDensity} />
                <div style={{ width: "100%", height: "0.5px", background: "#CDCDCD" }}></div>
                <Line name="Screen type" title={product.screenType} />
                <div style={{ width: "100%", height: "0.5px", background: "#CDCDCD" }}></div>
                <div className="line-add">
                  <p style={{ color: "black" }}>Additionally</p>
                  <p style={{ color: "black" }}>{product.additionally[1]} <br /> {product.additionally[2]} <br /> {product.additionally[3]} <br /> {product.additionally[4]} <br /> {product.additionally[5]}
                  </p>
                </div>
                <div style={{ width: "100%", height: "0.5px", background: "#CDCDCD" }}></div>
              </div>
            </div>
            <div className="p-d-info-2">
              <h2 style={{ color: "black", display: "inline" }}>CPU</h2>
              <div className="p-d-info-2-content">
                <div className="line-2-1" style={{ marginBottom: "24px" }}>
                  <p style={{ color: "black" }}>CPU</p>
                  <p style={{ color: "black" }}>{product.cpu}</p>
                </div>
                <div style={{ width: "100%", height: "0.5px", background: "#CDCDCD" }}></div>
                <div className="line-2-1">
                  <p style={{ color: "black" }}>Number of cores</p>
                  <p style={{ color: "black" }}>{product.numberOfCores}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        <div className="reviews-container">
          <div className="reviews-top">
            <div className="reviews-title">
              <h1>Reviews</h1>
            </div>
            <div className="reviews-overall-rating">
              <div className="overall-rating">
                <h1 style={{ textAlign: "center" }}>{averageRatings}</h1>
                <span>of {comments.length} reviews</span>
                <Rating
                  count={5}
                  size={24}
                  value={averageRatings}
                  edit={true}
                  emptyIcon={<FaStar color="#ccc" />}
                  filledIcon={<FaStar color="#ffc107" />}
                  onChange={handleRatingChange}
                  isHalf={false}
                />
              </div>

              <div className="schedule">
                <div className="level-excellent level">
                  <p>Excellent</p>
                  <div className="bar-count-container">
                    <div className="rating-bar" style={{ borderRadius: "16px", width: '664px', height: '5px', backgroundColor: '#d9d9d9', position: 'relative' }}>
                      <div className="rating-fill" style={{ borderRadius: "16px", width: yellowWidth5 + 'px', backgroundColor: '#ffb547', position: 'absolute', top: 0, bottom: 0 }}></div>
                    </div>
                    <span>{yellowWidth["5"]}</span>
                  </div>
                </div>
                <div className="level-good level">
                  <p>Good</p>
                  <div className="bar-count-container">
                    <div className="rating-bar" style={{ borderRadius: "16px", width: '664px', height: '5px', backgroundColor: '#d9d9d9', position: 'relative' }}>
                      <div className="rating-fill" style={{ borderRadius: "16px", width: yellowWidth4 + 'px', backgroundColor: '#ffb547', position: 'absolute', top: 0, bottom: 0 }}></div>
                    </div>
                    <span>{yellowWidth["4"]}</span>
                  </div>
                </div>
                <div className="level-average level">
                  <p>Average</p>
                  <div className="bar-count-container">
                    <div className="rating-bar" style={{ borderRadius: "16px", width: '664px', height: '5px', backgroundColor: '#d9d9d9', position: 'relative' }}>
                      <div className="rating-fill" style={{ borderRadius: "16px", width: yellowWidth3 + 'px', backgroundColor: '#ffb547', position: 'absolute', top: 0, bottom: 0 }}></div>
                    </div>
                    <span>{yellowWidth["3"]}</span>
                  </div>
                </div>
                <div className="level-below-average level">
                  <p>Below Average</p>
                  <div className="bar-count-container">
                    <div className="rating-bar" style={{ borderRadius: "16px", width: '664px', height: '5px', backgroundColor: '#d9d9d9', position: 'relative' }}>
                      <div className="rating-fill" style={{ borderRadius: "16px", width: yellowWidth2 + 'px', backgroundColor: '#ffb547', position: 'absolute', top: 0, bottom: 0 }}></div>
                    </div>
                    <span>{yellowWidth["2"]}</span>
                  </div>
                </div>
                <div className="level-poor level">
                  <p>Poor</p>
                  <div className="bar-count-container">
                    <div className="rating-bar" style={{ borderRadius: "16px", width: '664px', height: '5px', backgroundColor: '#d9d9d9', position: 'relative' }}>
                      <div className="rating-fill" style={{ borderRadius: "16px", width: yellowWidth1 + 'px', backgroundColor: '#ffb547', position: 'absolute', top: 0, bottom: 0 }}></div>
                    </div>
                    <span>{yellowWidth["1"]}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="leave-comment-input">
              <input
                type="text"
                placeholder="Leave Comment"
                value={leaveComment}
                onChange={(e) => setLeaveComment(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleLeaveComment();
                  }
                }}
              />
            </div>
          </div>
          <div className="reviews-comment-container">
            <div className="reviews-comment-container">
              {comments.filter((comment, index) => index < commentCount).map((comment, index) => (
                <UserComment key={index} profileImgUrl={comment.avatarUrl} comment={comment.description} rating={comment.rating} title={comment.userName} />
              ))}
            </div>
            <button className="scroll-down" style={{ gap: "8px", fontWeight: "500", fontSize: "14px", lineHeight: "24px", width: "208px", height: "48px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", margin: "10px auto", cursor: "pointer", outline: "none", border: "1px solid black", background: "white" }} onClick={() => setCommentCount((prev) => prev + 3)}>
              View More
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 9L12 15L6 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

        </div>
      }
      <DiscountProducts />
    </>
  );
};
export default ProductDetailsPage;
