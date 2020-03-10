import * as RestaurantAPIUtil from '../util/restaurant_util';
import { updateSession } from '../actions/session_actions';

// export const RECEIVE_RESTAURANTS = "RECEIVE_RESTAURANTS";

// export const receiveRestaurants = (restaurants) => ({
//   type: RECEIVE_RESTAURANTS,
//   restaurants
// });

export const fetchRestaurants = (sessionData) => dispatch => (
  RestaurantAPIUtil.fetchRestaurants(sessionData)
    .then((returnInfo) => {
      return dispatch(updateSession({
        restaurants: returnInfo.data.restaurants,
        sessionId: returnInfo.data.session
      }));
    })
);