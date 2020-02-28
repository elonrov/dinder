import * as RestaurantAPIUtil from '../util/restaurant_util';

export const RECEIVE_RESTAURANTS = "RECEIVE_RESTAURANTS";

export const receiveRestaurants = (restaurants) => ({
  type: RECEIVE_RESTAURANTS,
  restaurants
});

export const fetchRestaurants = (apiData) => dispatch => (
  RestaurantAPIUtil.fetchRestarants(apiData)
    .then((restaurants) => dispatch(receiveRestaurants(restaurants)))
);