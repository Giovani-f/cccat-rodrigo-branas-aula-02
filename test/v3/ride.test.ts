import NormalFareCalculator from "../../src/v3/normal-fare-calculator"
import OvernightFareCalculator from "../../src/v3/overnight-fare-calculator"
import OvernightSundayFareCalculator from "../../src/v3/overnight-sunday-fare-calculator"
import Ride from "../../src/v3/ride"
import SundayFareCalculator from "../../src/v3/sunday-fare-calculator"


describe('Calc', () => {
  let ride: Ride
  beforeEach(() => {
    const normalFareCalculator = new NormalFareCalculator()
    const overnightFareCalculator = new OvernightFareCalculator(normalFareCalculator)
    const sundayFareCalculator = new SundayFareCalculator(overnightFareCalculator)
    const overnightSundayFareCalculator = new OvernightSundayFareCalculator(sundayFareCalculator)
    ride = new Ride(overnightSundayFareCalculator)
  })

  it('should calculate a race at normal time', () => {
    ride.addSegment(10, new Date("2021-03-10T10:00:00"))
    const fare = ride.calculateFare()
    expect(fare).toBe(21)
  })

  it('should calculate a night time race', () => {
    ride.addSegment(10, new Date("2021-03-10T22:00:00"))
    const fare = ride.calculateFare()
    expect(fare).toBe(39)
  })

  it('should calculate a race on Sunday', () => {
    ride.addSegment(10, new Date("2021-03-07T10:00:00"))
    const fare = ride.calculateFare()
    expect(fare).toBe(29)
  })

  it('should calculate a race on Sunday at night time', () => {
    ride.addSegment(10, new Date("2021-03-07T22:00:00"))
    const fare = ride.calculateFare()
    expect(fare).toBe(50)
  })

  it('should not calculate a race with an invalid distance', () => {
    expect(() => ride.addSegment(-10, new Date("2021-03-10T10:00:00") )).toThrow(new Error("Invalid distance"))
  })

  it('should not calculate a race with an invalid date', () => {
    expect(() => ride.addSegment(10, new Date("invalid-date"))).toThrow(new Error("Invalid date"))
  })

  it('should calculate a race at normal time with minimum value', () => {
    ride.addSegment(3, new Date("2021-03-10T10:00:00"))
    const fare = ride.calculateFare()
    expect(fare).toBe(10)
  })
})