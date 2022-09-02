/**
    Convert radians to degrees
    @param [number]: Value in radians
    @return [number]: Value in degrees
  */
export const radiansToDegrees = (radians: number) => (radians * 180) / Math.PI;

type Point = {
  x: number;
  y: number;
};
/** 
    Angle between points
    @param [object]: X and Y coordinates of from point
    @param [object]: X and Y coordinates of to point
    @return [radian]: Angle between the two points in radians
  */
export const getAngle = (a: Point, b: Point = { x: 0, y: 0 }) =>
  radiansToDegrees(Math.atan2(b.y - a.y, b.x - a.x));

/**
 * 각이 수직인지 아닌지 판별
 * @param angle
 * @returns
 */
export const angleIsVertical = (angle: number) => {
  const isUp = angle <= -90 + 45 && angle >= -90 - 45;
  const isDown = angle <= 90 + 45 && angle >= 90 - 45;

  return isUp || isDown;
};

/**
 * fps를 숫자로 return 해주는 함수
 *
 * @param value
 * @returns
 *
 * @example
 * setTimeOut(()=>{
 *  // function
 * },getFPS(60))
 */
