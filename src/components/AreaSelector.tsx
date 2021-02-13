import React, { FC, useRef } from "react";
import { DrawingManager, useGoogleMap } from "@react-google-maps/api";
import { Box, Button, Center } from "@chakra-ui/react";

export const AreaSelector: FC<{
  onRectangleComplete: (rectangle: google.maps.Rectangle | null) => void;
}> = (props) => {
  const { onRectangleComplete } = props;
  const map = useGoogleMap();
  const currentRectangle = useRef<google.maps.Rectangle | null>(null);
  if (!map) {
    return null;
  }
  const handleRectangleComplete = (rectangle: google.maps.Rectangle) => {
    if (currentRectangle.current) {
      currentRectangle.current.setVisible(false);
    }
    currentRectangle.current = rectangle;
    onRectangleComplete?.(rectangle);
  };
  const handleClear = () => {
    if (currentRectangle.current) {
      currentRectangle.current.setVisible(false);
      currentRectangle.current = null;
    }
    onRectangleComplete?.(null);
  };
  return (
    <>
      <DrawingManager
        onRectangleComplete={handleRectangleComplete}
        options={{
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
            drawingModes: [google.maps.drawing.OverlayType.RECTANGLE],
          },
          rectangleOptions: {
            draggable: true,
          },
        }}
      />
      {currentRectangle.current?.getVisible() ? (
        <Box
          paddingY="5"
          position="absolute"
          bottom="0"
          left="0"
          width="400px"
          height="100px"
          background="white"
          zIndex="99999"
        >
          <Center>
            <Button onClick={handleClear} variant="solid">
              Clear Drawings
            </Button>
          </Center>
        </Box>
      ) : null}
    </>
  );
};
