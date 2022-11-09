import FareCalculator from "./fare-calculator";
import Segment from "./segment";

export default class NormalFareCalculator implements FareCalculator {
  FARE = 2.1
  next?: FareCalculator

  constructor (next?: FareCalculator) {
    this.next = next
  }

  calculate(segment: Segment): number {
    if (!segment.isOvernight() && !segment.isSunday()) {
      return segment.distance * this.FARE
    }
    if (!this.next) throw new Error("Could not found strategy to calculate fare.")
    return this.next?.calculate(segment)
  }
}