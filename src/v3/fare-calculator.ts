import Segment from "./segment";

export default interface FareCalculator {
  next?: FareCalculator
  calculate (segment: Segment): number;
}