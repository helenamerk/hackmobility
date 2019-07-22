# hackmobility
Hackmobility2019 Project: RideAid

## Project Overview
[Devpost Submission](https://devpost.com/software/hackmobility-project)

We were awarded a winning hack by Shell with the opportunity to pitch to their new ventures VC department. In addition, we won the [Smartcar API](www.smartcar.com) runner-up award for _Best Use of the Smartcar API_.

# Summary

Carpool apps flood the market, yet congestion continues to plague SF to South Bay commuters. Furthermore, we believe carpool apps have turned more towards earning money, diverting from its intended path of saving nature. Imagine a carpool app where the driver and the passenger received a benefit. We made an app that makes the driver, the rider and the nature happy. Win-Win for all.

# What it does
Enables easy group-based carpooling where everyone benefits. The driver creates a group, and seamlessly connects their car through the Smartcar API. Ride-sharers easily add themselves to groups (with a password).

When the ride is started, locations (with consent!) are retrieved. These values are compared to ending destinations, to calculate CO2 saved, miles traveled, time spent, etc. Points are rewarded in accordance with the distance travelled by the group, in addition to number of people traveling.

These CO2 points can be redeemed for points from various partners. For partners (ex Shell), they can have close to free user acquisition for their loyalty program. For others, their logo will be displayed in the app! This visibility helps them attract customers and emerge as leaders in the green space.

# Tech
We build our project's front end with React native(as native apps would give more user-friendly experience and it's cross-platform) and on the backend we used Node.js. Our database is hosted on Postgre SQL. We used smartcar API to verify the car and check the location. We also plan to tie up with Shell to award our users with their Honesty programme credits which could be in turn exchanged for gas. This scope can be broadened to all Fuel station companies.


# Future 
Add other modes of transport (biking, etc.) for additional insentives. Build on the competitive platform we have, to fully gamify it.


