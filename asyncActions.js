const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const applyMiddleware = redux.applyMiddleware;
const createStore = redux.createStore;


const initialState = {
    loading:false,
    data:[],
    error:""
} 

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";


const fetchResults = () => {
    return {
        type:FETCH_USER_REQUEST
    }
}

const fetchSuccess = users => {
    return {
        type:FETCH_USER_SUCCESS,
        payload:users
    }
}

const fetchFailure = error => {
    return{
        type:FETCH_USER_FAILURE,
        payload:error
    }
}


  const reducer = (state = initialState , action) => {

              switch(action.type){
                  case FETCH_USER_REQUEST :
                      return{
                          ...state,
                          loading:true
                      };

                      case FETCH_USER_SUCCESS:
                          return{
                              ...state,
                              loading:false,
                              data:action.payload,
                              error:""
                          }

                          case FETCH_USER_FAILURE:
                              return{
                                  ...state,
                                  loading:false,
                                  data:[],
                                  error:action.payload
                              }

                              default:
                                  return state;
              }
  }


  const fetchUsers = () => (dispatch) => {
      dispatch(fetchResults())
      axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
           const users = res.data.map(users => users.name)

           dispatch(fetchSuccess(users))
      })
      .catch(error => {
               dispatch(fetchFailure(error.message))
      })
  }

const store = createStore(reducer , applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log(store.getState()) );
 store.dispatch(fetchUsers())

console.log("initial State " ,  store.getState());