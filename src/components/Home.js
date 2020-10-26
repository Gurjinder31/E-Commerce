import React from "react";
import { v4 as uuidv4 } from "uuid";

import "../css/home.css";
import Product from "./Product";

const Home = () => {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://images-na.ssl-images-amazon.com/images/G/15/digital/video/merch/2020/Other/BRND_MTH20_00000_GWBleedingHero_3000x1200_Final_en-CA_FT_PVD5581._CB403140241_.jpg"
          alt=""
        />

        <div className="home_row">
          <Product
            id={uuidv4()}
            title="Think Like a Monk: Train Your Mind for Peace and Purpose Every Day"
            price={18.99}
            image="https://m.media-amazon.com/images/I/41wP84vYq-L.jpg"
            rating={5}
          />
          <Product
            id={uuidv4()}
            title="New Apple iPad Pro (11-inch, Wi-Fi, 128GB) - Space Gray (2nd Generation)"
            price={1299}
            image="https://images-na.ssl-images-amazon.com/images/I/815ztYEEwYL._AC_SY355_.jpg"
            rating={4}
          />
        </div>
        <div className="home_row">
          <Product
            id={uuidv4()}
            title="Yamaha JR1 3/4 Scale Guitar with Gig Bag"
            price={200}
            image="https://images-na.ssl-images-amazon.com/images/I/31MXY380nbL._AC_.jpg"
            rating={4}
          />
          <Product
            id={uuidv4()}
            title="Samsung LU28R550UQNXZA 28 inch 4K UHD Monitor"
            price={299}
            image="https://images-na.ssl-images-amazon.com/images/I/61ILY%2BvXxQL._AC_SY355_.jpg"
            rating={4}
          />
          <Product
            id={uuidv4()}
            title="Canada 50 Pack Surgical Face Masks"
            price={0}
            image="https://images-na.ssl-images-amazon.com/images/I/718RZ1ibNqL._AC_SY355_.jpg"
            rating={5}
          />
        </div>
        <div className="home_row">
          <Product
            id={uuidv4()}
            title="4DRC F6 GPS Drone with UHD 4K Camera FPV Live Video for Adults and Kids,Easy GPS Quadcopter for Beginner "
            price={250}
            image="https://m.media-amazon.com/images/I/51KjzIHTaSL._AC_UL320_.jpg"
            rating={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
