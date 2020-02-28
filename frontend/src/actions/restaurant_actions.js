import * as RestaurantAPIUtil from '../util/restaurant_util';

export const RECEIVE_RESTAURANTS = "RECEIVE_RESTAURANTS";

export const receiveRestaurants = (restaurants) => ({
  type: RECEIVE_RESTAURANTS,
  restaurants
});

export const fetchRestaurants = (cuisine) => dispatch => (
  RestaurantAPIUtil.fetchRestarants(cuisine)
    .then((restaurants) => dispatch(receiveRestaurants(restaurants)))
);