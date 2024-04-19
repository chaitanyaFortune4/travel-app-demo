import React from "react";
import { Title } from "../Items/Title";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";

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

      <Container>
        <Row>
          <Col>
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
            <Row style={{ marginBottom: "1rem" }}>
              {lastFiveItems?.slice(1, 3).map((item, index) => (
                <Col key={index}>
                  <ImageFrame imgData={item} />
                </Col>
              ))}
            </Row>
            <Row>
              {lastFiveItems?.slice(3, 5).map((item, index) => (
                <Col key={index}>
                  <ImageFrame imgData={item} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TravelersPhotosSection;
