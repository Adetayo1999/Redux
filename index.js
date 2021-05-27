const redux = require('redux');
const reduxLogger = require('redux-logger');



const createStore = redux.createStore;
const combineReducer = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger()
//  Actions
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM"



//  Action Creators

function buyCake(){
    return {
        type:BUY_CAKE,
        info:"First Redux App"
    }
}
function buyiceCream(){
    return{
        type:BUY_ICECREAM
    }
}

//  Initial State of the application
const initialNumOfCakes = {
  numOfCakes:10
}

const initialIceCreamState = {
    numOfIceCreams:20
}



//  reducers for the application
const numOfCakesreducer = (currentState = initialNumOfCakes , action) => {
      switch(action.type){
           case BUY_CAKE :
           return{
               ...currentState,
                numOfCakes: currentState.numOfCakes - 1
           }
           
           default:
               return currentState;
      }
}

const numOfIceCreamreducer = (currentState = initialIceCreamState , action) => {
    switch(action.type){
         case BUY_ICECREAM :
          return{
              ...currentState,
               numOfIceCreams: currentState.numOfIceCreams - 1
          }
         default:
             return currentState;
    }
}

// Store that contains all the application state
const rootReducer = combineReducer({
    cake:numOfCakesreducer,
    iceCream:numOfIceCreamreducer
})

const store = createStore(rootReducer , applyMiddleware(logger));

console.log("Initial state" , store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyiceCream())
store.dispatch(buyiceCream())

unsubscribe();