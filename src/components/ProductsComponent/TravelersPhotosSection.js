import React from "react";
import { Title } from "../Items/Title";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import { PiArrowCircleRightThin } from "react-icons/pi";


const TravelersPhotosSection = ({ data }) => {
  const lastFiveItems = data?.slice(-5);
  const ImageFrame = ({ imgData }) => {
    return (
      <>
        {imgData?.variants?.url && (
          <Image
            src={imgData?.variants?.url}
            alt="image"
            className="travel-image"
            width={imgData?.variants?.width}
            height={imgData?.variants?.height}
          />
        )}
      </>
    );
  };
  return (
    <div>
      <Title title={"Traveler Photos"} />

      <Container className="travel-image">
        <Row>
          <Col xs={12} md={6}>
            <Image
              src={lastFiveItems?.[0]?.variants?.url}
              alt="image"
              className="travel-image"
              width={lastFiveItems?.[0]?.variants?.width}
              height={lastFiveItems?.[0]?.variants?.height}
            />
          </Col>
          {/* <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            {[1, 3].map((rowIndex) => (
              <Row key={rowIndex}>
                {[0, 1].map((colIndex) => (
                  <Col key={colIndex}>
                    <Image
                      src={lastFiveItems?.[rowIndex + colIndex]?.variants?.url}
                      alt="image"
                      className={`travel-image`}
                      width={
                        lastFiveItems?.[rowIndex + colIndex]?.variants?.width
                      }
                      height={
                        lastFiveItems?.[rowIndex + colIndex]?.variants?.height
                      }
                    />
                  </Col>
                ))}
              </Row>
            ))}
          </Col> */}
          <Col>
            <Row className="traveller-photos-row">
              <Col xs={7} md={6}>
                <ImageFrame imgData={lastFiveItems?.[1]} />
              </Col>
              <Col xs={5} md={6}>
                <ImageFrame imgData={lastFiveItems?.[2]} />
              </Col>
            </Row>
            <Row className="traveller-photos-row">
              <Col>
                <ImageFrame imgData={lastFiveItems?.[3]} />
              </Col>
              <Col>
                <div className="pack">
                  <Image
                    src={lastFiveItems?.[4]?.variants?.url}
                    alt="image"
                    className="travel-image"
                    width={lastFiveItems?.[4]?.variants?.width}
                    height={lastFiveItems?.[4]?.variants?.height}
                  />
                  <div className="overlay">
                    <PiArrowCircleRightThin size={60} color="#fff" />
                    <p className="text">See more</p>
                  </div>
                </div>
                {/* <ImageFrame imgData={lastFiveItems?.[4]} /> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TravelersPhotosSection;
